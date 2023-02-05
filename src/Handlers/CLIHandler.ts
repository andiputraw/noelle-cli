import inquirer, { Answers, QuestionCollection } from "inquirer";
import Service_interface from "../Interfaces/Service_interface.js";
import Loader from "./Loader.js";

export default class CLIHandler {
  static ServiceName: string[] = [];
  static Module: Service_interface[] = [];

  constructor() {
    this.init();
  }

  async init() {
    const [ServiceName, Module] = await Loader.getService();
    CLIHandler.ServiceName = ServiceName;
    CLIHandler.Module = Module;

    await CLIHandler.main_CLI();
  }

  static async main_CLI() {
    const prompt = inquirer.createPromptModule();

    const answer = await prompt({
      type: "list",
      message: "Mana yang ingin di pilih",
      name: "value",
      choices: [...CLIHandler.ServiceName, "Exit"],
    });
    if (answer.value === "Exit") {
      console.log("Sampai jumpa 👋");
      return;
    }
    Loader.callService(answer.value);
  }

  static async question_CLI(
    type: "input" | "list",
    message: string,
    choices: string[] = []
  ) {
    if (type === "input") {
      const collection: QuestionCollection = {
        type: "input",
        message: message,
        name: "value",
      };
    } else {
      const collection: QuestionCollection = {
        type: "list",
        name: "value",
        message: message,
        choices: choices,
      };

      const prompt = inquirer.createPromptModule();
      const answer = await prompt(collection);

      return answer;
    }
  }
}
