import React from "react";
import { Location } from "../../../models/Location";
import { Panel, PanelType, PrimaryButton } from "@fluentui/react";
import { Npc } from "../../../models/Npc";

export interface ILocationControlProps {
  npc?: Npc;
  allLocations?: Location[];
  onSave?: (location: Location) => void;
}

const LocationControl: React.FunctionComponent<ILocationControlProps> = (
  props
) => {
  const [selectedLocation, setSelectedLocation] = React.useState<
    Location | undefined
  >(props.npc?.location);

  const [panelOpen, setPanelOpen] = React.useState<boolean>(false);
  return (
    <div className="location-control">
      <h2>Locations</h2>
      <PrimaryButton
        text={"Manage locations"}
        onClick={() => setPanelOpen(true)}
      />
      {selectedLocation ? (
        <table className="location-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr key={selectedLocation.id}>
              <td>{selectedLocation.name}</td>
              <td>{selectedLocation.description}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div>No location selected.</div>
      )}
      {panelOpen && (
        <Panel
          isOpen={panelOpen}
          onDismiss={() => {
            setSelectedLocation(props.npc?.location);
            setPanelOpen(false);
          }}
          isLightDismiss={true}
          isBlocking={true}
          type={PanelType.smallFixedFar}
        >
          {props.allLocations && props.allLocations.length > 0 ? (
            <div>
              <h3>Select a location</h3>
              <form>
                {props.allLocations.map((location) => (
                  <div key={location.id}>
                    <label>
                      <input
                        type="radio"
                        name="location"
                        value={location.id}
                        checked={selectedLocation?.id === location.id}
                        onChange={() => setSelectedLocation(location)}
                      />
                      {location.name}
                    </label>
                  </div>
                ))}
              </form>
              <PrimaryButton
                text="Save"
                onClick={() => {
                  if (props.onSave && selectedLocation) {
                    props.onSave(selectedLocation);
                  }
                  setPanelOpen(false);
                }}
                style={{ marginTop: 16 }}
              />
            </div>
          ) : (
            <div>No locations available.</div>
          )}
        </Panel>
      )}
    </div>
  );
};
export default LocationControl;
