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
import NpcPanel from "../../Npcs/NpcPanel/NpcPanel";
import FactionPanel from "../../Factions/FactionPanel/FactionPanel";

export interface ILocationPanelProps {
  location?: Location;
  locations: Location[];
  factions?: Faction[];
  npcs?: Npc[];
  isOpen: boolean;
  onDismiss?: any;
  disabled?: boolean;
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
  const [childElement, setChildElement] = React.useState<JSX.Element>();

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
          {props.disabled ? null : (
            <>
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
            </>
          )}
        </div>
      )}
    >
      <div className="control">
        <TextField
          label="Name"
          defaultValue={props.location?.name}
          disabled={props.disabled}
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
          disabled={props.disabled}
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
          disabled={props.disabled}
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
          disabled={props.disabled}
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
          disabled={props.disabled}
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
          disabled={props.disabled}
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
        disabled={props.disabled}
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
                  <li
                    key={faction.id}
                    style={{ listStyle: "none", margin: 0, padding: 0 }}
                  >
                    <button
                      type="button"
                      className="npc-list-item-button"
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        margin: 0,
                        textAlign: "left",
                        cursor: props.disabled ? "default" : "pointer",
                        width: "100%",
                      }}
                      onClick={() => {
                        if (!props.disabled) {
                          setChildElement(
                            <FactionPanel
                              faction={faction}
                              factions={props.factions ?? []}
                              locations={props.locations ?? []}
                              npcs={props.npcs ?? []}
                              disabled={true}
                              isOpen={true}
                              onDismiss={() => {
                                setChildElement(undefined);
                              }}
                              saveFaction={undefined}
                              deleteFaction={undefined}
                            />
                          );
                        }
                      }}
                      disabled={props.disabled}
                    >
                      {faction.name}
                    </button>
                  </li>
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
                <li
                  key={npc.id}
                  style={{ listStyle: "none", margin: 0, padding: 0 }}
                >
                  <button
                    type="button"
                    className="npc-list-item-button"
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      margin: 0,
                      textAlign: "left",
                      cursor: props.disabled ? "default" : "pointer",
                      width: "100%",
                    }}
                    onClick={() => {
                      if (!props.disabled) {
                        setChildElement(
                          <NpcPanel
                            npc={npc}
                            factions={props.factions ?? []}
                            locations={props.locations ?? []}
                            npcs={props.npcs ?? []}
                            disabled={true}
                            isOpen={true}
                            onDismiss={() => {
                              setChildElement(undefined);
                            }}
                            saveNpc={undefined}
                            deleteNpc={undefined}
                          />
                        );
                      }
                    }}
                    disabled={props.disabled}
                  >
                    {npc.name}
                  </button>
                </li>
              ))}
          </ul>
          {childElement}
        </div>
      )}
    </Panel>
  );
};

export default LocationPanel;
