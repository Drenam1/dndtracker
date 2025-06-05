import React from "react";
import { Npc, Relationship } from "../../../models/Npc";
import { Panel, PanelType, PrimaryButton } from "@fluentui/react";
import "../../../genericStyles/GenericStyles.css";
import { generate_uuidv4 } from "../../../helpers/RollHelper";
import NpcPanel from "../../Npcs/NpcPanel/NpcPanel";
import { Faction } from "../../../models/Faction";
import { Location } from "../../../models/Location";

export interface IRelationshipControlProps {
  defaultValue?: Relationship[];
  allNpcs?: Npc[];
  allFactions?: Faction[];
  allLocations?: Location[];
  disabled?: boolean;
  onSave?: (relatonships: Relationship[]) => void;
}

const RelationshipControl: React.FunctionComponent<
  IRelationshipControlProps
> = (props) => {
  const [relationships, setRelationships] = React.useState<Relationship[]>(
    props.defaultValue || []
  );
  const [panelOpen, setPanelOpen] = React.useState<boolean>(false);
  const [childElement, setChildElement] = React.useState<JSX.Element>();

  React.useEffect(() => {
    const updatedRelationships = props.defaultValue?.map((relationship) => {
      return {
        ...relationship,
        person:
          props.allNpcs?.find((npc) => npc.id === relationship.person.id) ||
          relationship.person,
      };
    });
    setRelationships(updatedRelationships || []);
  }, [props.defaultValue, props.allNpcs]);

  return (
    <div className="npc-control">
      <h3 className="formTitle">Characters</h3>
      {relationships && relationships.length > 0 ? (
        <div>
          <table className="controlTable">
            <thead>
              <tr>
                <th>NPC Name</th>
                <th>Relationship Type</th>
              </tr>
            </thead>
            <tbody>
              {relationships
                .slice()
                .sort((a, b) => {
                  const nameA = a.person.name ?? "";
                  const nameB = b.person.name ?? "";
                  return nameA.localeCompare(nameB);
                })
                .map((relationship) => {
                  if (relationship.relationshipType?.length > 0) {
                    return (
                      <tr
                        key={generate_uuidv4()}
                        onClick={() => {
                          setChildElement(
                            <NpcPanel
                              npc={relationship.person}
                              factions={props.allFactions ?? []}
                              locations={props.allLocations ?? []}
                              npcs={props.allNpcs ?? []}
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
                        <td>{relationship.person.name}</td>
                        <td>{relationship.relationshipType}</td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })}
            </tbody>
          </table>
        </div>
      ) : null}
      {props.disabled ? null : (
        <PrimaryButton
          text={"Manage relationships"}
          onClick={() => setPanelOpen(true)}
        />
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
          onRenderFooterContent={() => (
            <PrimaryButton
              text="Save"
              onClick={() => {
                if (props.onSave) {
                  props.onSave(relationships);
                }
                setPanelOpen(false);
              }}
              style={{ marginTop: 16 }}
            />
          )}
        >
          <div>
            <h2>Manage Relationships</h2>
            <p>
              Add or edit relationships between NPCs. You can specify the type
              of relationship (e.g., friend, enemy, ally) for each NPC.
              Relationships won't appear unless they have a type specified.
            </p>
            {relationships.map((relationship, idx) => (
              <div
                key={relationship.person.id + idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <span style={{ flex: 1 }}>{relationship.person.name}</span>
                <input
                  type="text"
                  value={relationship.relationshipType}
                  onChange={(e) => {
                    const updated = [...relationships];
                    updated[idx] = {
                      ...relationship,
                      relationshipType: e.target.value,
                    };
                    setRelationships(updated);
                  }}
                  placeholder="Relationship type"
                  style={{ marginRight: 8 }}
                />

                <button
                  onClick={() => {
                    setRelationships(relationships.filter((_, i) => i !== idx));
                  }}
                  aria-label="Delete relationship"
                >
                  Delete
                </button>
              </div>
            ))}

            <div
              style={{ display: "flex", alignItems: "center", marginTop: 16 }}
            >
              <select
                style={{ flex: 1, marginRight: 8 }}
                defaultValue=""
                onChange={(e) => {
                  const npcId = e.target.value;
                  if (!npcId) return;
                  const npc = props.allNpcs?.find((n) => n.id === npcId);
                  if (npc) {
                    setRelationships([
                      ...relationships,
                      { person: npc, relationshipType: "" },
                    ]);
                  }
                  e.target.value = "";
                }}
              >
                <option value="" disabled>
                  Add NPC...
                </option>
                {props.allNpcs
                  ?.sort((a, b) => {
                    const nameA = a.name ?? "";
                    const nameB = b.name ?? "";
                    return nameA.localeCompare(nameB);
                  })
                  ?.map((npc) => (
                    <option key={npc.id} value={npc.id}>
                      {npc.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </Panel>
      )}
      {childElement}
    </div>
  );
};
export default RelationshipControl;
