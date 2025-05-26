import { Faction } from "../../models/Faction";
import { Npc } from "../../models/Npc";
import { Location } from "../../models/Location";
import React from "react";
import { DefaultButton } from "@fluentui/react";
import FactionPanel from "./FactionPanel/FactionPanel";

export interface IFactionSectionProps {
  npcs: Npc[];
  factions: Faction[];
  locations: Location[];
  saveFaction: (faction: Faction) => void;
  deleteFaction?: (faction: Faction) => void;
}

const FactionSection: React.FunctionComponent<IFactionSectionProps> = (
  props
) => {
  const [panelOpen, setPanelOpen] = React.useState<boolean>(false);
  const [selectedFaction, setSelectedFaction] = React.useState<
    Faction | undefined
  >(undefined);
  const [filteredFactions, setFilteredFactions] = React.useState<
    Faction[] | []
  >(props.factions);

  React.useEffect(() => {
    setFilteredFactions(props.factions);
  }, [props.factions]);

  return (
    <div className="npcSection section">
      <DefaultButton
        text="Create New Faction"
        className="createNewItemButton"
        onClick={() => {
          setPanelOpen(true);
        }}
      />
      <div>
        <input
          type="text"
          placeholder="Filter Factions..."
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            const filteredFactions = props.factions.filter((faction) =>
              faction.name?.toLowerCase().includes(value)
            );
            setFilteredFactions(filteredFactions);
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
            {filteredFactions
              .slice()
              .sort((a, b) => {
                const nameA = a.name ?? "";
                const nameB = b.name ?? "";
                return nameA.localeCompare(nameB);
              })
              .map((faction: Faction) => {
                return (
                  <tr key={faction.id} style={{ cursor: "pointer" }}>
                    <td
                      onClick={() => {
                        setSelectedFaction(faction);
                        setPanelOpen(true);
                      }}
                    >
                      {faction.name}
                    </td>
                    <td
                      onClick={() => {
                        setSelectedFaction(faction);
                        setPanelOpen(true);
                      }}
                    >
                      {faction?.locations
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
        <FactionPanel
          faction={selectedFaction}
          locations={props.locations}
          npcs={props.npcs}
          isOpen={panelOpen}
          onDismiss={() => {
            setPanelOpen(false);
            setSelectedFaction(undefined);
          }}
          saveFaction={props.saveFaction}
          deleteFaction={props.deleteFaction}
        />
      ) : null}
    </div>
  );
};

export default FactionSection;
