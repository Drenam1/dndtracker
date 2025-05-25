import OpenAI from "openai";
import FactionHelper from "./FactionHelper";
import RollHelper from "./RollHelper";

export interface Score {
  client: string;
  target: string;
  work: string;
  description: string;
}

export default class ScoreHelper {
  public static formatDescription(score: Score) {
    if (!!score.client) {
      return `<h3>Score</h3><strong>Client:</strong> ${score.client}<br><strong>Target:</strong> ${score.target}<br><strong>Work Type:</strong> ${score.work}`;
    } else {
      return score.description.replace("```html\n", "").replace("```", "");
    }
  }

  public static readonly clientAndTarget = [
    "Academic",
    "Scholar",
    "Laborer",
    "Tradesman",
    "Courier",
    "Sailor",
    "Merchant",
    "Shopkeeper",
    "Artist",
    "Writer",
    "Doctor",
    "Alchemist",
    "Drug Dealer",
    "Supplier",
    "Mercenary",
    "Thug",
    "Fence",
    "Gambler",
    "Spy",
    "Informant",
    "Smuggler",
    "Thief",
    "Crime Boss",
    "Noble",
    "Official",
    "Banker",
    "Captain",
    "Revolutionary",
    "Refugee",
    "Clergy",
    "Cultist",
    "Constable",
    "Inspector",
    "Magistrate",
    "Ward Boss",
    "Ghost",
    "Occult Collector",
    "Vampire or Other Undead",
    "Demon (Disguised)",
    "Possessed or Hollow",
    "Whisper",
    "Cultist",
  ];

  public static readonly work = [
    "Stalking",
    "Surveillance",
    "Sabotage",
    "Arson",
    "Burglary",
    "Plant",
    "Poison",
    "Arrange Accident",
    "Heist",
    "Impersonate",
    "Misdirect",
    "Assassinate",
    "Disappear",
    "Ransom",
    "Terrorize",
    "Extort",
    "Destroy",
    "Deface",
    "Raid",
    "Defend",
    "Rob",
    "Strong Arm",
    "Escort",
    "Securty",
    "Smuggle",
    "Courier",
    "Blackmail",
    "Discredit",
    "Con",
    "Espionage",
    "Locate",
    "Hide",
    "Negotiate",
    "Threaten",
    "Curse",
    "Sanctift",
    "Banish",
    "Summon",
    "Extract Essense",
    "Place Runes",
    "Remove Runes",
    "Perform Ritual",
    "Stop Ritual",
    "Hollow",
    "Revivify",
  ];

  public static readonly complication = [
    "An element is a cover for heretic spirit cult practices",
    "An occultist has foreseen this job and warned the parties involved",
    "Rogue spirits possess some/most/all of the people involved",
    "Rogue spirits haunt the location",
    "The job furthers a devils secret agenda",
    "The job furthers a vampire's secret agenda",
    "An element is a front for a criminal operation",
    "A dangerous gang uses the location",
    "The job is a trap laid by your enemies",
    "The job is a test for another job",
    "The job furthers a merchant lord's secret agenda",
    "The job furthers a crime boss's secret agenda",
    "The job requires travel by electrorail",
    "Must visit the Deathlands to complete the job",
    "The job requires sea travel",
    "The location moves around (site changes, it is a vehicle, etc.)",
    "The job furthers a revolutionary's secret agenda",
    "The job furthers a city official's secret agenda",
  ];

  public static readonly connection = [
    "A friend of a PC",
    "A rival of a PC",
    "A vice perveyor of a PC",
    "A contact of the crew",
    "A notable person in Doskvol",
    "A ghost, demon or god",
  ];
}
