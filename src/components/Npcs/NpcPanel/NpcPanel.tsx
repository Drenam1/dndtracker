import React from "react";
import "./NpcPanel.css";
import { Panel, PanelType, PrimaryButton, TextField } from "@fluentui/react";
import { Npc, Relationship } from "../../../models/Npc";
import { generate_uuidv4 } from "../../../helpers/RollHelper";
import { Faction } from "../../../models/Faction";
import { Location } from "../../../models/Location";
import FactionControl from "../../controls/FactionControl/FactionControl";
import LocationControl from "../../controls/LocationControl/LocationControl";
import RelationshipControl from "../../controls/RelationshipControl/RelationshipControl";
import ClockControl from "../../controls/ClockControl/ClockControl";

export interface INpcPanelProps {
  npc?: Npc;
  factions: Faction[];
  locations: Location[];
  npcs: Npc[];
  isOpen: boolean;
  onDismiss?: any;
  saveNpc?: (npc: Npc) => void;
}

const NpcPanel: React.FunctionComponent<INpcPanelProps> = (props) => {
  const [currentNpc, setCurrentNpc] = React.useState<Npc | undefined>(
    props.npc || {
      id: generate_uuidv4(),
      name: "",
      physicalDescription: "",
      voiceNotes: "",
      personality: "",
      clocks: [],
      relationships: [],
      location: undefined,
      factions: [],
      combatTactics: "",
      socialTactics: "",
    }
  );

  React.useEffect(() => {
    if (props.npc) {
      setCurrentNpc(props.npc);
    }
  }, [props.npc]);

  return (
    <Panel
      isOpen={props.isOpen}
      onDismiss={() => {
        setCurrentNpc(undefined);
        props.onDismiss();
      }}
      isLightDismiss={true}
      isBlocking={true}
      type={PanelType.medium}
      onRenderFooterContent={() => (
        <PrimaryButton
          text="Save"
          onClick={() => {
            if (props.saveNpc && currentNpc) {
              props.saveNpc(currentNpc);
              props.onDismiss();
            }
          }}
        />
      )}
    >
      <div className="control">
        <TextField
          label="Name"
          defaultValue={props.npc?.name}
          onChange={(event, newValue) => {
            if (currentNpc) {
              const updatedNpc = {
                ...currentNpc,
                name: newValue,
              };
              setCurrentNpc(updatedNpc);
            } else {
              setCurrentNpc({
                id: generate_uuidv4(),
                name: newValue,
              });
            }
          }}
        />
        <h3>Descriptors</h3>
        <TextField
          label="Physical"
          multiline
          rows={2}
          defaultValue={props.npc?.physicalDescription}
          onChange={(event, newValue) => {
            if (currentNpc) {
              const updatedNpc = {
                ...currentNpc,
                physicalDescription: newValue,
              };
              setCurrentNpc(updatedNpc);
            } else {
              setCurrentNpc({
                id: "",
                physicalDescription: newValue,
              });
            }
          }}
        />
        <TextField
          label="Voice Notes"
          multiline
          rows={2}
          defaultValue={props.npc?.voiceNotes}
          onChange={(event, newValue) => {
            if (currentNpc) {
              const updatedNpc = {
                ...currentNpc,
                voiceNotes: newValue,
              };
              setCurrentNpc(updatedNpc);
            } else {
              setCurrentNpc({
                id: "",
                voiceNotes: newValue,
              });
            }
          }}
        />
        <TextField
          label="Personality"
          multiline
          rows={2}
          defaultValue={props.npc?.personality}
          onChange={(event, newValue) => {
            if (currentNpc) {
              const updatedNpc = {
                ...currentNpc,
                personality: newValue,
              };
              setCurrentNpc(updatedNpc);
            } else {
              setCurrentNpc({
                id: "",
                personality: newValue,
              });
            }
          }}
        />
        <ClockControl
          defaultValue={props.npc?.clocks}
          onSave={(clocks) => {
            if (currentNpc) {
              const updatedNpc = {
                ...currentNpc,
                clocks: clocks,
              };
              setCurrentNpc(updatedNpc);
            } else {
              setCurrentNpc({
                id: generate_uuidv4(),
                clocks: clocks,
              });
            }
          }}
        />
        <h3>Relationships</h3>
        <RelationshipControl
          defaultValue={currentNpc?.relationships}
          allNpcs={props.npcs.filter((npc) => npc.id !== currentNpc?.id)}
          onSave={(relationships: Relationship[]) => {
            if (currentNpc) {
              const updatedNpc = {
                ...currentNpc,
                relationships: relationships,
              };
              setCurrentNpc(updatedNpc);
            } else {
              setCurrentNpc({
                id: generate_uuidv4(),
                relationships: relationships,
              });
            }
          }}
        />
        <LocationControl
          npc={currentNpc}
          allLocations={props.locations}
          onSave={(location: Location) => {
            if (currentNpc) {
              const updatedNpc = {
                ...currentNpc,
                location: location,
              };
              setCurrentNpc(updatedNpc);
            } else {
              setCurrentNpc({
                id: generate_uuidv4(),
                location: location,
              });
            }
          }}
        />
        <FactionControl
          defaultValue={currentNpc?.factions}
          allFactions={props.factions}
          onSave={(factions: Faction[]) => {
            if (currentNpc) {
              const updatedNpc = {
                ...currentNpc,
                factions: factions,
              };
              setCurrentNpc(updatedNpc);
            } else {
              setCurrentNpc({
                id: generate_uuidv4(),
                factions: factions,
              });
            }
          }}
        />
        <h3>Tactics</h3>
        <TextField
          label="Combat Tactics"
          multiline
          rows={2}
          defaultValue={props.npc?.combatTactics}
          onChange={(event, newValue) => {
            if (currentNpc) {
              const updatedNpc = {
                ...currentNpc,
                combatTactics: newValue,
              };
              setCurrentNpc(updatedNpc);
            } else {
              setCurrentNpc({
                id: "",
                combatTactics: newValue,
              });
            }
          }}
        />
        <TextField
          label="Social Tactics"
          multiline
          rows={2}
          defaultValue={props.npc?.socialTactics}
          onChange={(event, newValue) => {
            if (currentNpc) {
              const updatedNpc = {
                ...currentNpc,
                socialTactics: newValue,
              };
              setCurrentNpc(updatedNpc);
            } else {
              setCurrentNpc({
                id: "",
                socialTactics: newValue,
              });
            }
          }}
        />
      </div>
    </Panel>
  );
};

export default NpcPanel;
