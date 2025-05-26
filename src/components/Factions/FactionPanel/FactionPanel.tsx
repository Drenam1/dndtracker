import React from "react";
import "./FactionPanel.css";
import {
  Panel,
  PanelType,
  PrimaryButton,
  DefaultButton,
  Slider,
  TextField,
} from "@fluentui/react";
import { generate_uuidv4 } from "../../../helpers/RollHelper";
import { Faction } from "../../../models/Faction";
import { Location } from "../../../models/Location";
import LocationControl from "../../controls/LocationControl/LocationControl";
import ClockControl from "../../controls/ClockControl/ClockControl";

export interface IFactionPanelProps {
  faction?: Faction;
  locations: Location[];
  isOpen: boolean;
  onDismiss?: any;
  saveFaction?: (faction: Faction) => void;
  deleteFaction?: (faction: Faction) => void;
}

const FactionPanel: React.FunctionComponent<IFactionPanelProps> = (props) => {
  const [currentFaction, setCurrentFaction] = React.useState<
    Faction | undefined
  >(
    props.faction || {
      id: generate_uuidv4(),
      name: "",
      description: "",
      locations: [],
      tier: 0,
      ideaology: "",
      members: [],
      clocks: [],
    }
  );

  React.useEffect(() => {
    if (props.faction) {
      setCurrentFaction(props.faction);
    }
  }, [props.faction]);

  return (
    <Panel
      isOpen={props.isOpen}
      onDismiss={() => {
        setCurrentFaction(undefined);
        props.onDismiss();
      }}
      isLightDismiss={true}
      isBlocking={true}
      type={PanelType.medium}
      onRenderFooterContent={() => (
        <div className="panelFooter">
          <PrimaryButton
            text="Save"
            onClick={() => {
              if (props.saveFaction && currentFaction) {
                props.saveFaction(currentFaction);
                props.onDismiss();
              }
            }}
          />
          {props.faction && (
            <DefaultButton
              text="Delete"
              onClick={() => {
                if (props.deleteFaction && props.faction) {
                  props.deleteFaction(props.faction);
                  props.onDismiss();
                }
              }}
            />
          )}
        </div>
      )}
    >
      <div className="control">
        <TextField
          label="Name"
          defaultValue={props.faction?.name}
          onChange={(event, newValue) => {
            if (currentFaction) {
              const updatedFaction = {
                ...currentFaction,
                name: newValue,
              };
              setCurrentFaction(updatedFaction);
            } else {
              setCurrentFaction({
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
          defaultValue={props.faction?.description}
          onChange={(event, newValue) => {
            if (currentFaction) {
              const updatedFaction = {
                ...currentFaction,
                description: newValue,
              };
              setCurrentFaction(updatedFaction);
            } else {
              setCurrentFaction({
                id: "",
                description: newValue,
              });
            }
          }}
        />
        <Slider
          label="Tier"
          defaultValue={props.faction?.tier}
          min={1}
          max={5}
          step={1}
          showValue={true}
          onChange={(newValue) => {
            if (currentFaction) {
              const updatedFaction = {
                ...currentFaction,
                tier: newValue,
              };
              setCurrentFaction(updatedFaction);
            } else {
              setCurrentFaction({
                id: "",
                tier: newValue,
              });
            }
          }}
        />
        <TextField
          label="Ideaology"
          multiline
          rows={2}
          defaultValue={props.faction?.ideaology}
          onChange={(event, newValue) => {
            if (currentFaction) {
              const updatedFaction = {
                ...currentFaction,
                ideaology: newValue,
              };
              setCurrentFaction(updatedFaction);
            } else {
              setCurrentFaction({
                id: "",
                ideaology: newValue,
              });
            }
          }}
        />
        <ClockControl
          defaultValue={props.faction?.clocks}
          onSave={(clocks) => {
            if (currentFaction) {
              const updatedFaction = {
                ...currentFaction,
                clocks: clocks,
              };
              setCurrentFaction(updatedFaction);
            } else {
              setCurrentFaction({
                id: generate_uuidv4(),
                clocks: clocks,
              });
            }
          }}
        />
        <h3>Relationships</h3>

        <LocationControl
          defaultValue={currentFaction?.locations}
          allLocations={props.locations}
          onSave={(locations: Location[]) => {
            if (currentFaction) {
              const updatedFaction = {
                ...currentFaction,
                location: locations,
              };
              setCurrentFaction(updatedFaction);
            } else {
              setCurrentFaction({
                id: generate_uuidv4(),
                locations: locations,
              });
            }
          }}
        />
      </div>
      <TextField
        label="Additional Notes"
        multiline
        rows={4}
        defaultValue={props.faction?.additionalNotes}
        onChange={(event, newValue) => {
          if (currentFaction) {
            const updatedFaction = {
              ...currentFaction,
              additionalNotes: newValue,
            };
            setCurrentFaction(updatedFaction);
          } else {
            setCurrentFaction({
              id: "",
              additionalNotes: newValue,
            });
          }
        }}
      />
    </Panel>
  );
};

export default FactionPanel;
