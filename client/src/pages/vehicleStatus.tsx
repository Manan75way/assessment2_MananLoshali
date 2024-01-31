import React, { FormEvent, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useSetVehicleStatusMutation } from "../services/api";

const VehicleStatus = () => {
  const [isAvailable, setIsAvailable] = useState<String>();
  const [show, setShow] = useState<Boolean>(false);

  const[lat,setLat] = useState();
  const[long,setLong] = useState();


  const [setVehicleStatus] = useSetVehicleStatusMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(isAvailable);
    try {
      const payload = await setVehicleStatus(isAvailable).unwrap();
      console.log("fulfilled", payload);
      setShow(true)
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
    setLong(position.coords.latitude);
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

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-5">
      <form
        className="w-[30%] h-[30%] border rounded-lg border-cyan-950 flex flex-col gap-7 px-10 py-8"
        onSubmit={(e) => handleSubmit(e)}
      >
        <p className="text-orange-500 font-bold text-2xl">
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
      
      {show && <>
      
      <p>Latitude {lat}</p>
      <p>Longitude {long}</p>

      </>}
    

      {/* <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer> */}
    </div>
  );
};

export default VehicleStatus;
