import { createContext, useEffect, useState } from "react";
import { getUser } from "./services/users-service";

import { getTripById } from "./api/trips-api";
import { getAccommodationsForTrip } from "./api/accommodations-api";
import { getActivitiesForTrip } from "./api/activities-api";
import { getMealsForTrip } from "./api/meals-api";
import { getTravelsForTrip } from "./api/travels-api";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [activeTrip, setActiveTrip] = useState(null);
  const [activeMeals, setActiveMeals] = useState([]);
  const [activeActivities, setActiveActivities] = useState([]);
  const [activeAccommodations, setActiveAccommodations] = useState([]);
  const [activeTravels, setActiveTravels] = useState([]);
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);

  const allData = {activeTrip, activeMeals, activeActivities, activeAccommodations, activeTravels, user}

  useEffect(() => {
    fetchData();
    if (user) {
      getTripById(user._id).then((trip) => {
        setActiveTrip(trip);
      });
    }
  }, []);

  useEffect(() => {
    if (activeTrip) {
      fetchTripDetails(activeTrip._id);
    }
  }, [activeTrip]);

  const fetchData = async () => {
    try {
      const user = await getUser();
      setUser(user);
    } catch (err) {
      console.log('Error at DataContext.js fetchData', err);
    }
  };

  const fetchTripDetails = async () => {
    try {

      const meals = await getMealsForTrip(activeTrip._id);
      setActiveMeals(meals);

      const activities = await getActivitiesForTrip(activeTrip._id);
      setActiveActivities(activities);

      const accommodations = await getAccommodationsForTrip(activeTrip._id);
      setActiveAccommodations(accommodations);

      const travels = await getTravelsForTrip(activeTrip._id);
      setActiveTravels(travels);
    
    } catch (err) {
      console.log('Error at DataContext.js fetchTripDetailsData', err);
    }
  };

  return (
    <DataContext.Provider
      value={{
        activeTrip: activeTrip || [],
        setActiveTrip,
        activeMeals: activeMeals || [],
        activeActivities: activeActivities || [],
        activeAccommodations: activeAccommodations || [],
        activeTravels: activeTravels || [],
        setAddress: setAddress,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
