import React, { useState } from "react";
import mapData from "./data/map.json";
import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as d3 from "d3";
import mainData from "./data/data_mgnregs_odisha_2019-20_pc_expenditure.csv";
import "./App.css";

const mData = [];
d3.csv(mainData, function (mainData) {
  mData.push(mainData);
  // console.log(mainData);
});

function App() {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);

  const geojsonStyle = {
    fillColor: "#0a443cfc",
  };

  const onEachRegion = (region, layer) => {
    const regionName = region.properties.pc_name;
    // console.log();
    layer.bindTooltip(regionName, {permanent:true, className:"tooltip"});
    // layer.bindTooltip(regionName);
    layer.on("click", function (e) {
      mData.map(
        (item) =>
          item["Parliamentary Constituency"] === regionName ||
          item["Parliamentary Constituency"] === regionName + " (ST)" ||
          item["Parliamentary Constituency"] === regionName + " (SC)"
            ? //  item.OpeningBalance
              // console.log( item["Total Fund Available"], item["Parliamentary Constituency"])
              setData(item)
            : null
        // console.log( "No Match", item["ParliamentaryConstituency"])
      );
      setFlag(true);
    });

    layer.on("mouseover", function (e) {
      e.target.setStyle({
        fillColor: "yellow",
        fillOpacity: "0.9",
      });
    });
    layer.on("mouseout", function (e) {
      e.target.setStyle({
        fillOpacity: "0.2",
        fillColor: "#0a443cfc",
      });
    });
  };

  return (
    <div className="App">
      <div className="header">
        <h1 className="Title" style={{ textAlign: "center" }}>
          Expenditures for MGNREGS in parliamentary constituencies of Odisha
          (2019-20)
        </h1>
      </div>
      
      <div className="container">
        <MapContainer
          className="Map"
          bounds={[
            [24.407138, 79.085561],
            [16.804541, 88.889092],
          ]}
          zoom={7}
          center={[20, 85]}
          minZoom={7}
          maxZoom={8}
          
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON
            // pane={mapData.features.properties.pc_name}
            style={geojsonStyle}
            data={mapData.features}
            onEachFeature={onEachRegion}
          />
        </MapContainer>

        <div className="dataPane">
          {flag ? (
            <div>
              <table>
              <thead>
                <th colSpan="2">
                  <h3>Parliamentary Constituency</h3>
                  <h2> {data["Parliamentary Constituency"]}</h2>
                  </th>
              </thead>
                <tbody>
                  <tr>
                    <td>Opening Balance</td>
                    <td>{data["Opening Balance"].split("â¹")}<span> Rs</span></td>
                  </tr>
                  <tr>
                    <td>Total Fund Available</td>
                    <td>{data["Total Fund Available"].split("â¹")}<span> Rs</span></td>
                  </tr>
                  <tr>
                    <td>Total Expenditure on Wages</td>
                    <td>{data["Total Expenditure on Wages"].split("â¹")}<span> Rs</span></td>
                  </tr>
                  <tr>
                    <td>Total Expenditure on Materials</td>
                    <td>
                      {data["Total Expenditure on Materials"].split("â¹")}<span> Rs</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Grand Total Expenditure</td>
                    <td>{data["Grand Total Expenditure"].split("â¹")}<span> Rs</span></td>
                  </tr>
                  <tr>
                    <td>Total Unspent Balance</td>
                    <td>{data["Total Unspent Balance"].split("â¹")}<span> Rs</span></td>
                  </tr>
                  <tr>
                    <td>Total Payment Due</td>
                    <td>{data["Total Payment Due"].split("â¹")}<span> Rs</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <h4 style={{ padding: '20px', fontSize:' 20px', marginTop: "100px"}}>
                Click on any Region to check the details
              </h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
