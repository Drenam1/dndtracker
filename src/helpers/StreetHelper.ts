import * as RollHelper from "./RollHelper";
import OpenAI from "openai";

export interface Street {
  wealth: string;
  mood: string;
  primaryUse: string;
  smell: string;
  sound: string;
  sight: string;
  additionalDetails: string;
  name: string;
  description: string;
}

export default class StreetHelper {
  public static formatDescription(street: Street) {
    return `<h3>Street: ${street.name}</h3><strong>Wealth:</strong> ${street.wealth}<br><strong>Mood:</strong> ${street.mood}<br><strong>Primary Use:</strong> ${street.primaryUse}<br><strong>Current Smell:</strong> ${street.smell}<br><strong>Current Sound:</strong> ${street.sound}<br><strong>Current Sight:</strong> ${street.sight}<br><strong>Additional Details:</strong> ${street.additionalDetails}<br><strong>Short Description:</strong> ${street.description}</div>`;
  }

  public static readonly moods = [
    "Abandoned or Decrepit",
    "Cramped or Noisy",
    "Dark or Cold",
    "Cozy or Warm",
    "Bright or Lively",
    "Quiet or Refined",
  ];
  public static readonly impressionSights = [
    "Soot, Ash Clouds, Grime",
    "Rain Slick, Oil Slick",
    "Dancing Shadows, Flickering Lights",
    "Mist, Fog, Frost",
    "Fleeting Shapes, Echoes in the Ghost Field",
    "Crackling Electricty, Wires, Mechanisms",
  ];
  public static readonly impressionSound = [
    "Machinery, Workers",
    "Fluttering Cloth, Howling Wind",
    "Laughter, Song, Music",
    "Whispers, Echoes, Strange Voices",
    "Thunder, Driving Rain",
    "Bells, Clock Chimes, Harbor Horns",
  ];
  public static readonly impressionSmell = [
    "Damp Wood, Decay, Refuse",
    "Animals, Animal Hides, Blood",
    "Cook Fires, Furnaces",
    "Chemicals, Distillates, Fumes",
    "Ozone, Electroplasmic Discharges",
    "Rain Water, Ocean",
  ];
  public static readonly usePoor = [
    "Residential Spaces",
    "Crafts",
    "Labor",
    "Shops",
    "Trade",
    "Hospitality",
  ];
  public static readonly useMoperate = [
    "Law, Government",
    "Public Space",
    "Power",
    "Manufacture",
    "Transportation",
    "Leisure",
  ];
  public static readonly useWealthy = [
    "Vice",
    "Entertainment",
    "Storage",
    "Cultivation",
    "Academic",
    "Artists",
  ];
  public static readonly typePoor = [
    "Narrow Lane",
    "Tight Alley",
    "Twisting Street",
    "Rough Road",
    "Bridge",
    "Waterway",
  ];
  public static readonly typeModerate = [
    "Closed Court",
    "Open Plaza",
    "Paved Avenue",
    "Tunnel",
    "Wide Boulevard",
    "Roundabout",
  ];
  public static readonly typeWealthy = [
    "Elevated Walkway",
    "Flooded Trench",
    "Suspended Walkway",
    "Subterranean Tunnel",
    "Floating Platform",
    "Private, Gated",
  ];
  public static readonly details = [
    "Metal Supports",
    "Ironwork Gates,Fences",
    "Belching Chimneys",
    "Metal Grates, Hatches, Doors",
    "Clockwork Mechanisms",
    "Rigging, Cables",
    "Stairs, Ramps, Terraces",
    "Wooden Scaffolds",
    "Skyways",
    "Rooftop Spaces",
    "Rails, Train Cars",
    "Clockwork Mechanisms",
    "Banners, Pennants",
    "Festival Decorations",
    "Crowd, Parade, Riot",
    "Street Performers",
    "Makeshift Stalls, Shelters",
    "Crisscrossing Routes",
    "Gang Markings",
    "Patrol Posts",
    "Lookouts",
    "Stocks, Public Punishment",
    "Street Crier, Visionary",
    "News Stand, Public Notices",
    "Stray Animals",
    "Landscaping",
    "Muck, Mire",
    "Construction, Demolition",
    "Foul Runoff, Fumes, Smoke",
    "Orphans, Beggars",
    "Ancient Ruin",
    "Leering Gargoyles",
    "Spirit Chimes, Wards",
    "Eerie Emptiness",
    "Quarantine, Lockdown",
    "Shrine Offerings",
  ];
}
