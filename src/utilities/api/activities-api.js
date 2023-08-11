import sendRequest from "../send-request";
const BASE_URL = '/api/activities';

export async function createActivity(activityData) {
  console.log('activityData', activityData)
  return sendRequest(BASE_URL, 'POST', activityData);
}

export async function updateActivity(activityId, updatedData) {
  return sendRequest(`${BASE_URL}/${activityId}`, 'PUT', updatedData);
}

export async function deleteActivity(activityId) {
  return sendRequest(`${BASE_URL}/${activityId}`, 'DELETE');
}

export async function getActivitiesForTrip(id) {
  return sendRequest(`${BASE_URL}?tripId=${id}`, 'GET');
}
