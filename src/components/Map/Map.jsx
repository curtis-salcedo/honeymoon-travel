import React, { useContext, useEffect } from 'react';
import { DataContext } from '../../utilities/DataContext';
import { MapContext } from '../../utilities/MapContext';

import * as MapsService from '../../utilities/services/maps-service';

import './Map.css'

export default function Map({}) {
  const { address } = useContext(DataContext)
  const { mapLocation, setMapLocation, findOne } = useContext(MapContext)

  useEffect(() => {
    console.log('map address', mapLocation)
  }, [address, mapLocation])
  
  // Create the seach Query for Long/Lat from the address
  const query = mapLocation ? `${mapLocation.latitude},${mapLocation.longitude}` : 'denver';
  const zoom = 'zoom=15'
  const mapId = 'map_id=eb2f3cc6944a4293'

  return (
    <div className='MapContainer'>
        <iframe 
        className='MapArea'
        title='this is a title'
        style={{ border: '0' }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyC-cmS2g3Y3yti-MmZe9A4TbISPziKMEP4&q=${query}&${zoom}`}>
        </iframe>
    </div>
  );
}
