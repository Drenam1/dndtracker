import { Npc } from "./Npc";
import { Faction } from "./Faction";
import { Clock } from "./Clock";

export interface Location {
  id: string;
  name: string;
  description?: string;
  greaterLocation?: Location;
  leadership?: Npc;
  population?: number;
  factions?: Faction[];
  clocks?: Clock[];
}
