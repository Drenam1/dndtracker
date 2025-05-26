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

  const getAllAssociatedFactions = (location: Location) => {
    const allLocations: Location[] = [];
    const traverse = (loc: Location) => {
      const children = props.locations.filter(
        (l) => l.greaterLocation && l.greaterLocation.id === loc.id
      );
      allLocations.push(...children);
      children.forEach(traverse);
    };
    traverse(location);
    allLocations.push(location);

    return props.factions.filter((faction) =>
      faction.locations?.some((loc) =>
        allLocations.some((l) => l.id === loc.id)
      )
    );
  };

  return (
    <div className="npcSection section">
      <DefaultButton
        text="Create New Location"
        className="createNewItemButton"
        onClick={() => {
          setPanelOpen(true);
        }}
      />
      <input
        type="text"
        placeholder="Filter Locations..."
        onChange={(e) => {
          const value = e.target.value.toLowerCase();
          const filteredLocations = props.locations.filter(
            (location) =>
              location.name?.toLowerCase().includes(value) ||
              getAllAssociatedFactions(location).some((faction: Faction) =>
                faction.name?.toLowerCase().includes(value)
              )
          );
          setFilteredLocations(filteredLocations);
        }}
        className="filterInput"
      />
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Associated Factions</th>
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
                      {getAllAssociatedFactions(location)
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
