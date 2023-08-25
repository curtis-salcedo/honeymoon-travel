import React, { useEffect, useRef, useState, useContext } from 'react';
import { MapContext } from '../../../utilities/MapContext';

import {
  TextField,
  Grid,
  Container,
  Button,
} from '@mui/material';


export default function AddressForm({ handleSaveAddress, setAddress, address, googleMapType }) {
  const [resultData, setResultData] = useState(null);
  const [additionalFields, setAdditionalFields] = useState([]);
  const autoCompleteRef = useRef();
  const autoCompleteInputRef = useRef();
  console.log('google map type', googleMapType)
  // const options = {
  //   types: [googleMapType ? googleMapType : 'geocode'],
  //   fields: [
  //     'place_id',
  //     'address_components',
  //     'geometry',
  //     'name',
  //     'photos',
  //     ...additionalFields,
  //   ]
  // };
  
  // useEffect(() => {
  //   autoCompleteRef.current = new window.google.maps.places.Autocomplete(
  //     autoCompleteInputRef.current,
  //     options
  //   );

  //   autoCompleteRef.current.addListener('place_changed', async function () {
  //     const place = await autoCompleteRef.current.getPlace();
  //     console.log({ place });
  //     setResultData(place); // Clear the result data if not a hotel
  //   });
  // }, []);

  useEffect(() => {
    const options = {
      types: [googleMapType ? googleMapType : 'geocode'],
      fields: [
        'place_id',
        'address_components',
        'geometry',
        'name',
        'photos',
        'rating',
        'price_level',
        'formatted_phone_number',
        'website',
      ]
    };

    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      autoCompleteInputRef.current,
      options
    );

    autoCompleteRef.current.addListener('place_changed', async function () {
      const place = await autoCompleteRef.current.getPlace();
      console.log({ place });
      setResultData(place);
    });

  }, [googleMapType])


  useEffect(() => {
    setAddress(prevAddress => ({
      ...prevAddress,
      addressNumber: resultData ? resultData.address_components[0]?.long_name || '' : '',
      streetName: resultData ? resultData.address_components[1]?.long_name || '' : '',
      city: resultData ? resultData.address_components[3]?.long_name || '' : '',
      state: resultData ? resultData.address_components[5]?.long_name || '' : '',
      zipCode: resultData ? resultData.address_components[7]?.long_name || '' : '',
      country: resultData ? resultData.address_components[6]?.long_name || '' : '',
      longitude: resultData ? resultData.geometry.location.lng() || '' : '',
      latitude: resultData ? resultData.geometry.location.lat() || '' : '',
      name: resultData ? resultData.name || '' : '',
      placeId: resultData ? resultData.place_id || '' : '',
      images: resultData && resultData.photos ? resultData.photos.slice(0, 5).map(photo => photo.getUrl()) : [],
      rating: resultData ? resultData.rating || '' : '',
      priceLevel: resultData ? resultData.price_level || '' : '',
      phoneNumber: resultData ? resultData.formatted_phone_number || '' : '',
      website: resultData ? resultData.website || '' : '',
    }));
  }, [resultData]);

  


  return (
    <Container>
    <Grid>
      <Grid>
        <TextField
          label="Search by business name or address"
          variant="outlined"
          inputRef={autoCompleteInputRef}
          fullWidth
        />
        <Button onClick={handleSaveAddress}>Save</Button>
      </Grid>
    </Grid>
  </Container>
  );
}
