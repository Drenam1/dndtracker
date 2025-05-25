import React from "react";
import "./NpcPanel.css";
import { Panel, PanelType, TextField } from "@fluentui/react";

export interface INpcPanelProps {
  items?: any[];
  onDismiss?: any;
}

const NpcPanel: React.FunctionComponent<INpcPanelProps> = (props) => {
  const items = props.items || [];
  const currentItem = items[items.length - 1] || {};
  return (
    <Panel
      isOpen={true}
      onDismiss={props.onDismiss}
      isLightDismiss={true}
      isBlocking={true}
      type={PanelType.medium}
    >
      <div className="control">
        <TextField label="Name" defaultValue={currentItem.name} />
        <TextField
          label="Physical Description"
          multiline
          rows={3}
          defaultValue={currentItem.physicalDescription}
        />
        <TextField
          label="Factions"
          multiline
          rows={3}
          defaultValue={currentItem.factions}
        />
        <TextField label="Location" defaultValue={currentItem.location} />
      </div>
    </Panel>
  );
};

export default NpcPanel;
