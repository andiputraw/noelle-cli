import inquirer from "inquirer";
import service from "../Interfaces/Service_types.js";
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
      choices: CLIHandler.ServiceName,
    });
    Loader.callService(answer.value);
  }
}
