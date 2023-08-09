import sendRequest from "./send-request";
const BASE_URL = '/api/trips';

export async function createTrip(tripData) {
  return sendRequest(BASE_URL, 'POST', tripData);
}

export async function updateTrip(tripId, updatedData) {
  return sendRequest(`${BASE_URL}/${tripId}`, 'PUT', updatedData);
}

export async function deleteTrip(tripId) {
  return sendRequest(`${BASE_URL}/${tripId}`, 'DELETE');
}

// Additional utility functions as needed
