import { Clock } from "./Clock";
import { Location } from "./Location";
import { Npc } from "./Npc";

export interface Faction {
  id: string;
  name: string;
  description?: string;
  locations?: Location[];
  tier?: number;
  goals?: string;
  ideaology?: string;
  members?: Npc[];
  clocks?: Clock[];
}
