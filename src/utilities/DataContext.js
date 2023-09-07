import React, { createContext, useEffect, useState } from "react";
import { getUser } from "./services/users-service";

import { getTripById } from "./api/trips-api";
import { getAccommodationsForTrip } from "./api/accommodations-api";
import { getActivitiesForTrip } from "./api/activities-api";
import { getMealsForTrip } from "./api/meals-api";
import { getTravelsForTrip } from "./api/trips-api";
import { getAllDataForTrip } from "./api/trips-api";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [activeTrip, setActiveTrip] = useState(null);
  const [activeMeals, setActiveMeals] = useState([]);
  const [activeActivities, setActiveActivities] = useState([]);
  const [activeAccommodations, setActiveAccommodations] = useState([]);
  const [activeTravels, setActiveTravels] = useState([]);
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
  const [tripData, setTripData] = useState(null)

  useEffect(() => {
    fetchData();
    async function fetchTrip() {
      try {
        // Get the user data
        const user = await getUser();
        // Check if the user has a recentlySelectedTrip
        if (user && user.recentlySelectedTrip) {
          // Fetch the trip data based on the user's recentlySelectedTrip status
          const tripId = user.recentlySelectedTrip;
          const tripData = await getTripById(tripId);
          // Set the active trip data
          setActiveTrip(tripData);
          fetchTripDetails(tripId);
        } else {
          // No recentlySelectedTrip, set activeTrip to null
          setActiveTrip(null);
        }
      } catch (err) {
        console.error('Error fetching and setting active trip:', err);
      }
    }
    // Call the fetchTrip function
    fetchTrip();
  }, []);

  const fetchData = async () => {
    let user;
    try {
      user = await getUser();
      setUser(user);
    } catch (err) {
      console.log('Error at DataContext.js fetchData for User Data', err);
    }
  };

  const fetchTripDetails = async (tripId) => {
    try {
      const data = await getAllDataForTrip(tripId);
      setTripData(data)
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
        tripData: tripData || [],
        setUser: setUser,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
