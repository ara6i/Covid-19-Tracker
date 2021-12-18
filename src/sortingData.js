import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    color: "#CC1034",
    size : 10000
  },
  recovered: {
    color: "#7dd71d",
    size : 10000
  },
  deaths: {
    color: "#fb4443",
    size :200000
  },
};
console.log(casesTypeColors["recovered"].color);

export const sortData = (data) => {
  let sortedData = [...data];

  return sortedData.sort((a, b) => (b.cases-a.cases));
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (data, casesType) =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      pathOptions={{color: casesTypeColors[casesType].color,
        fillColor: casesTypeColors[casesType].color }}
      fillOpacity={0.4}
      radius={Math.sqrt(country[casesType] * casesTypeColors[casesType].size)}
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
