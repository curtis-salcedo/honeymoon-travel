// Service modules export for trips

// Used to get AJAX requests from the server

import * as tripsAPI from '../api/trips-api';
import sendRequest from '../send-request';

export async function getTrips() {
  try {
    const trips = tripsAPI.getAll();
    return trips;
  } catch (err) {
    console.log('Error at getTrips in trips-service.js', err)
    throw err;
  }
}

