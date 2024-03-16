import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Kepler Mission", "Count"],
  ["Confirmed Planets Discovered by Kepler", 2779],
  ["Candidates and Confirmed in Habitable Zone", 361],
  ["Kepler Project Candidates", 4717],
  ["Kepler Project Candidates Yet To Be Confirmed", 1983],
  // CSS-style declaration
];

export const options = {
  title: "Kepler Mission Counts",
  pieHole: 0.4,
  is3D: false,
};

export function Piechart() {
  return (
    <Chart
    
      chartType="PieChart"
      width="500px"
      height="400px"
      data={data}
      options={options}
      backgroundColor="blue"
    />
  );
}
