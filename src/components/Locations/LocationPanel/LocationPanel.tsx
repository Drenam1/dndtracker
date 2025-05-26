import React from "react";
import "./LocationPanel.css";
import {
  Panel,
  PanelType,
  PrimaryButton,
  DefaultButton,
  Slider,
  TextField,
  Dropdown,
} from "@fluentui/react";
import { generate_uuidv4 } from "../../../helpers/RollHelper";
import { Location } from "../../../models/Location";
import ClockControl from "../../controls/ClockControl/ClockControl";
import { Npc } from "../../../models/Npc";
import { Faction } from "../../../models/Faction";

export interface ILocationPanelProps {
  location?: Location;
  locations: Location[];
  factions?: Faction[];
  npcs?: Npc[];
  isOpen: boolean;
  onDismiss?: any;
  saveLocation?: (location: Location) => void;
  deleteLocation?: (location: Location) => void;
}

const LocationPanel: React.FunctionComponent<ILocationPanelProps> = (props) => {
  const [currentLocation, setCurrentLocation] = React.useState<
    Location | undefined
  >(
    props.location || {
      id: generate_uuidv4(),
      name: "",
      description: "",
      greaterLocation: undefined,
      leadership: undefined,
      population: 0,
      clocks: [],
    }
  );

  React.useEffect(() => {
    if (props.location) {
      setCurrentLocation(props.location);
    }
  }, [props.location]);

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

    return props.factions?.filter((faction) =>
      faction.locations?.some((loc) =>
        allLocations.some((l) => l.id === loc.id)
      )
    );
  };
  const getAllAssociatedNpcs = (location: Location) => {
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

    return props.npcs?.filter((npc) =>
      npc.locations?.some((loc) => allLocations.some((l) => l.id === loc.id))
    );
  };

  return (
    <Panel
      isOpen={props.isOpen}
      onDismiss={() => {
        setCurrentLocation(undefined);
        props.onDismiss();
      }}
      isLightDismiss={true}
      isBlocking={true}
      type={PanelType.medium}
      onRenderFooterContent={() => (
        <div className="panelFooter">
          <PrimaryButton
            text="Save"
            onClick={() => {
              if (props.saveLocation && currentLocation) {
                props.saveLocation(currentLocation);
                props.onDismiss();
              }
            }}
          />
          {props.location && (
            <DefaultButton
              text="Delete"
              onClick={() => {
                if (props.deleteLocation && props.location) {
                  props.deleteLocation(props.location);
                  props.onDismiss();
                }
              }}
            />
          )}
        </div>
      )}
    >
      <div className="control">
        <TextField
          label="Name"
          defaultValue={props.location?.name}
          onChange={(event, newValue) => {
            const safeName = newValue ?? "";
            if (currentLocation) {
              const updatedLocation = {
                ...currentLocation,
                name: safeName,
              };
              setCurrentLocation(updatedLocation);
            } else {
              setCurrentLocation({
                id: generate_uuidv4(),
                name: safeName,
              });
            }
          }}
        />
        <TextField
          label="Description"
          multiline
          rows={2}
          defaultValue={props.location?.description}
          onChange={(event, newValue) => {
            if (currentLocation) {
              const updatedLocation = {
                ...currentLocation,
                description: newValue,
              };
              setCurrentLocation(updatedLocation);
            } else {
              setCurrentLocation({
                id: "",
                description: newValue,
              });
            }
          }}
        />
        <Dropdown
          label="Greater Location"
          placeholder="Select Greater Location"
          options={
            props.locations
              ?.filter((location: any) => location.id !== currentLocation?.id)
              ?.map((location) => ({
                key: location.id,
                text: location.name ?? "",
              })) || []
          }
          selectedKey={currentLocation?.greaterLocation?.id}
          onChange={(event, option) => {
            if (currentLocation && option) {
              const updatedLocation = {
                ...currentLocation,
                greaterLocation: props.locations?.find(
                  (location) => location.id === option.key
                ),
              };
              setCurrentLocation(updatedLocation);
            } else {
              setCurrentLocation({
                id: generate_uuidv4(),
                greaterLocation: props.locations?.find(
                  (location) => location.id === option?.key
                ),
              });
            }
          }}
        />
        <ClockControl
          label="Clocks"
          defaultValue={props.location?.clocks}
          onSave={(clocks) => {
            if (currentLocation) {
              const updatedLocation = {
                ...currentLocation,
                clocks: clocks,
              };
              setCurrentLocation(updatedLocation);
            } else {
              setCurrentLocation({
                id: generate_uuidv4(),
                clocks: clocks,
              });
            }
          }}
        />
        <Dropdown
          label="Leadership"
          placeholder="Select Leader"
          options={
            props.npcs
              ?.filter(
                (npc: any) =>
                  Array.isArray(npc.locations) &&
                  npc.locations
                    .map((location: Location) => location.id)
                    .includes(currentLocation?.id)
              )
              ?.sort((a, b) => {
                const nameA = a.name ?? "";
                const nameB = b.name ?? "";
                return nameA.localeCompare(nameB);
              })
              ?.map((npc) => ({
                key: npc.id,
                text: npc.name ?? "",
              })) || []
          }
          selectedKey={currentLocation?.leadership?.id}
          onChange={(event, option) => {
            if (currentLocation && option) {
              const updatedLocation = {
                ...currentLocation,
                leadership: props.npcs?.find((npc) => npc.id === option.key),
              };
              setCurrentLocation(updatedLocation);
            } else {
              setCurrentLocation({
                id: generate_uuidv4(),
                leadership: props.npcs?.find((npc) => npc.id === option?.key),
              });
            }
          }}
        />

        <Slider
          label="Population"
          defaultValue={currentLocation?.population ?? 0}
          min={0}
          max={200000}
          step={1000}
          showValue={true}
          onChange={(newValue) => {
            if (currentLocation) {
              const updatedLocation = {
                ...currentLocation,
                population: newValue,
              };
              setCurrentLocation(updatedLocation);
            } else {
              setCurrentLocation({
                id: "",
                population: newValue,
              });
            }
          }}
        />
      </div>
      <TextField
        label="Additional Notes"
        multiline
        rows={4}
        defaultValue={props.location?.additionalNotes}
        onChange={(event, newValue) => {
          if (currentLocation) {
            const updatedLocation = {
              ...currentLocation,
              additionalNotes: newValue,
            };
            setCurrentLocation(updatedLocation);
          } else {
            setCurrentLocation({
              id: "",
              additionalNotes: newValue,
            });
          }
        }}
      />
      {props.factions &&
        Array.isArray(props.factions) &&
        currentLocation?.id && (
          <div className="factionList">
            <h4>Factions in this Location</h4>
            <ul>
              {getAllAssociatedFactions(currentLocation)?.map(
                (faction: any) => (
                  <li key={faction.id}>{faction.name}</li>
                )
              )}
            </ul>
          </div>
        )}
      {props.npcs && Array.isArray(props.npcs) && currentLocation?.id && (
        <div className="npcList">
          <h4>NPCs in this Location</h4>
          <ul>
            {getAllAssociatedNpcs(currentLocation)
              ?.sort((a, b) => {
                const nameA = a.name ?? "";
                const nameB = b.name ?? "";
                return nameA.localeCompare(nameB);
              })
              ?.map((npc: any) => (
                <li key={npc.id}>{npc.name}</li>
              ))}
          </ul>
        </div>
      )}
    </Panel>
  );
};

export default LocationPanel;
