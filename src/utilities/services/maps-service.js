import * as AddressesAPI from '../api/addresses-api';

export default function getOneMap(addressId) {
  console.log(addressId)
  const addressData = AddressesAPI.getAddress(addressId);
  console.log(addressData)
}
