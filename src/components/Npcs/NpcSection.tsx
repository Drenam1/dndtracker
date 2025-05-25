import { DefaultButton } from "@fluentui/react";
import { Npc } from "../../models/Npc";
import React from "react";
import NpcPanel from "./NpcPanel/NpcPanel";
import { Faction } from "../../models/Faction";
import { Location } from "../../models/Location";

export interface INpcSectionProps {
  npcs: Npc[];
  factions: Faction[];
  locations: Location[];
  saveNpc: (npc: Npc) => void;
}

const NpcSection: React.FunctionComponent<INpcSectionProps> = (props) => {
  const [creatingNewItem, setCreatingNewItem] = React.useState<boolean>(false);
  const [panelOpen, setPanelOpen] = React.useState<boolean>(false);
  const [selectedNpc, setSelectedNpc] = React.useState<Npc | undefined>(
    undefined
  );

  return (
    <>
      <DefaultButton
        text="Create New NPC"
        className="createNewItemButton"
        onClick={() => {
          setCreatingNewItem(true);
          setPanelOpen(true);
        }}
      />
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {props.npcs.map((npc: Npc) => {
              return (
                <tr key={npc.id}>
                  <td
                    onClick={() => {
                      setSelectedNpc(npc);
                      setPanelOpen(true);
                    }}
                  >
                    {npc.id}
                  </td>
                  <td
                    onClick={() => {
                      setSelectedNpc(npc);
                      setPanelOpen(true);
                    }}
                  >
                    {npc.name}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {selectedNpc ? (
        <NpcPanel
          npc={selectedNpc}
          factions={props.factions}
          locations={props.locations}
          isOpen={panelOpen}
          onDismiss={() => {
            setPanelOpen(false);
            setSelectedNpc(undefined);
            setCreatingNewItem(false);
          }}
          saveNpc={props.saveNpc}
        />
      ) : null}
    </>
  );
};
export default NpcSection;
