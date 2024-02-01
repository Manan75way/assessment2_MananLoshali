import { useEffect, useState } from "react";
import Input from "../components/Input";
import Maps from "../components/Maps";

const FindCab = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((geoLocation) => {
        const { latitude, longitude } = geoLocation.coords;
        setPosition([latitude, longitude]);
        console.log(position);
        console.log(latitude, longitude);
      });
    } else {
      alert("Geolocation is not supported in your browser");
    }
  }, []);

  const searchRide = () => {
    
  };

  return (
    <div className="w-screen h-screen flex p-6">
      <div className=" border-2 border-black w-[30%] h-[40%]">
        <h1 className="font-semibold text-xl text-lime-600 text-center">
          Enter The Location
        </h1>
        <div className="w-full h-full flex flex-col gap-4 p-4 ">
          <Input types="source" location={position} />
          <Input types="destination" location={position} />
          <button
            className="border-2 bg-slate-600 font-semibold text-base rounded-lg py-1 cursor-pointer"
            onClick={searchRide}
          >
            Search Ride
          </button>
        </div>
      </div>
      <div className="w-[70%]">
        <Maps positions={position} />
      </div>
    </div>
  );
};

export default FindCab;
