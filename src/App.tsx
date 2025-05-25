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
  const [factions, setFactions] = React.useState<Faction[]>([]);
  const [npcs, setNpcs] = React.useState<Npc[]>([
    {
      type: "npc",
      id: "fec48f6f-4f44-46d0-b0f4-92b29b7f6cb6",
      name: "dummy",
      physicalDescription: "dummyphys",
    },
    {
      type: "npc",
      id: "8b478943-8f4f-448a-a74a-6272e4c50ee0",
      name: "dummy2",
      physicalDescription: "dummy2phys",
    },
  ]);
  const [locations, setLocations] = React.useState<Location[]>([]);
  const [selectedItems, setSelectedItems] = React.useState<any[]>([]);
  const [creatingNewItem, setCreatingNewItem] = React.useState<string>("");

  console.log(selectedItems);
  console.log(creatingNewItem);

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
        <NpcSection npcs={npcs} saveNpc={saveNpc} />
      </div>
    </div>
  );
}

export default App;
