import sendRequest from "../send-request";
const BASE_URL = '/api/addresses';

export async function createAddress(model, addressData) {
  return sendRequest(`${BASE_URL}`, 'POST', addressData);
}

export async function updateAddress(addressId, updatedData) {
  return sendRequest(`${BASE_URL}/${addressId}`, 'PUT', updatedData);
}

export async function deleteAddress(addressId) {
  return sendRequest(`${BASE_URL}/${addressId}`, 'DELETE');
}

export async function getAddress(addressId) {
  return sendRequest(`${BASE_URL}/${addressId}`);
}

// Additional utility functions as needed
