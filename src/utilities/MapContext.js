import React, { createContext, useEffect, useState } from "react";

export const MapContext = createContext();

export const MapProvider = (props) => {
  const [address, setAddress] = useState(null);
  const [mapLocation, setMapLocation] = useState(null);

  useEffect(() => {
    console.log('addresscontext', address)
  }, [address]);

  return (
    <MapContext.Provider
      value={{
        address: address,
        setAddress: setAddress,
        mapLocation: mapLocation,
        setMapLocation: setMapLocation,
      }}
    >
      {props.children}
    </MapContext.Provider>
  );
};
