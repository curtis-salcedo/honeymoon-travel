import sendRequest from "../send-request";
const BASE_URL = '/api/meals';

export async function createMeal(mealData, address) {
  console.log('this is the api call', mealData, address)
  return sendRequest(BASE_URL, 'POST', {mealData, address});
}

export async function updateMeal(mealId, updatedData) {
  return sendRequest(`${BASE_URL}/${mealId}`, 'PUT', updatedData);
}

export async function deleteMeal(mealId) {
  return sendRequest(`${BASE_URL}/${mealId}`, 'DELETE');
}

export async function getMealsForTrip(id) {
  return sendRequest(`${BASE_URL}?tripId=${id}`, 'GET');
}

export async function getAllMeals(id) {
  return sendRequest(`${BASE_URL}?tripId=${id}`, 'GET');
}