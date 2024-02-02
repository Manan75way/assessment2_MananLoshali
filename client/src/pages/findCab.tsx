import { useEffect, useState } from "react";
import Input from "../components/Input";
import Maps from "../components/Maps";
import {
  useFindAllCabsMutation,
  useRequestRideMutation,
} from "../services/api";

const FindCab = () => {
  const [position, setPosition] = useState<[number, number] | null>(); // current Location

  const [start, setStart] = useState(""); //customer start location
  const [end, setEnd] = useState(""); //customer end location

  const [cab, setCab] = useState<Array<any>>([]);

  const [destinationCoordinates, setDestinationCoordinates] = useState([
    30.7099655, 76.6899143,
  ]);
  const [startCoordinates, setStartCoordinates] = useState([
    30.7099655, 76.6899143,
  ]);
  const [show, setShow] = useState(false);

  const [findAllVehicle] = useFindAllCabsMutation();
  const [requestRide] = useRequestRideMutation();

  let lat: any, long: any;

  const getLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (geoLocation) => {
        const { latitude, longitude } = geoLocation.coords;
        setPosition([latitude, longitude]);
        const startvalue = `${latitude} - ${longitude}`;
        setStart(startvalue);
      });
    } else {
      alert("Geolocation is not supported in your browser");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getAllCabs = async () => {
    lat = position?.[0];
    long = position?.[1];
    const payload = await findAllVehicle({ lat, long }).unwrap();
    console.log("fulfilled", payload);
    setShow(true);
    setCab(payload.cabs);
    console.log(cab);
  };

  const searchRide = async (e: any) => {
    e.preventDefault();
    console.log(start, end);
    const payload = await requestRide({
      startCoordinates,
      destinationCoordinates,
      lat,
      long,
      start,
      end,
    }).unwrap();

    console.log("fulfilled", payload);
  };

  const getStartLocation = (startCoordinates: any) => {
    // setStart(startCoordinates);
  };

  const getEndLocation = (endCoordinates: any) => {
    setEnd(endCoordinates);
  };

  return (
    <div className="w-screen h-screen flex p-6">
      <div className=" border-2 border-black w-[30%] h-[40%]">
        <h1 className="font-semibold text-xl text-lime-600 text-center">
          Enter The Location
        </h1>
        <form
          className="w-full h-full flex flex-col gap-4 p-4"
          onSubmit={(e) => searchRide(e)}
        >
          <Input
            types="source"
            positions={position}
            childFunction={getStartLocation}
          />
          <Input
            types="destination"
            positions={position}
            childFunction={getEndLocation}
          />
          <button
            className="border-2 bg-slate-600 font-semibold text-base rounded-lg py-1 cursor-pointer"
            type="submit"
          >
            Request Ride
          </button>
        </form>
        <div className="flex flex-col">
          <button
            className="w-20 cursor-pointer h-14 rounded-md text-lg text-green-500 mt-4 ml-9 bg-yellow-200 border-red-500 border"
            onClick={getAllCabs}
          >
            Find Vehicles
          </button>

          {show && (
            <div>
              {cab.length === 0 ? (
                <div>
                  <p className="text-red-400 text-xl">
                    No vehicles found currently.
                  </p>
                  <p className="text-red-400 text-lg"> Try again later</p>
                </div>
              ) : (
                <div>
                  {cab?.map((item) => (
                    <div key={item.username}>{item.username}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="w-[70%]">
        <Maps positions={position} />
      </div>
    </div>
  );
};

export default FindCab;
