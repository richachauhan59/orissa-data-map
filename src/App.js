import React, { useEffect, useState } from "react";
// import Map from './Map';
import mapData from "./data/map.json";
import { MapContainer, GeoJSON, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import * as d3 from "d3";
import mainData from "./data/data_mgnregs_odisha_2019-20_pc_expenditure.csv";
import { tooltip } from "leaflet";
// import { Tooltip } from "leaflet";

const mData = [];
  d3.csv(mainData, function (mainData) {
    mData.push(mainData);
    console.log(mainData)

  });

function App() {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);

  

  const geojsonStyle = {
    fillColor: "red",
  };

  const onEachRegion = (region, layer) => {
    const regionName = region.properties.pc_name;
    console.log();
    // layer.bindTooltip(regionName, {permanent:true, sticky:true, className:"tooltip"});
    layer.bindTooltip(regionName)
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
      // console.log(e, regionName, );
      e.target.setStyle({
        color: "green",
        fillOpacity: "0.6",
      });
    });
    layer.on("mouseout", function (e) {
      // console.log(e, regionName, );
      e.target.setStyle({
        color: "blue",
        fillOpacity: "0.2",
      });
    });
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>
        Expenditures for MGNREGS in parliamentary constituencies of Odisha
        (2019-20)
      </h1>
      <div className="Data">
        <div>
          <MapContainer
            style={{
              height: "80vh",
              width: "134vh",
              border: "black solid 2px",
            }}
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
        </div>
        <div className="dataPanel" style={{ float: "right" }}>
          {flag ? (
            <div>
              <table>
                <tr>
                  <td>Parliamentary Constituency</td>
                  <td>{data["Parliamentary Constituency"]}</td>
                </tr>
                <tr>
                  <td>Opening Balance</td>
                  <td>{data["Opening Balance"].split("â¹")}</td>
                </tr>
                <tr>
                  <td>Total Fund Available</td>
                  <td>{data["Total Fund Available"].split("â¹")}</td>
                </tr>
                <tr>
                  <td>Total Expenditure on Wages</td>
                  <td>{data["Total Expenditure on Wages"].split("â¹")}</td>
                </tr>
                <tr>
                  <td>Total Expenditure on Materials</td>
                  <td>{data["Total Expenditure on Materials"].split("â¹")}</td>
                </tr>
                <tr>
                  <td>Grand Total Expenditure</td>
                  <td>{data["Grand Total Expenditure"].split("â¹")}</td>
                </tr>
                <tr>
                  <td>Total Unspent Balance</td>
                  <td>{data["Total Unspent Balance"].split("â¹")}</td>
                </tr>
                <tr>
                  <td>Total Payment Due</td>
                  <td>{data["Total Payment Due"].split("â¹")}</td>
                </tr>
              </table>
            </div>
          ) : 
          <div style={{textAlign:"center"}}>
            <h1>
              Click on any District to check the  Expenditures for MGNREGS in parliamentary constituencies of Odisha
            </h1>
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
