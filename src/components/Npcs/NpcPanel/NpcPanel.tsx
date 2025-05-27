import React from "react";
import "./NpcPanel.css";
import {
  DefaultButton,
  Panel,
  PanelType,
  PrimaryButton,
  TextField,
} from "@fluentui/react";
import { Npc, Relationship } from "../../../models/Npc";
import { generate_uuidv4 } from "../../../helpers/RollHelper";
import { Faction } from "../../../models/Faction";
import { Location } from "../../../models/Location";
import FactionControl from "../../controls/FactionControl/FactionControl";
import LocationControl from "../../controls/LocationControl/LocationControl";
import RelationshipControl from "../../controls/RelationshipControl/RelationshipControl";
import ClockControl from "../../controls/ClockControl/ClockControl";
import RandomizationHelper from "../../../helpers/RandomizationHelper";

export interface INpcPanelProps {
  npc?: Npc;
  factions: Faction[];
  locations: Location[];
  npcs: Npc[];
  isOpen: boolean;
  onDismiss?: any;
  disabled?: boolean;
  saveNpc?: (npc: Npc) => void;
  deleteNpc?: (npc: Npc) => void;
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
      locations: [],
      factions: [],
      combatTactics: "",
      socialTactics: "",
      additionalNotes: "",
    }
  );

  React.useEffect(() => {
    if (props.npc) {
      setCurrentNpc(props.npc);
    }
  }, [props.npc]);
  console.log(props.disabled);

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
      onRenderHeader={() => (
        <>
          {props.disabled ? null : (
            <DefaultButton
              text="Prefill empty fields"
              onClick={() => {
                const randomGender = RandomizationHelper.randomizeGender();
                const randomId = generate_uuidv4();
                const updatedNpc = {
                  ...currentNpc,
                  id: currentNpc?.id ?? randomId,
                  name:
                    currentNpc?.name ||
                    RandomizationHelper.randomizeName(randomGender),
                  physicalDescription:
                    currentNpc?.physicalDescription ||
                    `${RandomizationHelper.randomizeAppearance()} ${randomGender.toLowerCase()}`,
                  voiceNotes:
                    currentNpc?.voiceNotes ||
                    RandomizationHelper.randomizeVoiceNote(),
                  personality:
                    currentNpc?.personality ||
                    RandomizationHelper.randomizePersonality(),
                  combatTactics:
                    currentNpc?.combatTactics || "No combat tactics provided.",
                  socialTactics:
                    currentNpc?.socialTactics || "No social tactics provided.",
                  additionalNotes:
                    currentNpc?.additionalNotes ||
                    "No additional notes provided.",
                  clocks: currentNpc?.clocks || [],
                  relationships:
                    (currentNpc?.relationships?.length ?? 0) > 0
                      ? currentNpc?.relationships
                      : [
                          RandomizationHelper.randomizeRelationship(
                            props.npc || currentNpc || { id: randomId },
                            props.npcs
                          ),
                        ],
                  locations:
                    (currentNpc?.locations?.length ?? 0) > 0
                      ? currentNpc?.locations
                      : RandomizationHelper.randomizeLocations(props.locations),
                  factions:
                    (currentNpc?.factions?.length ?? 0) > 0
                      ? currentNpc?.factions
                      : RandomizationHelper.randomizeFactions(props.factions),
                };
                console.log("Updated NPC:", updatedNpc);
                setCurrentNpc(updatedNpc);
              }}
            />
          )}
        </>
      )}
      onRenderFooterContent={() => (
        <div className="panelFooter">
          {props.disabled ? null : (
            <>
              <PrimaryButton
                text="Save"
                onClick={() => {
                  if (props.saveNpc && currentNpc) {
                    props.saveNpc(currentNpc);
                    props.onDismiss();
                  }
                }}
              />
              {props.npc && (
                <DefaultButton
                  text="Delete"
                  onClick={() => {
                    if (props.deleteNpc && props.npc) {
                      props.deleteNpc(props.npc);
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
          value={currentNpc?.name}
          disabled={props.disabled}
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
          disabled={props.disabled}
          value={currentNpc?.physicalDescription}
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
          disabled={props.disabled}
          value={currentNpc?.voiceNotes}
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
          disabled={props.disabled}
          value={currentNpc?.personality}
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
          defaultValue={currentNpc?.clocks}
          disabled={props.disabled}
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
          disabled={props.disabled}
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
          defaultValue={currentNpc?.locations}
          allLocations={props.locations}
          disabled={props.disabled}
          onSave={(locations: Location[]) => {
            if (currentNpc) {
              const updatedNpc = {
                ...currentNpc,
                locations: locations,
              };
              setCurrentNpc(updatedNpc);
            } else {
              setCurrentNpc({
                id: generate_uuidv4(),
                locations: locations,
              });
            }
          }}
        />
        <FactionControl
          defaultValue={currentNpc?.factions}
          allFactions={props.factions}
          disabled={props.disabled}
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
          disabled={props.disabled}
          value={currentNpc?.combatTactics}
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
          disabled={props.disabled}
          value={currentNpc?.socialTactics}
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
      <TextField
        label="Additional Notes"
        multiline
        rows={4}
        disabled={props.disabled}
        value={currentNpc?.additionalNotes}
        onChange={(event, newValue) => {
          if (currentNpc) {
            const updatedNpc = {
              ...currentNpc,
              additionalNotes: newValue,
            };
            setCurrentNpc(updatedNpc);
          } else {
            setCurrentNpc({
              id: "",
              additionalNotes: newValue,
            });
          }
        }}
      />
    </Panel>
  );
};

export default NpcPanel;
