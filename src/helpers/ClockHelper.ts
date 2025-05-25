import { Clock } from "../models/Clock";

export function drawPieChart(clock: Clock): any {
  let slices = [];

  //option 1  Equal size pieces
  for (var i = 0; i < clock.totalSegments; i++) {
    slices.push({
      percent: 1 / clock.totalSegments,
      color:
        clock.totalSegments === clock.filledSegments
          ? "green"
          : i < clock.filledSegments
          ? "black"
          : "#6f6f6f",
    });
  }

  let cumulativePercent = 0;

  function getCoordinatesForPercent(percent: number) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }

  let arr = [];
  arr = slices.map((slice) => {
    const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
    cumulativePercent += slice.percent;
    const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
    const largeArcFlag = slice.percent > 0.5 ? 1 : 0;
    const pathData = [
      `M ${startX} ${startY}`, // Move
      `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
      "L 0 0", // Line
    ].join(" ");
    return {
      d: pathData,
      fill: slice.color,
      strokeWidth: 1,
      key: pathData,
    };
  });
  return arr;
}
