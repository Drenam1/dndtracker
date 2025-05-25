import React from "react";
import "./App.css";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import SaveLoadHelper from "./helpers/SaveLoadHelper";
import { Faction } from "./models/Faction";
import { Location } from "./models/Location";
import { Npc } from "./models/Npc";
import NpcSection from "./components/Npcs/NpcSection";

initializeIcons();
//To compile, run npm start

function App() {
  const [factions, setFactions] = React.useState<Faction[]>([
    {
      id: "b1c2d3e4-f5a6-7b8c-9d0e-f1a2b3c4d5e6",
      name: "The Mages Guild",
      description:
        "The Mages Guild is a professional organization, located throughout Tamriel. It is dedicated to the study and application of magicka and alchemy, but has certain restrictions, such as the Necromancy ban. Its charter from the Emperor specified that the guild must provide magic services to the public. Anyone can purchase potions, alchemical ingredients, magical items, and a selection of standard spells from the guild.",
      members: [],
    },
    {
      id: "f7g8h9i0-j1k2-l3m4-n5o6-p7q8r9s0t1u2",
      name: "The Fighters Guild",
      description:
        "The Fighters Guild, present across most of Tamriel, provides a common and, more importantly, public place of training, study, and employment for those of a martial persuasion. The guild is a professional organization chartered by the Emperor to regulate the hiring and training of mercenaries, protect commerce, capture or drive away beasts, and similar security duties. Guild halls can take on a contract from any citizen, provided it does not conflict with the laws or customs of the region.",
      members: [],
    },
  ]);
  const [npcs, setNpcs] = React.useState<Npc[]>([
    {
      id: "fec48f6f-4f44-46d0-b0f4-92b29b7f6cb6",
      name: "Winthrop von Kessel",
      physicalDescription: "A big armored imperial.",
      factions: [],
      location: undefined,
      clocks: [
        {
          id: "d1e2f3g4-h5i6-j7k8-l9m0-n1o2p3q4r5s6",
          name: "Winthrop's Quest",
          description: "A quest to find Winthrop's lost sword.",
          totalSegments: 8,
          filledSegments: 3,
        },
      ],
    },
    {
      id: "8b478943-8f4f-448a-a74a-6272e4c50ee0",
      name: "Aurelius Feldwin",
      physicalDescription: "An elven mage.",
      factions: [],
      location: undefined,
    },
  ]);
  const [locations, setLocations] = React.useState<Location[]>([
    {
      id: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
      name: "Chorral",
      description:
        "Chorrol is a city in the Great Forest region in northwestern Cyrodiil, west of the Imperial City along the Black Road. The Orange Road connects the city to Bruma to the northeast. The city is near the Colovian Highlands along the Hammerfell border.",
      leadership: undefined,
      population: 5000,
      factions: [],
    },
    {
      id: "q7r8s9t0-u1v2-w3x4-y5z6-a7b8c9d0e1f2",
      name: "Cheydinhal",
      description:
        "Cheydinhal is a city in the Nibenay Basin region in northeastern Cyrodiil, east of the Imperial City at the end of the Blue Road. The city is in the foothills of the Valus Mountains, with its architectural style influenced by the Dunmer due to its proximity to Morrowind.",
      leadership: undefined,
      population: 3000,
      factions: [],
    },
  ]);

  const saveNpc = (npc: Npc) => {
    const updatedNpcs = npcs.map((existingNpc) =>
      existingNpc.id === npc.id ? npc : existingNpc
    );
    setNpcs(updatedNpcs);
  };

  return (
    <div className="App">
      <div id="saveLoadContainer">
        <input type="text" id="fileName" placeholder="File Name" />
        <button
          id="save"
          onClick={() =>
            SaveLoadHelper.saveToFile(
              npcs,
              factions,
              locations,
              (document.getElementById("fileName") as HTMLInputElement).value
            )
          }
        >
          Save
        </button>
        <input
          type="file"
          id="load"
          accept=".json"
          onChange={(event) =>
            SaveLoadHelper.loadFromFile(event, (json: any) => {
              setNpcs(json[0]);
              setFactions(json[1]);
              setLocations(json[2]);
              const documentNameSource = document.getElementById(
                "load"
              ) as HTMLInputElement;
              (document.getElementById("fileName") as HTMLInputElement).value =
                documentNameSource.value.split("\\")[2].split(".")[0];
            })
          }
        />
      </div>
      <div id="containerContainer">
        <NpcSection
          npcs={npcs}
          factions={factions}
          locations={locations}
          saveNpc={saveNpc}
        />
      </div>
    </div>
  );
}

export default App;
