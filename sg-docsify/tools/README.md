# docsify-tools

Quickly document your (typescript or otherwise) projects!

- docsify-init provides a client-side [Docsify](https://docsify.js.org/) based markdown
  documentation site with full text search
- generate-ts-doc generates markdown documentation from api-extractor api.json files
- docsify-auto-sidebar automatically populates the sidebar from the resulting docs tree

### docsify-init

Usage:

    docsify-init [-r repoDir] [-d docsDir]

Initializes docsify in the specified repo and docs sub-directory. By default, the repo is the
current directory and the subdirectory is "docs".

You can use `docsify-init -r . -d .` to initialize in a pure-documentation repo.

### docsify-auto-sidebar

Usage:

    docsify-auto-sidebar -d docs

Generates a new `_sidebar.md` for docsify. You can prefix directories with a number and a dash to
control the ordering, the number and dash will not appear in the sidebar text. For example:

    1-Guides
    2-API

will result with "Guides" and "API" items in the sidebar.

Other dashes will be replaced with spaces

### generate-ts-doc

Like api-documenter, but it doesn't generate separate files for methods or properties. Create
the .api.json files in a directory (e.g. in docs/2-API) and then run it:

    generate-ts-doc markdown -i docs/2-API -o docs/2-API


## Notes

Don't forget to [setup your repo so that github generates a documentation site](https://help.github.com/en/articles/configuring-a-publishing-source-for-github-pages)