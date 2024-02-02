import React, { FormEvent, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import {
  useSetVehicleStatusMutation,
  useFindNearRidesQuery,
  useFindAllNearRidesMutation,
} from "../services/api";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

const VehicleStatus = () => {
  const [isAvailable, setIsAvailable] = useState<String>();
  const [show, setShow] = useState<Boolean>(false);

  const [showRides, setShowRides] = useState(false);

  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  const [setVehicleStatus] = useSetVehicleStatusMutation();

  const [findNearRides] = useFindAllNearRidesMutation();

  // const { isLoading, isError, isSuccess, data, error } =
  //   useFindNearRidesQuery("");

  // console.log(isLoading, isError, isSuccess, data?.rides, error);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(isAvailable);
    const coordinates = [long, lat];

    try {
      console.log(coordinates);

      const payload = await setVehicleStatus({
        isAvailable,
        coordinates,
      }).unwrap();
      console.log("fulfilled", payload);

      setShow(true);
      //   if (payload.updateVehcile.isAvailable === "true") {
      //     console.log(payload.updateVehcile.isAvailable);
      //     setShow(true);
      //     console.log(show);
      //   }
    } catch (error) {
      console.error("rejected", error);
    }
  };

  function getLocation(position: any) {
    console.log(position.coords.latitude);
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  }

  function failedToGetLocation() {
    console.log("Fetching Location failed");
  }

  const getUserLocation = async () => {
    const location = navigator.geolocation.getCurrentPosition(
      getLocation,
      failedToGetLocation
    );
  };

  useEffect(() => {
    getUserLocation();
  }, [isAvailable]);

  const getRides = async () => {
    const payload = await findNearRides({isAvailable}).unwrap()
    console.log(payload);
    
    setShowRides(true);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center gap-5">
      <div className="w-[30%] h-[200px] ml-3">
        <form
          className="w-[90%] h-full border rounded-lg border-cyan-950 flex flex-col gap-2 px-3 py-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <p className="text-orange-500 font-bold text-xl">
            Please select your Vehicle Status:
          </p>
          <div className=" w-[50%] flex justify-around">
            <input
              className="w-[10%] border-blue-300 border-b-teal-400 "
              type="radio"
              id="active"
              name="status"
              value="true"
              onChange={(e) => setIsAvailable(e.target.value)}
            />
            <label
              className=" text-orange-500 font-semibold text-lg"
              htmlFor="active"
            >
              Active
            </label>
          </div>

          <div className=" w-[50%] flex justify-around">
            <input
              className="w-[10%] border-blue-300 border-b-teal-400 "
              type="radio"
              id="active"
              name="status"
              value="false"
              onChange={(e) => setIsAvailable(e.target.value)}
            />
            <label
              className=" text-orange-500 font-semibold text-lg"
              htmlFor="inactive"
            >
              Inactive
            </label>
          </div>
          <button
            className="w-20 cursor-pointer h-14 rounded-md text-lg text-green-500 border-red-500 border"
            type="submit"
          >
            Submit
          </button>
        </form>
        {show && (
          <>
            <button
              className="w-20 cursor-pointer h-14 rounded-md text-lg text-green-500 mt-4 ml-9 bg-yellow-200 border-red-500 border"
              onClick={getRides}
            >
              Find Ride
            </button>
          </>
        )}

        {showRides && (
          // <div>
          //   {data?.rides.map((item: any) => (
          //     <div className="border-2 border-black p-3">
          //       <p>Start Point: {item.startPoint.coordinates}</p>
          //       <p>Ending Point: {item.endingPoint.coordinates}</p>
          //       <button className="cursor-pointer h-10 rounded-md text-lg text-green-500 mt-4 ml-9 bg-yellow-200 border-red-500 border">
          //         Accept Ride
          //       </button>
          //     </div>
          //   ))}
          // </div>
          <div></div>
        )}
      </div>
      {show && (
        <div className="w-[70%] h-[500px]">
          <MapContainer
            center={[30.704649, 76.717873]}
            zoom={13}
            style={{ width: "100%", height: "500px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <Marker
              position={[lat, long]}
              icon={L.icon({ iconUrl: "/start.png" })}
            />
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default VehicleStatus;
