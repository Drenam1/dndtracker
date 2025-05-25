import * as RollHelper from "./RollHelper";
import OpenAI from "openai";

export interface Building {
  wealth: string;
  primaryUse: string;
  exteriorMain: string;
  exteriorDetailing: string;
  additionalDetails: string;
  name: string;
  description: string;
}

export default class BuildingHelper {
  public static formatDescription(building: Building) {
    return `<h3>Building: ${building.name}</h3><strong>Wealth:</strong> ${building.wealth}<br><strong>Primary Use:</strong> ${building.primaryUse}<br><strong>Exterior Material:</strong> ${building.exteriorMain}<br><strong>Exterior Detailing: </strong>${building.exteriorDetailing}<br><strong>Additional Details:</strong> ${building.additionalDetails}<br><strong>Short Description:</strong>  ${building.description}`;
  }
  public static readonly exteriorMain = [
    "Gray Brick",
    "Stone & Timbers",
    "Cut Stone Blocks",
    "Wooden Boards",
    "Plaster Board and Timbers",
    "Metal Sheeting",
  ];

  public static readonly exteriorDetailing = [
    "Tile Work",
    "Tiron Work",
    "Glass Work",
    "Stone Work",
    "Wood Work",
    "Landscaping",
  ];

  public static readonly usePoor = [
    "Bunk House",
    "Inn",
    "Tavern",
    "Gambling Hall",
    "Drug Den",
    "Brothel",
    "Market",
    "Workshop",
    "Bakery",
    "Butchery",
    "Forge",
    "Tailor",
    "Work House",
    "Goat Stable",
    "Brewery",
    "Watch Post",
    "Court, Jail",
    "Dock",
    "Ruin",
    "Row Houses",
    "Tenements",
    "Apartment Building",
    "Small House",
    "Bath House",
    "Shrine",
    "Tattooist",
    "Physicker",
    "Fighting Pits",
    "Square, Fountain",
    "Grotto",
    "Warehouse",
    "Stockyard",
    "Factory",
    "Refinery",
    "Eelery",
    "Mushroom Garden",
  ];

  public static readonly useWealthy = [
    "Market House",
    "Restaurant",
    "Bar, Lounge",
    "Academy",
    "Salon",
    "Cafe",
    "Floristry",
    "Tobacconist",
    "Book Shop",
    "Jeweler",
    "Clothier",
    "Gallery",
    "Apothecary",
    "Horse Stable",
    "Distillery",
    "Vintner",
    "Master Artisan",
    "Boat House",
    "Theatre",
    "Opera House",
    "Apartment Building",
    "Townhouse",
    "Manor House",
    "Villa",
    "Clinic",
    "Temple",
    "Cistern",
    "Watch Post",
    "Park",
    "Monument",
    "Archive",
    "Spiriualist",
    "Bank",
    "Alchemist",
    "Power Plant",
    "Radiant Energy Garden",
  ];

  public static readonly details = [
    "Dripping Water",
    "Creaking Floorboards",
    "Roaring Fires",
    "Smokey Lamps",
    "Buzzing Electric Lights",
    "Ticking Clockworks",
    "Plants, Flowers",
    "Wall Hangings, Artwork",
    "Shuttered Windows",
    "Heavy Curtains, Thick Carpet",
    "Dust, Detritus",
    "Wear, Damage",
    "Threadbare, Tattered",
    "Utilitarian Furnishings",
    "Elegant Finery",
    "Lush, Comfortable",
    "Rough-Spun Simplicity",
    "Spartan Austerity",
    "Circular Stairs, Ladders",
    "Secret Doors",
    "Catwalks",
    "Skylights",
    "Balcony",
    "Cellar",
    "Drafty, Cold",
    "Stout, Quiet",
    "Cozy, Warm",
    "Vaulted, Spacious",
    "Low, Cramped",
    "Rickety, Ramshackle",
    "Strange Devices",
    "Weird Artifacts",
    "Spirit Wards, Old Runes",
    "Piled Jumble of Curios",
    "Antique Appointments",
    "Shrine, Altar",
  ];
}
