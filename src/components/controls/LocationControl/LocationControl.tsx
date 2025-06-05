import React from "react";
import { Location } from "../../../models/Location";
import { Panel, PanelType, PrimaryButton } from "@fluentui/react";
import "../../../genericStyles/GenericStyles.css";
import LocationPanel from "../../Locations/LocationPanel/LocationPanel";
import { Faction } from "../../../models/Faction";
import { Npc } from "../../../models/Npc";

export interface ILocationControlProps {
  defaultValue?: Location[];
  allNpcs?: Npc[];
  allFactions?: Faction[];
  allLocations?: Location[];
  disabled?: boolean;
  onSave?: (locations: Location[]) => void;
}

const LocationControl: React.FunctionComponent<ILocationControlProps> = (
  props
) => {
  const [locations, setLocations] = React.useState<Location[]>(
    props.defaultValue || []
  );
  const [childElement, setChildElement] = React.useState<JSX.Element>();

  React.useEffect(() => {
    if (props.defaultValue && props.allLocations) {
      const selectedLocations = props.defaultValue.map((location) => {
        return (
          props.allLocations?.find((loc) => loc.id === location.id) || location
        );
      });
      setLocations(selectedLocations);
    }
  }, [props.defaultValue, props.allLocations]);

  const [panelOpen, setPanelOpen] = React.useState<boolean>(false);
  return (
    <div className="location-control">
      <h3 className="formTitle">Locations</h3>
      {locations && locations.length > 0 ? (
        <table className="location-table controlTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr
                key={location.id}
                style={{ cursor: "pointer" }}
                onDoubleClick={() => {
                  setChildElement(
                    <LocationPanel
                      location={location}
                      factions={props.allFactions ?? []}
                      locations={props.allLocations ?? []}
                      npcs={props.allNpcs ?? []}
                      disabled={true}
                      isOpen={true}
                      onDismiss={() => {
                        setChildElement(undefined);
                      }}
                      saveLocation={undefined}
                      deleteLocation={undefined}
                    />
                  );
                }}
              >
                <td>{location.name}</td>
                <td>{location.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      {props.disabled ? null : (
        <PrimaryButton
          text={"Manage locations"}
          onClick={() => setPanelOpen(true)}
        />
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
                  {props.allLocations
                    ?.sort((a, b) => {
                      const nameA = a.name ?? "";
                      const nameB = b.name ?? "";
                      return nameA.localeCompare(nameB);
                    })
                    .map((location) => (
                      <div key={location.id} style={{ marginBottom: 8 }}>
                        <label>
                          <input
                            type="checkbox"
                            name="location"
                            value={location.id}
                            checked={locations.some(
                              (l) => l.id === location.id
                            )}
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
            ) : null}
          </div>
        </Panel>
      )}
      {childElement}
    </div>
  );
};
export default LocationControl;
