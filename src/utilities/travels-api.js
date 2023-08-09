import sendRequest from "./send-request";
const BASE_URL = '/api/travels';

export async function createTravel(TravelData) {
  return sendRequest(BASE_URL, 'POST', TravelData);
}

export async function updateTravel(TravelId, updatedData) {
  return sendRequest(`${BASE_URL}/${TravelId}`, 'PUT', updatedData);
}

export async function deleteTravel(TravelId) {
  return sendRequest(`${BASE_URL}/${TravelId}`, 'DELETE');
}

// Additional utility functions as needed
