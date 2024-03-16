import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["K2 Mision", "Count"],
  ["Confirmed Planets", 548],
  ["K2 Candidates Yet To Be Confirmed", 977],
 
  // CSS-style declaration
];

export const options = {
  title: "k2 exoplanet Counts",
  pieHole: 0.4,
  is3D: false,
};

export function Piechart1() {
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
