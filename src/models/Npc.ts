import { Location } from "./Location";
import { Faction } from "./Faction";
import { Clock } from "./Clock";

export interface Npc {
  id?: string;
  name?: string;
  physicalDescription?: string;
  voiceNotes?: string;
  location?: Location;
  personality?: string;
  goals?: string;
  relationships?: Npc[];
  factions?: Faction[];
  combatTactics?: string;
  socialTactics?: string;
  additionalNotes?: string;
  clocks?: Clock[];
}
