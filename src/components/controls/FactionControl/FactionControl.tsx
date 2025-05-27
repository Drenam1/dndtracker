import React from "react";
import { Faction } from "../../../models/Faction";
import { Location } from "../../../models/Location";
import { Npc } from "../../../models/Npc";
import { Panel, PanelType, PrimaryButton } from "@fluentui/react";
import "../../../genericStyles/GenericStyles.css";
import FactionPanel from "../../Factions/FactionPanel/FactionPanel";

export interface IFactionControlProps {
  defaultValue?: Faction[];
  allNpcs?: Npc[];
  allFactions?: Faction[];
  allLocations?: Location[];
  disabled?: boolean;
  onSave?: (factions: Faction[]) => void;
}

const FactionControl: React.FunctionComponent<IFactionControlProps> = (
  props
) => {
  const [factions, setFactions] = React.useState<Faction[]>(
    props.defaultValue || []
  );
  const [childElement, setChildElement] = React.useState<JSX.Element>();
  const [panelOpen, setPanelOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (props.defaultValue && props.allFactions) {
      const selectedFactions = props.defaultValue.map((faction) => {
        return (
          props.allFactions?.find((fac) => fac.id === faction.id) || faction
        );
      });
      setFactions(selectedFactions);
    }
  }, [props.defaultValue, props.allFactions]);

  return (
    <div className="faction-control">
      <h3 className="formTitle">Factions</h3>
      {factions && factions.length > 0 ? (
        <table className="faction-table controlTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {factions.map((faction) => (
              <tr
                key={faction.id}
                onClick={() => {
                  if (!props.disabled) {
                    setChildElement(
                      <FactionPanel
                        faction={faction}
                        locations={props.allLocations ?? []}
                        factions={props.allFactions ?? []}
                        npcs={props.allNpcs ?? []}
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
              >
                <td>{faction.name}</td>
                <td>{faction.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      {props.disabled ? null : (
        <PrimaryButton
          text={"Manage factions"}
          onClick={() => setPanelOpen(true)}
        />
      )}
      {panelOpen && (
        <Panel
          isOpen={panelOpen}
          onDismiss={() => {
            setFactions(props.defaultValue || []);
            setPanelOpen(false);
          }}
          isLightDismiss={true}
          isBlocking={true}
          type={PanelType.smallFixedFar}
        >
          <div>
            <h3>Select a Faction</h3>
            {props.allFactions && props.allFactions.length > 0 ? (
              <div>
                <form>
                  {props.allFactions
                    ?.sort((a, b) => {
                      const nameA = a.name ?? "";
                      const nameB = b.name ?? "";
                      return nameA.localeCompare(nameB);
                    })
                    .map((faction) => (
                      <div key={faction.id} style={{ marginBottom: 8 }}>
                        <label>
                          <input
                            type="checkbox"
                            name="faction"
                            value={faction.id}
                            checked={factions.some((f) => f.id === faction.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFactions([...factions, faction]);
                              } else {
                                setFactions(
                                  factions.filter((f) => f.id !== faction.id)
                                );
                              }
                            }}
                          />
                          {faction.name}
                        </label>
                      </div>
                    ))}
                </form>
                <PrimaryButton
                  text="Save"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const checked = Array.from(
                        document.querySelectorAll(
                          'input[name="faction"]:checked'
                        )
                      ).map((el) => (el as HTMLInputElement).value);
                      const selectedFactions = props.allFactions?.filter(
                        (faction) => checked.includes(faction.id)
                      );
                      setFactions(selectedFactions || []);
                    }
                    if (props.onSave) {
                      props.onSave(factions);
                    }
                    setPanelOpen(false);
                  }}
                  style={{ marginTop: 16 }}
                />
              </div>
            ) : null}
          </div>
        </Panel>
      )}
      {childElement}
    </div>
  );
};
export default FactionControl;
