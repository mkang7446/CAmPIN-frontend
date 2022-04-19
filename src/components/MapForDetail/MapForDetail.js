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

function MapForDetail({ campground }) {
  const [geocode, setGeocode] = useState({});

  const getAddress = () =>
    Geocode.fromAddress(campground.location).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setGeocode({
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        });
      },
      (error) => {}
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
      center={{ lat: parseFloat(geocode.lat), lng: parseFloat(geocode.lng) }}
    >
      {' '}
      <Marker
        position={{
          lat: parseFloat(geocode.lat),
          lng: parseFloat(geocode.lng),
        }}
      />
    </GoogleMap>
  );
}

export default MapForDetail;
