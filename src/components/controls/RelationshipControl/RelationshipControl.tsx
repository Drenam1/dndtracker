import React from "react";
import { Npc, Relationship } from "../../../models/Npc";
import { Panel, PanelType, PrimaryButton } from "@fluentui/react";
import "../../../genericStyles/GenericStyles.css";

export interface IRelationshipControlProps {
  label?: string;
  defaultValue?: Relationship[];
  allNpcs?: Npc[];
  onSave?: (relatonships: Relationship[]) => void;
}

const RelationshipControl: React.FunctionComponent<
  IRelationshipControlProps
> = (props) => {
  const [relationships, setRelationships] = React.useState<Relationship[]>(
    props.defaultValue || []
  );
  const [panelOpen, setPanelOpen] = React.useState<boolean>(false);
  return (
    <div className="npc-control">
      <h3 className="formTitle">{props.label || "NPCs"}</h3>
      <PrimaryButton
        text={"Manage relationships"}
        onClick={() => setPanelOpen(true)}
      />
      {props.defaultValue && props.defaultValue.length > 0 ? (
        <div>
          <ul>
            {relationships.map((relationship) => (
              <li key={relationship.person.id}>{relationship.person.name} </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No npcs selected.</div>
      )}
      {panelOpen && (
        <Panel
          isOpen={panelOpen}
          onDismiss={() => {
            setRelationships(props.defaultValue || []);
            setPanelOpen(false);
          }}
          isLightDismiss={true}
          isBlocking={true}
          type={PanelType.smallFixedFar}
        >
          <div>
            <h3>Select a Npc</h3>
            {props.allNpcs && props.allNpcs.length > 0 ? (
              <div>
                <form>
                  {props.allNpcs.map((npc) => (
                    <div key={npc.id} style={{ marginBottom: 8 }}>
                      <label>
                        <input type="checkbox" name="npc" value={npc.id} />
                        {npc.name}
                      </label>
                    </div>
                  ))}
                </form>
                <PrimaryButton
                  text="Save"
                  onClick={() => {
                    setPanelOpen(false);
                  }}
                  style={{ marginTop: 16 }}
                />
              </div>
            ) : (
              <div>No npcs available.</div>
            )}
          </div>
        </Panel>
      )}
    </div>
  );
};
export default RelationshipControl;
