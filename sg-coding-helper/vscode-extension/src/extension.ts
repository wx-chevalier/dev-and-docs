import * as vscode from 'vscode';
import * as cleanCodeTips from '../../cleancodecheatsheet2.4.json';
import convertToMilliseconds from './utils/convertToMilliseconds';

type categories = {
  [key: string]: { [key: string]: { [key: string]: string } };
};

const recurseThroughTree = (
  categories: any,
  outputString: string = '',
  i: number = 0
): string => {
  if (i < 2) {
    const categoryKeys: Array<string> = Object.keys(categories);
    const randomCategoryIndex: number = categoryKeys.indexOf(
      categoryKeys[Math.floor(categoryKeys.length * Math.random())]
    );
    const randomCategoryName: string = categoryKeys[randomCategoryIndex];
    const randomCategories: string = categories[randomCategoryName];

    if (i === 0) {
      outputString += `${randomCategoryName} `;

      switch (randomCategoryName) {
        case 'Principles':
          outputString += '🗽';
          break;
        case 'Smells':
          outputString += '💩';
          break;
        case 'Class Design':
          outputString += '🧱';
          break;
        case 'Package Cohesion':
          outputString += '📦';
          break;
        case 'Package Coupling':
          outputString += '🧑‍🤝‍🧑';
          break;
        case 'General':
          outputString += '📖';
          break;
        case 'Environment':
          outputString += '🌎';
          break;
        case 'Dependency Injection':
          outputString += '💉';
          break;
        case 'Design':
          outputString += '✍';
          break;
        case 'Dependencies':
          outputString += '👨‍👧‍👦';
          break;
        case 'Naming':
          outputString += '🏷';
          break;
        case 'Understandability':
          outputString += '📖';
          break;
        case 'Methods':
          outputString += '🏃';
          break;
        case 'Source Code Structure':
          outputString += '🏗';
          break;
        case 'Conditionals':
          outputString += '👈👉';
          break;
        case 'Useless Stuff':
          outputString += '🗑';
          break;
        case 'Maintainability Killers':
          outputString += '🔧';
          break;
        case 'Exception Handling':
          outputString += '🚸';
          break;
        case 'How to Learn Clean Code':
          outputString += '👨‍🏫';
          break;
        case 'Refactoring Patterns':
          outputString += '🔨';
          break;
      }
    } else {
      outputString += ` > ${randomCategoryName} > `;
    }

    i = i + 1;

    return recurseThroughTree(randomCategories, outputString, i);
  } else {
    outputString += categories.text;
    return outputString;
  }
};

const displayTip = () => {
  const rootDataObj: categories = cleanCodeTips['Clean Code Cheat Sheet'];

  const outputString = recurseThroughTree(rootDataObj);
  vscode.window.showInformationMessage(outputString);
};

let prevIntervalId: NodeJS.Timeout;

const timer = () => {
  const tipTimer = vscode.workspace.getConfiguration().get('tipTimer');

  // initial tip
  displayTip();

  // Shorthand
  const intervalSetter = (hours: number, minutes: number) => {
    let milliseconds = convertToMilliseconds(hours, minutes);

    clearInterval(prevIntervalId);

    prevIntervalId = setInterval(() => {
      displayTip();
    }, milliseconds);
  };

  switch (tipTimer) {
    case '5 minutes':
      intervalSetter(0, 5);
      break;
    case '10 minutes':
      intervalSetter(0, 10);
      break;
    case '15 minutes':
      intervalSetter(0, 15);
      break;
    case '30 minutes':
      intervalSetter(0, 30);
      break;
    case '1 hour':
      intervalSetter(1, 0);
      break;
    case '2 hours':
      intervalSetter(2, 0);
      break;
    case '4 hours':
      intervalSetter(4, 0);
      break;
    case '8 hours':
      intervalSetter(8, 0);
      break;
    case '1 day':
      intervalSetter(24, 0);
      break;
    case '1 week':
      intervalSetter(168, 0);
      break;
    case '1 month':
      intervalSetter(730, 0);
      break;
  }
};

const updateConfigValues = async () => {
  const timer = vscode.workspace.getConfiguration();
  await timer.update('tipTimer', timer, vscode.ConfigurationTarget.Global);
};

export function activate({ subscriptions }: vscode.ExtensionContext) {
  subscriptions.push(
    vscode.commands.registerCommand(
      'onCommand:extension.displayTip',
      displayTip
    ),
    vscode.commands.registerCommand('onCommand:config.configureTipTimer', () =>
      updateConfigValues()
    )
  );

  // Display a message box to the user on startup
  timer();

  vscode.workspace.onDidChangeConfiguration(e => {
    if (e.affectsConfiguration('tipTimer')) {
      timer();
    }
  });

  // Add status bar item
  const myStatusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );

  myStatusBarItem.text = 'Clean Code Tips';

  // // Make a tip show when clicking on status bar item
  myStatusBarItem.command = 'onCommand:extension.displayTip';
  subscriptions.push(myStatusBarItem);
  myStatusBarItem.show();
}
