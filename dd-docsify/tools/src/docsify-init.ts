import { execSync as shell } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import * as yargs from 'yargs';
import * as mkdirp from 'mkdirp';

let yargsCfg = yargs
  .wrap(yargs.terminalWidth() - 1)
  .usage('$0 [-r repoDir] [-d docsDir] ')
  .options({
    repoDir: {
      alias: 'r',
      type: 'string',
      describe: 'Path to the repo directory (defaults to the current directory)'
    },
    docsDir: {
      alias: 'd',
      type: 'string',
      describe: 'Where to look for the documentation (defaults to docs subdir of repo directory)'
    },
    editDir: {
      alias: 'e',
      type: 'string',
      describe: 'Relative path for documentation editing (defaults to docsDir)'
    },
    help: {
      alias: 'h',
      type: 'boolean',
      describe: 'Show this help screen'
    }
  });

let args = yargsCfg.argv;

if (args.help) {
  yargsCfg.showHelp();
  process.exit(0);
}

function repoToHttpsUrl(url: string) {
  if (/^git@/.test(url)) {
    url = url.replace(':', '/');
  }
  return url.replace(/^git@/, 'https://').replace(/.git$/, '');
}

let repoDir = path.resolve(process.cwd(), args.repoDir || '.');
let docsDir = path.resolve(repoDir, args.docsDir || './docs');
let editDir = args.editDir == null ? path.relative(repoDir, docsDir) : args.editDir

let vars: { [key: string]: string } = {};

let repo = (vars['REPO_URL'] = repoToHttpsUrl(
  shell(`git config --get remote.origin.url`, {
    cwd: repoDir
  })
    .toString()
    .trim()
));

vars['REPO_NAME'] = repo.substr(repo.lastIndexOf('/') + 1);

vars['EDIT_SUBDIR'] = editDir

try {
  let pkgjson = JSON.parse(fs.readFileSync(path.resolve(repoDir, 'package.json'), 'utf8'))
  vars['TITLE'] = `${pkgjson.name} documentation`
  vars['DESCRIPTION'] = pkgjson.description;
} catch (e) {
  vars['TITLE'] = 'Documentation'
  vars['DESCRIPTION'] = 'Documentation';
}

mkdirp.sync(docsDir);

let vendorSrcDir = path.resolve(__dirname, '../vendor/_docsify');

let tpl = fs.readFileSync(path.resolve(vendorSrcDir, 'index.html'), 'utf8');

let html = tpl.replace(/\{\{([_A-Z]+)\}\}/g, (_m, name) => vars[name]);

fs.writeFileSync(path.resolve(docsDir, './index.html'), html);
fs.writeFileSync(path.resolve(docsDir, './.nojekyll'), '');
if (!fs.existsSync(path.resolve(docsDir, './README.md'))) {
  fs.writeFileSync(
    path.resolve(docsDir, './README.md'),
    '# Welcome page\n\nPlease add some content.'
  );
}

let vendorDestDir = path.resolve(docsDir, './_docsify');
mkdirp.sync(vendorDestDir);

let staticFiles = [
  'docsify.js',
  'edit-on-github.js',
  'front-matter.js',
  'search.min.js',
  'setup-mermaid.js',
  'theme.css'
];
for (let f of staticFiles) {
  fs.copyFileSync(path.resolve(vendorSrcDir, f), path.resolve(vendorDestDir, f));
}

console.log(
  `Done. You can test the documentation by running

  http-server ${args.docsDir || './docs'}

Once you have some markdown files, you can auto-generate the sidebar by running

  docsify-auto-sidebar -d ${args.docsDir || './docs'}
  `
);
