import sendRequest from "../send-request";
const BASE_URL = '/api/meals';

export async function createmeal(mealData) {
  return sendRequest(BASE_URL, 'POST', mealData);
}

export async function updatemeal(mealId, updatedData) {
  return sendRequest(`${BASE_URL}/${mealId}`, 'PUT', updatedData);
}

export async function deletemeal(mealId) {
  return sendRequest(`${BASE_URL}/${mealId}`, 'DELETE');
}

// Additional utility functions as needed
