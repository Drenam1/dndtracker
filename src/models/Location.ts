import { Npc } from "./Npc";
import { Clock } from "./Clock";

export interface Location {
  id: string;
  name?: string;
  description?: string;
  greaterLocation?: Location;
  leadership?: Npc;
  population?: number;
  clocks?: Clock[];
  additionalNotes?: string;
  url?: string;
}
