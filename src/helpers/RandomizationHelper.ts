import Descriptors from "../constants/descriptors";
import Names from "../constants/names";
import Relationships from "../constants/relationships";
import { Npc, Relationship } from "../models/Npc";
import { Location } from "../models/Location";
import { rollArray } from "./RollHelper";
import { Faction } from "../models/Faction";
export default class RandomizationHelper {
  public static randomizeGender(): string {
    const gendersChances = [
      "Male",
      "Male",
      "Male",
      "Male",
      "Male",
      "Female",
      "Female",
      "Female",
      "Female",
      "Female",
      "Nonbinary",
    ];
    const gender = rollArray(gendersChances);
    return gender;
  }
  public static randomizeName(gender: string): string {
    let firstName: string;
    if (gender === "Male") {
      firstName = rollArray(Names.MaleFirstNames);
    } else if (gender === "Female") {
      firstName = rollArray(Names.FemaleFirstNames);
    } else {
      firstName = rollArray([
        ...Names.MaleFirstNames,
        ...Names.FemaleFirstNames,
      ]);
    }
    const surname = rollArray(Names.Surnames);
    return `${firstName} ${surname}`;
  }

  public static randomizeRelationship(
    currentNpc: Npc,
    allNpcs: Npc[]
  ): Relationship {
    const otherNpcs = allNpcs.filter((npc) => npc.id !== currentNpc?.id);
    const randomNpc = rollArray(otherNpcs);
    const relationshipType = rollArray(Relationships.RelationshipTypes);
    return {
      person: randomNpc,
      relationshipType: relationshipType,
    };
  }

  public static randomizeVoiceNote(): string {
    return rollArray(Descriptors.VoiceNotes);
  }
  public static randomizePersonality(): string {
    return rollArray(Descriptors.PersonalityTraits);
  }
    public static randomizeAppearance(): string {
        return rollArray(Descriptors.PhysicalTraits);
    }

  public static randomizeLocations(allLocations: Location[]): Location[] {
    const numberOfLocations = Math.floor(Math.random() * 3) + 1; // Random number between 1 and 3
    const shuffled = allLocations.slice().sort(() => 0.5 - Math.random());
    const selectedLocations = shuffled.slice(0, numberOfLocations);
    return selectedLocations;
  }
  public static randomizeFactions(allFactions: Faction[]): Faction[] {
    const shuffled = allFactions.slice().sort(() => 0.5 - Math.random());
    const selectedFactions = shuffled.slice(0, 1);
    return selectedFactions;
  }
}
