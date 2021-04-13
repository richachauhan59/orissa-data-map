import React, { useEffect } from "react";
// import Map from './Map';
import mapData from "./data/map.json";
import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import './App.css'

function App() {
  useEffect(() => {
    console.log(mapData);
  }, [true]);

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>
        Expenditures for MGNREGS in parliamentary constituencies of Odisha
        (2019-20)
      </h1>
      <MapContainer style={{ height: "85vh"}} zoom={7} center={[20, 85]}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON className="geojson" data={mapData.features} pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: '0.4', interactive: 'true' }}  />
      </MapContainer>
    </div>
  );
}

export default App;
