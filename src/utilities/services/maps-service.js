import * as AddressesAPI from '../api/addresses-api';

export async function getAddressLocation(addressId, setMapLocation) {
  try {
    console.log(addressId);
    const addressData = AddressesAPI.getAddress(addressId)
    .then((res) => {
      console.log(res);
      setMapLocation(res);
    });
  } catch (err) {
    console.log('Error at getAddress in addresses-service.js', err);
    throw err;
  }
}
