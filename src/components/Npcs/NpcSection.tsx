import { DefaultButton } from "@fluentui/react";
import { Npc } from "../../models/Npc";
import React from "react";
import NpcPanel from "./NpcPanel/NpcPanel";
import { Faction } from "../../models/Faction";
import { Location } from "../../models/Location";
import "./NpcSectionStyles.css";

export interface INpcSectionProps {
  npcs: Npc[];
  factions: Faction[];
  locations: Location[];
  saveNpc: (npc: Npc) => void;
}

const NpcSection: React.FunctionComponent<INpcSectionProps> = (props) => {
  const [panelOpen, setPanelOpen] = React.useState<boolean>(false);
  const [selectedNpc, setSelectedNpc] = React.useState<Npc | undefined>(
    undefined
  );
  const [filteredNpcs, setFilteredNpcs] = React.useState<Npc[] | []>(
    props.npcs
  );

  return (
    <div className="npcSection">
      <DefaultButton
        text="Create New NPC"
        className="createNewItemButton"
        onClick={() => {
          setPanelOpen(true);
        }}
      />
      <div>
        <input
          type="text"
          placeholder="Filter NPCs by name..."
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            const filteredNpcs = props.npcs.filter(
              (npc) =>
                npc.name?.toLowerCase().includes(value) ||
                npc.location?.name?.toLowerCase().includes(value)
            );
            setFilteredNpcs(filteredNpcs);
          }}
          style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
        />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredNpcs.map((npc: Npc) => {
              return (
                <tr key={npc.id}>
                  <td
                    onClick={() => {
                      setSelectedNpc(npc);
                      setPanelOpen(true);
                    }}
                  >
                    {npc.name}
                  </td>
                  <td
                    onClick={() => {
                      setSelectedNpc(npc);
                      setPanelOpen(true);
                    }}
                  >
                    {npc?.location?.name}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {panelOpen ? (
        <NpcPanel
          npc={selectedNpc}
          factions={props.factions}
          locations={props.locations}
          npcs={props.npcs}
          isOpen={panelOpen}
          onDismiss={() => {
            setPanelOpen(false);
            setSelectedNpc(undefined);
          }}
          saveNpc={props.saveNpc}
        />
      ) : null}
    </div>
  );
};
export default NpcSection;
