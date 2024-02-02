import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

interface Props {
  // positions: [number, number] | null | undefined;
  positions: [number, number] | undefined;
}

const Maps = (positions: Props) => {
  const location: [number, number] | undefined = positions.positions;
  const [loc, setLoc] = useState<[number, number]>();

  useEffect(() => {
    setLoc(location);
  }, [location]);

  console.log(location);
  // const initial = [location?.[0],location?.[1]];

  const end: [number, number] = [30.7099713, 76.6899101];

  return (
    <div>
      <MapContainer
        center={location}
        zoom={13}
        style={{ width: "100%", height: "500px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {location && (
          <Marker position={location} icon={L.icon({ iconUrl: "/start.png" })} />
        )}

        {end && (
          <Marker position={end} icon={L.icon({ iconUrl: "/end.png" })} />
        )}
      </MapContainer>
    </div>
  );
};

export default Maps;
