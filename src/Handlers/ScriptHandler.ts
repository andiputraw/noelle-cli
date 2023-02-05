import { spawn } from "child_process";

export default class ScriptHandler {
  static async nodeCall(scriptName: string, path?: string) {
    return new Promise((resolve, reject) => {
      const node = spawn(`node ${scriptName}`, {
        cwd: path || "./build/Scripts",
        shell: true,
      });

      node.stdout.on("data", (data) => {
        resolve(data);
      });

      node.stderr.on("data", (data) => reject(data));

      node.on("error", (err) => reject(err));
    });
  }
}
