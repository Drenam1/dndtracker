import React from "react";
import "./FactionPanel.css";
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
import { Faction } from "../../../models/Faction";
import { Location } from "../../../models/Location";
import LocationControl from "../../controls/LocationControl/LocationControl";
import ClockControl from "../../controls/ClockControl/ClockControl";
import { Npc } from "../../../models/Npc";
import NpcPanel from "../../Npcs/NpcPanel/NpcPanel";

export interface IFactionPanelProps {
  faction?: Faction;
  locations: Location[];
  factions: Faction[];
  npcs?: Npc[];
  isOpen: boolean;
  onDismiss?: any;
  disabled?: boolean;
  saveFaction?: (faction: Faction) => void;
  deleteFaction?: (faction: Faction) => void;
}

const FactionPanel: React.FunctionComponent<IFactionPanelProps> = (props) => {
  const [currentFaction, setCurrentFaction] = React.useState<
    Faction | undefined
  >(
    props.faction || {
      id: generate_uuidv4(),
      name: "",
      description: "",
      locations: [],
      tier: 0,
      ideaology: "",
      members: [],
      clocks: [],
    }
  );
  const [childElement, setChildElement] = React.useState<JSX.Element>();

  React.useEffect(() => {
    if (props.faction) {
      setCurrentFaction(props.faction);
    }
  }, [props.faction]);

  return (
    <Panel
      isOpen={props.isOpen}
      onDismiss={() => {
        setCurrentFaction(undefined);
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
                  if (props.saveFaction && currentFaction) {
                    props.saveFaction(currentFaction);
                    props.onDismiss();
                  }
                }}
              />
              {props.faction && (
                <DefaultButton
                  text="Delete"
                  onClick={() => {
                    if (props.deleteFaction && props.faction) {
                      props.deleteFaction(props.faction);
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
          defaultValue={props.faction?.name}
          disabled={props.disabled}
          onChange={(event, newValue) => {
            if (currentFaction) {
              const updatedFaction = {
                ...currentFaction,
                name: newValue,
              };
              setCurrentFaction(updatedFaction);
            } else {
              setCurrentFaction({
                id: generate_uuidv4(),
                name: newValue,
              });
            }
          }}
        />
        <TextField
          label="Description"
          multiline
          rows={2}
          disabled={props.disabled}
          defaultValue={props.faction?.description}
          onChange={(event, newValue) => {
            if (currentFaction) {
              const updatedFaction = {
                ...currentFaction,
                description: newValue,
              };
              setCurrentFaction(updatedFaction);
            } else {
              setCurrentFaction({
                id: "",
                description: newValue,
              });
            }
          }}
        />
        <Slider
          label="Tier"
          defaultValue={props.faction?.tier}
          min={1}
          max={5}
          step={1}
          disabled={props.disabled}
          showValue={true}
          onChange={(newValue) => {
            if (currentFaction) {
              const updatedFaction = {
                ...currentFaction,
                tier: newValue,
              };
              setCurrentFaction(updatedFaction);
            } else {
              setCurrentFaction({
                id: "",
                tier: newValue,
              });
            }
          }}
        />
        <TextField
          label="Ideaology"
          multiline
          rows={2}
          disabled={props.disabled}
          defaultValue={props.faction?.ideaology}
          onChange={(event, newValue) => {
            if (currentFaction) {
              const updatedFaction = {
                ...currentFaction,
                ideaology: newValue,
              };
              setCurrentFaction(updatedFaction);
            } else {
              setCurrentFaction({
                id: "",
                ideaology: newValue,
              });
            }
          }}
        />
        <ClockControl
          defaultValue={props.faction?.clocks}
          disabled={props.disabled}
          onSave={(clocks) => {
            if (currentFaction) {
              const updatedFaction = {
                ...currentFaction,
                clocks: clocks,
              };
              setCurrentFaction(updatedFaction);
            } else {
              setCurrentFaction({
                id: generate_uuidv4(),
                clocks: clocks,
              });
            }
          }}
        />
        <Dropdown
          label="Leader"
          placeholder="Select Leader"
          options={
            props.npcs
              ?.filter(
                (npc: any) =>
                  Array.isArray(npc.factions) &&
                  npc.factions
                    .map((faction: Faction) => faction.id)
                    .includes(currentFaction?.id)
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
          selectedKey={currentFaction?.leader?.id}
          onChange={(event, option) => {
            if (currentFaction && option) {
              const updatedFaction = {
                ...currentFaction,
                leader: props.npcs?.find((npc) => npc.id === option.key),
              };
              setCurrentFaction(updatedFaction);
            } else {
              setCurrentFaction({
                id: generate_uuidv4(),
                leader: props.npcs?.find((npc) => npc.id === option?.key),
              });
            }
          }}
        />

        <LocationControl
          defaultValue={currentFaction?.locations}
          allLocations={props.locations}
          allFactions={props.factions}
          allNpcs={props.npcs}
          disabled={props.disabled}
          onSave={(locations: Location[]) => {
            if (currentFaction) {
              const updatedFaction = {
                ...currentFaction,
                locations: locations,
              };
              setCurrentFaction(updatedFaction);
            } else {
              setCurrentFaction({
                id: generate_uuidv4(),
                locations: locations,
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
        defaultValue={props.faction?.additionalNotes}
        onChange={(event, newValue) => {
          if (currentFaction) {
            const updatedFaction = {
              ...currentFaction,
              additionalNotes: newValue,
            };
            setCurrentFaction(updatedFaction);
          } else {
            setCurrentFaction({
              id: "",
              additionalNotes: newValue,
            });
          }
        }}
      />
      {props.npcs && Array.isArray(props.npcs) && currentFaction?.id && (
        <div className="npcList">
          <h4>NPCs in this Faction</h4>
          <ul>
            {props.npcs
              .filter(
                (npc: any) =>
                  Array.isArray(npc.factions) &&
                  npc.factions
                    .map((faction: Faction) => faction.id)
                    .includes(currentFaction?.id)
              )
              ?.sort((a, b) => {
                const nameA = a.name ?? "";
                const nameB = b.name ?? "";
                return nameA.localeCompare(nameB);
              })
              .map((npc: any) => (
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
                      cursor: "pointer",
                      width: "100%",
                    }}
                    onDoubleClick={() => {
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
                    }}
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

export default FactionPanel;
