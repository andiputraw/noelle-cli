import Service_interface from "../Interfaces/Service_interface.js";

export default class Discord_Service implements Service_interface {
  name: string = "Discord Service";

  constructor() {
    console.log(`Ini adalah ${this.name}`);
  }

  main() {
    console.log("Discord_Service dipanggil");
  }
}
