import React, { useEffect, useRef, useState, useContext } from 'react';
import { MapContext } from '../../../utilities/MapContext';

import {
  TextField,
  Grid,
  Container,
  Button,
} from '@mui/material';


export default function AddressForm({ handleSubmitAddress, addressData, setAddressData }) {
  const { setAddress } = useContext(MapContext)
  const [resultData, setResultData] = useState(null);


  const autoCompleteRef = useRef();
  const autoCompleteInputRef = useRef();
  const options = {
    types: ['address'],
    fields: ['address_components', 'geometry', 'name'],
  };

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      autoCompleteInputRef.current,
      options
    );

    autoCompleteRef.current.addListener('place_changed', async function () {
      const place = await autoCompleteRef.current.getPlace();
      console.log({ place });
      setResultData(place);
      setAddressData(place)
      console.log(resultData)
    });
  }, []);

  useEffect(() => {
    setAddress({
      addressNumber: resultData ? resultData.address_components[0].long_name : '',
      streetName: resultData ? resultData.address_components[1].long_name : '',
      city: resultData ? resultData.address_components[3].long_name : '',
      state: resultData ? resultData.address_components[5].long_name : '',
      zipCode: resultData ? resultData.address_components[7].long_name : '',
      country: resultData ? resultData.address_components[6].long_name : '',
      longitude: resultData ? resultData.geometry.location.lng() : '',
      latitude: resultData ? resultData.geometry.location.lat() : '',
      name: resultData ? resultData.name : '',
    })
  }, [resultData])

  console.log(addressData)

  return (
    <Container>
      <Grid>
        <Grid>
          <TextField
            label="Enter address"
            variant="outlined"
            inputRef={autoCompleteInputRef}
          />
        <Button
          onClick={handleSubmitAddress}
        >Save</Button>
        </Grid>
      </Grid>
    </Container>
  );
}
