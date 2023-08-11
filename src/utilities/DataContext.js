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

  useEffect(() => {
    fetchData();
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
      
      const trip = await getTripById();
      setActiveTrip(trip);

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


  console.log('activeTrip', activeTrip)

  return (
    <DataContext.Provider
      value={{
        activeTrip: activeTrip || [],
        setActiveTrip,
        activeMeals: activeMeals || [],
        activeActivities: activeActivities || [],
        activeAccommodations: activeAccommodations || [],
        activeTravels: activeTravels || [],
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
