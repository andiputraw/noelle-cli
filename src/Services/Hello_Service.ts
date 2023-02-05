import Service_interface from "../Interfaces/Service_interface.js";
import ScriptHandler from "../Handlers/ScriptHandler.js";
import CLIHandler from "../Handlers/CLIHandler.js";
import { Answers } from "inquirer";

export default class Hello_Service implements Service_interface {
  name: string = "Hello Service";

  async main() {
    try {
      const answer = (await CLIHandler.question_CLI(
        "list",
        "Pilih script mana yang ingin dijalankan",
        ["hello.js"]
      )) as Answers;

      const buff = (await ScriptHandler.nodeCall(answer.value)) as Buffer;
      console.log(buff.toString("utf-8"));
    } catch (error) {
      const buff = error as Buffer;
      console.log(buff.toString("utf-8"));
    }
  }
}
