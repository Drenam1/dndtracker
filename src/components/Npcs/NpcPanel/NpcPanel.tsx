import React from "react";
import "./NpcPanel.css";
import { Panel, PanelType, PrimaryButton, TextField } from "@fluentui/react";
import { Npc } from "../../../models/Npc";
import { generate_uuidv4 } from "../../../helpers/RollHelper";

export interface INpcPanelProps {
  npc?: Npc;
  isOpen: boolean;
  onDismiss?: any;
  saveNpc?: (npc: Npc) => void;
}

const NpcPanel: React.FunctionComponent<INpcPanelProps> = (props) => {
  const [currentNpc, setCurrentNpc] = React.useState<Npc | undefined>(
    props.npc
  );
  console.log("Current NPC:", currentNpc);
  return (
    <Panel
      isOpen={props.isOpen}
      onDismiss={props.onDismiss}
      isLightDismiss={true}
      isBlocking={true}
      type={PanelType.medium}
      onRenderFooterContent={() => (
        <PrimaryButton
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
                type: "npc",
                id: generate_uuidv4(),
                name: newValue,
              });
            }
          }}
        />
        <TextField
          label="Physical Description"
          multiline
          rows={3}
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
                type: "npc",
                id: "",
                physicalDescription: newValue,
              });
            }
          }}
        />
        <TextField
          label="Factions"
          multiline
          rows={3}
          defaultValue={props.npc?.factions
            ?.map((faction) => faction.name)
            .join(", ")}
        />
        <TextField label="Location" defaultValue={props.npc?.location?.name} />
      </div>
    </Panel>
  );
};

export default NpcPanel;
