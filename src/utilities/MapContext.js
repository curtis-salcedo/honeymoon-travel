import { createContext, useEffect, useState } from "react";

export const MapContext = createContext();

export const MapProvider = (props) => {
  const [address, setAddress] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log('addresscontext', address)
  }, [address]);
  
  const fetchData = async () => {

  };

  console.log('addresscontext', address)

  return (
    <MapContext.Provider
      value={{
        address: address,
        setAddress: setAddress,
      }}
    >
      {props.children}
    </MapContext.Provider>
  );
};
