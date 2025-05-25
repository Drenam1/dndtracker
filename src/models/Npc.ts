import { Location } from "./Location";
import { Faction } from "./Faction";
import { Clock } from "./Clock";

export interface Relationship {
  person: Npc;
  relationshipType: string;
}
export interface Npc {
  id: string;
  name?: string;
  physicalDescription?: string;
  voiceNotes?: string;
  location?: Location;
  personality?: string;
  relationships?: Relationship[];
  factions?: Faction[];
  combatTactics?: string;
  socialTactics?: string;
  additionalNotes?: string;
  clocks?: Clock[];
}
