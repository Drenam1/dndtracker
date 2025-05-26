import { Clock } from "./Clock";
import { Location } from "./Location";
import { Npc } from "./Npc";

export interface Faction {
  id: string;
  name?: string;
  description?: string;
  locations?: Location[];
  tier?: number;
  ideaology?: string;
  leader?: Npc;
  members?: Npc[];
  clocks?: Clock[];
  additionalNotes?: string;
}
