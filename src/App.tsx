import React from "react";
import "./App.css";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import SaveLoadHelper from "./helpers/SaveLoadHelper";
import { Faction } from "./models/Faction";
import { Location } from "./models/Location";
import { Npc } from "./models/Npc";
import Section from "./components/section";
import ItemPanel from "./components/NpcPanel/NpcPanel";

initializeIcons();
//To compile, run npm start

function App() {
  const [factions, setFactions] = React.useState<Faction[]>([]);
  const [npcs, setNpcs] = React.useState<Npc[]>([]);
  const [locations, setLocations] = React.useState<Location[]>([]);
  const [selectedItems, setSelectedItems] = React.useState<any[]>([]);
  const [creatingNewItem, setCreatingNewItem] = React.useState<string>("");

  console.log(selectedItems);
  console.log(creatingNewItem);

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
        <Section
          defaultSection={"npcs"}
          npcs={npcs}
          locations={locations}
          factions={factions}
          setNpcs={setNpcs}
          setLocations={setLocations}
          setFactions={setFactions}
          selectId="leftSectionSelect"
          selectedItems={selectedItems}
          setSelectedItems={itemSelect}
          creatingNewItem={setCreatingNewItem}
        />
        <Section
          defaultSection={"rules"}
          npcs={npcs}
          locations={locations}
          factions={factions}
          setNpcs={setNpcs}
          setLocations={setLocations}
          setFactions={setFactions}
          selectId="rightSectionSelect"
          selectedItems={selectedItems}
          setSelectedItems={itemSelect}
          creatingNewItem={setCreatingNewItem}
        />
      </div>
      {selectedItems.length > 0 || creatingNewItem !== "" ? (
        <ItemPanel
          items={selectedItems}
          onDismiss={() => {
            setSelectedItems([]);
            setCreatingNewItem("");
          }}
        />
      ) : null}
    </div>
  );

  function itemSelect(item: any) {
    if (item) {
      const newArray = [...selectedItems];
      newArray.push(item);
      setSelectedItems(newArray);
    }
  }
}

export default App;
