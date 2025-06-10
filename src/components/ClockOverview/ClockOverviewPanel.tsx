import React from "react";
import { Panel, PanelType, PrimaryButton } from "@fluentui/react";
import { Faction } from "../../models/Faction";
import { Location } from "../../models/Location";
import { Npc } from "../../models/Npc";
import { Clock } from "../../models/Clock";
import ClockOverviewClockControl from "./ClockOverviewClockControl";

export interface IClockOverviewPanelProps {
  locations: Location[];
  factions: Faction[];
  npcs?: Npc[];
  onDismiss?: any;
  saveClocks?: (clocks: any[]) => void;
}

const ClockOverviewPanel: React.FunctionComponent<IClockOverviewPanelProps> = (
  props
) => {
  const [allClocks, setAllClocks] = React.useState<Clock[]>([]);

  React.useEffect(() => {
    const npcClocks: Clock[] = [];
    props.npcs?.forEach((npc) => {
      if (npc.clocks && Array.isArray(npc.clocks)) {
        npc.clocks.forEach((clock) => {
          npcClocks.push({
            ...clock,
            itemId: npc.id,
            itemName: npc.name ?? "",
            itemType: "npc",
          });
        });
      }
    });
    const factionClocks: Clock[] = [];
    props.factions.forEach((faction) => {
      if (faction.clocks && Array.isArray(faction.clocks)) {
        faction.clocks.forEach((clock) => {
          factionClocks.push({
            ...clock,
            itemId: faction.id,
            itemName: faction.name ?? "",
            itemType: "faction",
          });
        });
      }
    });
    const locationClocks: Clock[] = [];
    props.locations.forEach((location) => {
      if (location.clocks && Array.isArray(location.clocks)) {
        location.clocks.forEach((clock) => {
          locationClocks.push({
            ...clock,
            itemId: location.id,
            itemName: location.name ?? "",
            itemType: "location",
          });
        });
      }
    });
    setAllClocks([...npcClocks, ...factionClocks, ...locationClocks]);
  }, [props.npcs, props.factions, props.locations]);

  return (
    <Panel
      isOpen={true}
      onDismiss={() => {
        props.onDismiss();
      }}
      isLightDismiss={true}
      isBlocking={true}
      type={PanelType.medium}
      styles={{
        navigation: {
          paddingLeft: "24px",
        },
      }}
      onRenderFooterContent={() => (
        <div className="panelFooter">
          <PrimaryButton
            text="Save"
            onClick={() => {
              if (props.saveClocks) {
                props.saveClocks(allClocks);
                props.onDismiss();
              }
            }}
          />
        </div>
      )}
    >
      <ClockOverviewClockControl
        defaultValue={allClocks}
        disabled={false}
        onSave={(clocks) => {
          setAllClocks(clocks);
        }}
      />
    </Panel>
  );
};

export default ClockOverviewPanel;
