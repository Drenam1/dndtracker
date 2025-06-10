import React from "react";
import { Clock } from "../../models/Clock";
import { Panel, PanelType, PrimaryButton } from "@fluentui/react";
import { drawPieChart } from "../../helpers/ClockHelper";
import "./ClockOverviewClockControl.css";
import "../../genericStyles/GenericStyles.css";
import { generate_uuidv4 } from "../../helpers/RollHelper";

export interface IClockOverviewClockControlProps {
  label?: string;
  defaultValue?: Clock[];
  disabled?: boolean;
  onSave?: (clocks: Clock[]) => void;
}

const ClockOverviewClockControl: React.FunctionComponent<
  IClockOverviewClockControlProps
> = (props) => {
  const [panelOpen, setPanelOpen] = React.useState<boolean>(false);
  const [clocks, setClocks] = React.useState<Clock[]>(props.defaultValue || []);
  React.useEffect(() => {
    setClocks(props.defaultValue || []);
  }, [props.defaultValue]);
  console.log(clocks);
  return (
    <div className="clock-control">
      <h3 className="formTitle">{props.label || "Clocks"}</h3>
      {props.disabled ? null : (
        <PrimaryButton
          text={"Manage clocks"}
          onClick={() => setPanelOpen(true)}
        />
      )}

      {clocks && clocks.length > 0 ? (
        <div className="clocksContainer">
          <table className="clockTable">
            <thead>
              <tr>
                <th>Entity</th>
                <th>Description</th>
                <th>Clock</th>
              </tr>
            </thead>
            <tbody>
              {clocks.map((clock) => {
                if (clock.name?.length > 0) {
                  const pieChart = drawPieChart(clock);
                  return (
                    <tr key={clock.name}>
                      <td className="entity" title={clock.itemName ?? ""}>
                        {clock.itemName ?? ""}
                      </td>
                      <td className="title" title={clock.description}>
                        {clock.name}
                      </td>
                      <td
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
                      </td>
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
      {panelOpen && (
        <Panel
          isOpen={panelOpen}
          onDismiss={() => {
            setPanelOpen(false);
          }}
          isLightDismiss={true}
          isBlocking={true}
          type={PanelType.medium}
          onRenderFooterContent={() => (
            <PrimaryButton
              text="Save"
              onClick={() => {
                if (props.onSave) {
                  props.onSave(clocks);
                }
                setPanelOpen(false);
              }}
              style={{ marginTop: 16 }}
            />
          )}
        >
          <div>
            <h2>Manage Clocks</h2>
            <p>
              Clocks are used to track goals, threats, or other time-based
              elements in your game. You can create and manage multiple clocks
              here. Clocks wont appear on the tracker unless they have a name.
            </p>
            {clocks.map((clock, idx) => (
              <div key={clock.id} className="clockEditRow">
                <input
                  type="text"
                  value={clock.name}
                  placeholder="Clock name"
                  onChange={(e) => {
                    const updated = [...clocks];
                    updated[idx] = { ...clock, name: e.target.value };
                    setClocks(updated);
                  }}
                  style={{ width: "25%", marginRight: 8 }}
                />
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={clock.totalSegments}
                  onChange={(e) => {
                    const updated = [...clocks];
                    updated[idx] = {
                      ...clock,
                      totalSegments: Math.min(Number(e.target.value), 20),
                    };
                    setClocks(updated);
                  }}
                  style={{ width: "5%", marginRight: 8 }}
                />
                <input
                  type="number"
                  min={0}
                  max={clock.totalSegments - 1}
                  value={clock.filledSegments}
                  onChange={(e) => {
                    const updated = [...clocks];
                    updated[idx] = {
                      ...clock,
                      filledSegments: Math.min(
                        Number(e.target.value),
                        clock.totalSegments - 1
                      ),
                    };
                    setClocks(updated);
                  }}
                  style={{ width: "5%", marginRight: 8 }}
                />
                <input
                  type="text"
                  value={clock.description || ""}
                  placeholder="Description"
                  onChange={(e) => {
                    const updated = [...clocks];
                    updated[idx] = { ...clock, description: e.target.value };
                    setClocks(updated);
                  }}
                  style={{ marginRight: 8, width: "calc(50% - 30px)" }}
                />
                <button
                  onClick={() => {
                    const updated = clocks.filter((_, i) => i !== idx);
                    setClocks(updated);
                  }}
                  aria-label="Delete clock"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </Panel>
      )}
    </div>
  );
};
export default ClockOverviewClockControl;
