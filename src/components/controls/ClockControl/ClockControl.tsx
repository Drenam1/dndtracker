import React from "react";
import { Clock } from "../../../models/Clock";
import { Panel, PanelType, PrimaryButton } from "@fluentui/react";
import { drawPieChart } from "../../../helpers/ClockHelper";
import "./ClockControl.css";

export interface IClockControlProps {
  defaultValue?: Clock[];
  onSave?: (clocks: Clock[]) => void;
}

const ClockControl: React.FunctionComponent<IClockControlProps> = (props) => {
  const [panelOpen, setPanelOpen] = React.useState<boolean>(false);
  return (
    <div className="clock-control">
      <h3>Clocks</h3>
      <PrimaryButton
        text={"Manage clocks"}
        onClick={() => setPanelOpen(true)}
      />
      {props.defaultValue && props.defaultValue.length > 0 ? (
        <>
          {props.defaultValue.map((clock) => {
            const pieChart = drawPieChart(clock);
            console.log(pieChart);
            return (
              <div className="container" key={clock.name}>
                <div title={clock.description}>{clock.name}</div>
                <div
                  className="clockSegment"
                  title={`${clock.filledSegments}/${clock.totalSegments}`}
                  data-clock={clock.name}
                >
                  <svg
                    height="25"
                    width="25"
                    viewBox="-1 -1 2 2"
                    className="clockSvg"
                  >
                    {pieChart.map((slice: any) => (
                      <path
                        d={slice.d}
                        fill={slice.fill}
                        strokeWidth={1}
                        key={slice.key}
                      />
                    ))}
                  </svg>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div>No clocks.</div>
      )}
      {panelOpen && (
        <Panel
          isOpen={panelOpen}
          onDismiss={() => {
            setPanelOpen(false);
          }}
          isLightDismiss={true}
          isBlocking={true}
          type={PanelType.smallFixedFar}
        >
          <div></div>
        </Panel>
      )}
    </div>
  );
};
export default ClockControl;
