import React from "react";
import { Npc } from "../models/Npc";
import { Location } from "../models/Location";
import { Faction } from "../models/Faction";
import npcPanel from "./NpcPanel/NpcPanel";
import { DefaultButton } from "@fluentui/react";
import Npcs from "./npcs/npcs";

export interface ISectionProps {
  defaultSection: string;
  npcs: Npc[];
  locations: Location[];
  factions: Faction[];
  setNpcs: any;
  setLocations: any;
  setFactions: any;
  selectId: string;
  selectedItems: any[];
  setSelectedItems: any;
  creatingNewItem: any;
}

const Section: React.FunctionComponent<ISectionProps> = (props) => {
  const [section, setSection] = React.useState<string>(props.defaultSection);
  const dummyNPCs: Npc[] = [
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
  ];

  return (
    <div id="container" className="content">
      <select
        id={props.selectId}
        onChange={(event) => {
          const sectionSelector = document.getElementById(
            props.selectId
          ) as HTMLSelectElement;
          console.log(sectionSelector);
          setSection(
            sectionSelector.options[sectionSelector.selectedIndex].value
          );
        }}
      >
        <option value="npcs">NPCs</option>
        <option value="rules">Rules</option>
        <option value="factions">Factions</option>
        <option value="items">Items</option>
      </select>

      {section === "npcs" && (
        <>
          <DefaultButton
            text="Create New NPC"
            className="createNewItemButton"
            onClick={() => {
              props.creatingNewItem("npc");
            }}
          />
          <Npcs npcs={dummyNPCs} setSelectedItems={props.setSelectedItems} />
        </>
      )}
    </div>
  );
};

export default Section;
