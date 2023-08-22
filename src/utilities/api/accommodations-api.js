import sendRequest from "../send-request";
const BASE_URL = '/api/accommodations';

export async function createAccommodation(accommodationData, address) {
  console.log('api accommodation data', accommodationData, address);
  return sendRequest(BASE_URL, 'POST', { accommodationData, address });
}


export async function updateAccommodation(accommodationId, updatedData) {
  return sendRequest(`${BASE_URL}/${accommodationId}`, 'PUT', updatedData);
}

export async function deleteAccommodation(accommodationId) {
  return sendRequest(`${BASE_URL}/${accommodationId}`, 'DELETE');
}

export async function getAccommodationsForTrip(id) {
  return sendRequest(`${BASE_URL}?tripId=${id}`, 'GET');
}

export async function getAccommodationById(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'GET');
}
