import database from "./../database.json";
import Person from "./person.js";
import TerminalController from "./terminalController.js";

const DEFAULT_LANG = "pt-BR";
const STOP_TERM = ":q";

const terminalController = new TerminalController();
terminalController.initializerTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminalController.question("");
    if (answer === STOP_TERM) {
      terminalController.closeTerminal();
      console.log("proccess finished");
      return;
    }
    const person = Person.generateInstanceFromString(answer);
    terminalController.updateTable(person.formatted(DEFAULT_LANG));
    return mainLoop();
  } catch (err) {
    console.error(err);
  }
}

await mainLoop();
