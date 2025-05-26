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
  deleteNpc?: (npc: Npc) => void;
}

const NpcSection: React.FunctionComponent<INpcSectionProps> = (props) => {
  const [panelOpen, setPanelOpen] = React.useState<boolean>(false);
  const [selectedNpc, setSelectedNpc] = React.useState<Npc | undefined>(
    undefined
  );
  const [filteredNpcs, setFilteredNpcs] = React.useState<Npc[] | []>(
    props.npcs
  );

  React.useEffect(() => {
    setFilteredNpcs(props.npcs);
  }, [props.npcs]);

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
          placeholder="Filter NPCs..."
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            const filteredNpcs = props.npcs.filter(
              (npc) =>
                npc.name?.toLowerCase().includes(value) ||
                npc.locations
                  ?.map((location) => {
                    return location.name?.toLowerCase();
                  })
                  .includes(value)
            );
            setFilteredNpcs(filteredNpcs);
          }}
          className="filterInput"
        />
        <table>
          <thead>
            <tr>
              <th style={{ minWidth: "200px" }}>Name</th>
              <th style={{ minWidth: "200px" }}>Associated Locations</th>
            </tr>
          </thead>
          <tbody>
            {filteredNpcs
              .slice()
              .sort((a, b) => {
                const nameA = a.name ?? "";
                const nameB = b.name ?? "";
                return nameA.localeCompare(nameB);
              })
              .map((npc: Npc) => {
                return (
                  <tr key={npc.id} style={{ cursor: "pointer" }}>
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
                      {npc?.locations
                        ?.map((location) => {
                          return props.locations.find(
                            (loc) => loc.id === location.id
                          )?.name;
                        })
                        .join(", ")}
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
          deleteNpc={props.deleteNpc}
        />
      ) : null}
    </div>
  );
};
export default NpcSection;
