import React from "react";
import { Location } from "../../../models/Location";
import { Panel, PanelType, PrimaryButton } from "@fluentui/react";
import "../../../genericStyles/GenericStyles.css";

export interface ILocationControlProps {
  defaultValue?: Location[];
  allLocations?: Location[];
  onSave?: (locations: Location[]) => void;
}

const LocationControl: React.FunctionComponent<ILocationControlProps> = (
  props
) => {
  const [locations, setLocations] = React.useState<Location[]>(
    props.defaultValue || []
  );
  const [panelOpen, setPanelOpen] = React.useState<boolean>(false);
  return (
    <div className="location-control">
      <h3 className="formTitle">Locations</h3>
      <PrimaryButton
        text={"Manage locations"}
        onClick={() => setPanelOpen(true)}
      />
      {props.defaultValue && props.defaultValue.length > 0 ? (
        <table className="location-table controlTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {props.defaultValue.map((location) => (
              <tr key={location.id}>
                <td>{location.name}</td>
                <td>{location.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No locations selected.</div>
      )}
      {panelOpen && (
        <Panel
          isOpen={panelOpen}
          onDismiss={() => {
            setLocations(props.defaultValue || []);
            setPanelOpen(false);
          }}
          isLightDismiss={true}
          isBlocking={true}
          type={PanelType.smallFixedFar}
        >
          <div>
            <h3>Select a Location</h3>
            {props.allLocations && props.allLocations.length > 0 ? (
              <div>
                <form>
                  {props.allLocations.map((location) => (
                    <div key={location.id} style={{ marginBottom: 8 }}>
                      <label>
                        <input
                          type="checkbox"
                          name="location"
                          value={location.id}
                          checked={locations.some((l) => l.id === location.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setLocations([...locations, location]);
                            } else {
                              setLocations(
                                locations.filter((l) => l.id !== location.id)
                              );
                            }
                          }}
                        />
                        {location.name}
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
                          'input[name="location"]:checked'
                        )
                      ).map((el) => (el as HTMLInputElement).value);
                      const selectedLocations = props.allLocations?.filter(
                        (location) => checked.includes(location.id)
                      );
                      setLocations(selectedLocations || []);
                    }
                    if (props.onSave) {
                      props.onSave(locations);
                    }
                    setPanelOpen(false);
                  }}
                  style={{ marginTop: 16 }}
                />
              </div>
            ) : (
              <div>No locations available.</div>
            )}
          </div>
        </Panel>
      )}
    </div>
  );
};
export default LocationControl;
