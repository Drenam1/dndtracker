import { Location } from "../../models/Location";
import { Npc } from "../../models/Npc";
import { Faction } from "../../models/Faction";
import React from "react";
import { DefaultButton } from "@fluentui/react";
import LocationPanel from "./LocationPanel/LocationPanel";

export interface ILocationSectionProps {
  npcs: Npc[];
  locations: Location[];
  factions: Faction[];
  saveLocation: (location: Location) => void;
  deleteLocation?: (location: Location) => void;
}

const LocationSection: React.FunctionComponent<ILocationSectionProps> = (
  props
) => {
  const [panelOpen, setPanelOpen] = React.useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = React.useState<
    Location | undefined
  >(undefined);
  const [filteredLocations, setFilteredLocations] = React.useState<
    Location[] | []
  >(props.locations);

  React.useEffect(() => {
    setFilteredLocations(props.locations);
  }, [props.locations]);

  return (
    <div className="npcSection section">
      <DefaultButton
        text="Create New Location"
        className="createNewItemButton"
        onClick={() => {
          setPanelOpen(true);
        }}
      />
      <div>
        <input
          type="text"
          placeholder="Filter Locations..."
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            const filteredLocations = props.locations.filter((location) =>
              location.name?.toLowerCase().includes(value)
            );
            setFilteredLocations(filteredLocations);
          }}
          className="filterInput"
        />
        <table>
          <thead>
            <tr>
              <th style={{ minWidth: "200px" }}>Name</th>
              <th style={{ minWidth: "200px" }}>Associated Factions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLocations
              .slice()
              .sort((a, b) => {
                const nameA = a.name ?? "";
                const nameB = b.name ?? "";
                return nameA.localeCompare(nameB);
              })
              .map((location: Location) => {
                return (
                  <tr key={location.id} style={{ cursor: "pointer" }}>
                    <td
                      onClick={() => {
                        setSelectedLocation(location);
                        setPanelOpen(true);
                      }}
                    >
                      {location.name}
                    </td>
                    <td
                      onClick={() => {
                        setSelectedLocation(location);
                        setPanelOpen(true);
                      }}
                    >
                      {props.factions
                        .filter(
                          (faction: Faction) =>
                            Array.isArray(faction.locations) &&
                            faction.locations
                              .map((location: Location) => location.id)
                              .includes(location?.id)
                        )
                        .map((faction: Faction) => faction.name)
                        .join(", ")}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {panelOpen ? (
        <LocationPanel
          location={selectedLocation}
          locations={props.locations}
          factions={props.factions}
          npcs={props.npcs}
          isOpen={panelOpen}
          onDismiss={() => {
            setPanelOpen(false);
            setSelectedLocation(undefined);
          }}
          saveLocation={props.saveLocation}
          deleteLocation={props.deleteLocation}
        />
      ) : null}
    </div>
  );
};

export default LocationSection;
