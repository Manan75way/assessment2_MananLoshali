import React, { useEffect } from "react";

const FindCab = () => {
    
  function getLocation(position: any) {
    console.log(position);
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
  }, []);

  return <div>finding cabs</div>;
};

export default FindCab;
