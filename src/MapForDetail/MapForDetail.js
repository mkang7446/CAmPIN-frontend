import React from 'react';
import { useState, useEffect } from 'react';
import Geocode from 'react-geocode';

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.setLanguage('en');

const libraries = ['places'];

const mapContainerStyle = {
  width: '100%',
  height: '30%',
};

const center = {
  lat: 34.052235,
  lng: -118.243683,
};

function MapForDetail({ campground }) {
  const initialstate = {
    lat: '',
    lng: '',
  };

  const [geocode, setGeocode] = useState('');
  console.log(geocode);

  const getAddress = () =>
    Geocode.fromAddress(campground.location).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        setGeocode({
          lat: lat,
          lng: lng,
        });
      },
      (error) => {
        console.error(error);
      }
    );

  useEffect(() => {
    getAddress();
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={9}
      center={{ lat: geocode.lat, lng: geocode.lng }}
    >
      {' '}
      <Marker position={{ lat: geocode.lat, lng: geocode.lng }} />
    </GoogleMap>
  );
}

export default MapForDetail;
