import sendRequest from "../send-request";
const BASE_URL = '/api/activities';

export async function createActivity(activityData) {
  return sendRequest(BASE_URL, 'POST', activityData);
}

export async function updateActivity(activityId, updatedData) {
  return sendRequest(`${BASE_URL}/${activityId}`, 'PUT', updatedData);
}

export async function deleteActivity(activityId) {
  return sendRequest(`${BASE_URL}/${activityId}`, 'DELETE');
}

// Additional utility functions as needed
