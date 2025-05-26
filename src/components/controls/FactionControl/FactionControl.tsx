import React from "react";
import { Faction } from "../../../models/Faction";
import { Panel, PanelType, PrimaryButton } from "@fluentui/react";
import "../../../genericStyles/GenericStyles.css";

export interface IFactionControlProps {
  defaultValue?: Faction[];
  allFactions?: Faction[];
  onSave?: (factions: Faction[]) => void;
}

const FactionControl: React.FunctionComponent<IFactionControlProps> = (
  props
) => {
  const [factions, setFactions] = React.useState<Faction[]>(
    props.defaultValue || []
  );

  React.useEffect(() => {
    if (props.defaultValue && props.allFactions) {
      const selectedFactions = props.allFactions.filter((faction) =>
        props.defaultValue!.some((df) => df.id === faction.id)
      );
      setFactions(selectedFactions);
    }
  }, [props.defaultValue, props.allFactions]);

  const [panelOpen, setPanelOpen] = React.useState<boolean>(false);
  return (
    <div className="faction-control">
      <h3 className="formTitle">Factions</h3>
      <PrimaryButton
        text={"Manage factions"}
        onClick={() => setPanelOpen(true)}
      />
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
              <tr key={faction.id}>
                <td>{faction.name}</td>
                <td>{faction.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No factions selected.</div>
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
            ) : (
              <div>No factions available.</div>
            )}
          </div>
        </Panel>
      )}
    </div>
  );
};
export default FactionControl;
