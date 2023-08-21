import React, { useContext, useEffect } from 'react';
import { DataContext } from '../../utilities/DataContext';

import * as MapsService from '../../utilities/services/maps-service';

import './Map.css'

export default function Map({}) {
  const { address } = useContext(DataContext)
  console.log('map address', address)

  useEffect(() => {
    console.log('map address', address)
  }, [address])
  
  return (
    <div className='MapContainer'>
        <iframe 
        className='MapArea'
        title='this is a title'
        style={{ border: '0' }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC-cmS2g3Y3yti-MmZe9A4TbISPziKMEP4&q=denver">
        </iframe>
    </div>
  );
}