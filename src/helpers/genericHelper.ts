import { Faction } from "../models/Faction";
import * as RollHelper from "./RollHelper";

export interface Clock {
  name: string;
  description: string;
  totalSegments: number;
  filledSegments: number;
  repeating: boolean;
}
export interface NPC {
  name: string;
  role: string;
  traits: string[];
}

export default class GenericHelper {
  public static getFactionProgress(factions: Faction[], setFactions: any) {
    const updates: string[] = [];
    factions.forEach((faction) => {
      faction.clocks?.forEach((clock) => {
        const clockRoll = RollHelper.rollDice("<1d20>");
        if (clockRoll === "20") {
          updates.push(
            `${faction.name} - ${clock.name} - ${clock.filledSegments}/${
              clock.totalSegments
            } -> ${clock.filledSegments + 1}/${clock.totalSegments}`
          );
        }
      });
    });
    // eslint-disable-next-line no-restricted-globals
    let confirmText = confirm(`${updates.join("\n")}`);
    if (confirmText === true) {
      const newFactions = [...factions];
      updates.forEach((update) => {
        const factionName = update.split(" - ")[0]; // "The Crows"
        const clockName = update.split(" - ")[1]; // "Rise in tier"
        const faction = newFactions.find(
          (faction) => faction.name === factionName
        );
        const clock = faction?.clocks?.find(
          (clock) => clock.name === clockName
        );
        if (clock) {
          clock.filledSegments += 1;
        }
      });
      setFactions(newFactions);
    } else {
      setFactions(factions);
    }
  }
}
