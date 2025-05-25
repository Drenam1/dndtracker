import { Faction } from "../models/Faction";
import { Npc } from "../models/Npc";
import { Location } from "../models/Location";

export default class SaveLoadHelper {
  public static saveToFile = (
    npcs: Npc[],
    factions: Faction[],
    locations: Location[],
    filename: string
  ) => {
    const jsonData = JSON.stringify([npcs, factions, locations]);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.json`;
    link.click();

    URL.revokeObjectURL(url);
  };
  public static loadFromFile = (event: any, callback: any) => {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = function () {
      const text = reader.result;
      const json = JSON.parse(text as string);
      callback(json);
    };
    reader.readAsText(input.files[0]);
  };
}
