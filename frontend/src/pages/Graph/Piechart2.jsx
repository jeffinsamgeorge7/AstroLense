import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Confirmed exoplanet", "Count"],
  ["Astrometry", 3],
  ["Imaging", 68],
  ["Radial velocity", 1086],
  ["Transist timing vriation", 29],
  ["Eclipse timing variation", 17],
  ["Microlensing", 210],
  ["Pulsar timing variation", 7], 
  ["Pulsation timing variation", 2], 
  ["Transist", 4163],
  // CSS-style declaration
];

export const options = {
  title: "Confirmed exoplanet Statistics",
  pieHole: 0.4,
  is3D: false,
};

export function Piechart2() {
  return (
    <Chart
    style={{backgroundColor:"blueviolet"}}
      chartType="PieChart"
      width="500px"
      height="400px"
      data={data}
      options={options}
      backgroundColor="blue"
    />
  );
}
