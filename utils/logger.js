const colors = require('ansi-colors');

let logs = [];
let maxLogs = process.stdout.rows - 10;
const Json = require("../package.json");

function renderLogs() {
  console.clear();

  const textArt = `
${colors.cyanBright('██╗░░██╗██╗░░░██╗██████╗░██████╗░██╗░█████╗░███╗░░██╗')}
${colors.cyanBright('██║░░██║╚██╗░██╔╝██╔══██╗██╔══██╗██║██╔══██╗████╗░██║')}
${colors.cyanBright('███████║░╚████╔╝░██║░░██║██████╔╝██║██║░░██║██╔██╗██║')}
${colors.cyanBright('██╔══██║░░╚██╔╝░░██║░░██║██╔══██╗██║██║░░██║██║╚████║')}
${colors.cyanBright('██║░░██║░░░██║░░░██████╔╝██║░░██║██║╚█████╔╝██║░╚███║')}
${colors.cyanBright(`╚═╝░░╚═╝░░░╚═╝░░░╚═════╝░╚═╝░░╚═╝╚═╝░╚════╝░╚═╝░░╚══╝ v${Json.version}`)}
`;

  console.log(textArt);
  console.log(colors.green('\nLogs:\n'));

  const logsToShow = logs.slice(-maxLogs);
  logsToShow.forEach((log, index) => {
    console.log(log);
  });
}

function log(message) {
  logs.push(colors.white(`[LOG]: ${message}`));
  renderLogs();
}

function warn(message) {
  logs.push(colors.red(`[WARN]: ${message}`));
  renderLogs();
}

function status(message) {
  logs.push(colors.yellow(`[STATUS]: ${message}`));
  renderLogs();
}

function success(message) {
  logs.push(colors.green(`[SUCCESS]: ${message}`));
  renderLogs();
}

function info(message) {
  logs.push(colors.blue(`[INFO]: ${message}`));
  renderLogs();
}

function initLogger() {
  logs.push(colors.green('Logger initialized.'));
  renderLogs();
}

module.exports = { initLogger, log, warn, status, success, info };
