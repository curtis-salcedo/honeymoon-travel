import sendRequest from "../send-request";
const BASE_URL = '/api/accommodations';

export async function createAccommodation(accommodationData) {
  return sendRequest(BASE_URL, 'POST', accommodationData);
}

export async function updateAccommodation(accommodationId, updatedData) {
  return sendRequest(`${BASE_URL}/${accommodationId}`, 'PUT', updatedData);
}

export async function deleteAccommodation(accommodationId) {
  return sendRequest(`${BASE_URL}/${accommodationId}`, 'DELETE');
}

// Additional utility functions as needed
