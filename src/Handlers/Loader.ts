import CLIHandler from "./CLIHandler.js";
import service from "../Interfaces/Service_types.js";
import fs from "fs/promises";

export default class Loader {
  static async getService(): Promise<service> {
    const contents = await fs.readdir("./src/Services");
    const ServiceNameFile = contents.map((content) => content.split(".")[0]);

    const ModulePromise = ServiceNameFile.map(async (content) => {
      const result = await import("../Services/" + content + ".js").then(
        (m) => m.default
      );

      return new result();
    });
    const Module = await Promise.all(ModulePromise);
    const ServiceName = Module.map((m) => {
      return m.name;
    });
    return [ServiceName, Module];
  }

  static async callService(answer: string) {
    const answered = CLIHandler.Module.filter((m) => m.name === answer)[0];
    answered.main();
  }
}
