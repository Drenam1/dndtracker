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

export interface IFactionPanelProps {
  faction?: Faction;
  locations: Location[];
  npcs?: Npc[]; // Assuming npcs is an array of NPC objects
  isOpen: boolean;
  onDismiss?: any;
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
        </div>
      )}
    >
      <div className="control">
        <TextField
          label="Name"
          defaultValue={props.faction?.name}
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
              ?.map((npc) => ({
                key: npc.id,
                text: npc.name ?? "",
              })) || []
          }
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
                .map((npc: any) => (
                  <li key={npc.id}>{npc.name}</li>
                ))}
            </ul>
          </div>
        )}
        <LocationControl
          defaultValue={currentFaction?.locations}
          allLocations={props.locations}
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
    </Panel>
  );
};

export default FactionPanel;
