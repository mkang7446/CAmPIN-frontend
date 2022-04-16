import { useMemo, useState, useCallback } from 'react';
import API_URL from '../../apiConfig';

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Data,
} from '@react-google-maps/api';
import styled from 'styled-components';
import React from 'react';
import { formatRelative } from 'date-fns';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Styles = styled.div`
  h1 {
    position: absolute;
    top: 9rem;
    left: 6rem;
    color: black;
    z-index: 10;
    margin: 0;
    padding: 0;
  }

  .map_search {
    position: absolute;
    top: 13rem;
    left: 6rem;
    z-index: 10;
  }
  .map-search-list:hover {
    cursor: pointer;
  }
`;

const libraries = ['places'];

const mapContainerStyle = {
  width: '63vw',
  height: '80vh',
  marginTop: '50px',
  marginBottom: '50px',
};

const center = {
  lat: 34.052235,
  lng: -118.243683,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
// #######################################################
let addressArray = [];
console.log(addressArray);
// #######################################################

function Map(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = useState([]);

  const [selected, setSelected] = useState(null);

  console.log(markers);
  console.log(selected);

  const OnMapClick = useCallback((event) => {
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    <>
      <Styles>
        <div style={{ marginLeft: '40px' }}>
          <h1>
            Campgrounds{'  '}
            <span role='img' aria-label='tent'>
              ⛺️
            </span>
          </h1>

          <Search panTo={panTo} />

          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={center}
            options={options}
            onClick={OnMapClick}
            onLoad={onMapLoad}
          >
            {markers.map((marker) => (
              <Marker
                key={marker.time.toISOString()}
                position={{ lat: marker.lat, lng: marker.lng }}
                icon={{
                  url: '/pin.svg',
                  scaledSize: new window.google.maps.Size(30, 30),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                }}
                onClick={() => {
                  setSelected(marker);
                }}
              />
            ))}

            {selected ? (
              <InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => {
                  setSelected(null);
                }}
              >
                <div>
                  <h2>Campground Pinned!</h2>
                  <p>Pinned {formatRelative(selected.time, new Date())}</p>
                </div>
              </InfoWindow>
            ) : null}
          </GoogleMap>
        </div>
      </Styles>
      {/* <div style={{ marginLeft: '600px' }}>
        <Card>
          <Card.Body>My Sites</Card.Body>
        </Card>
        <Card>
          {addressArray.map((address) => (
            <Card.Body>
              <div>{address}</div>
            </Card.Body>
          ))}
        </Card>
      </div> */}
    </>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 34.052235, lng: () => -118.243683 },
      radius: 200000,
    },
  });

  // #######################################################
  async function handleSubmit(address) {
    // event.preventDefault();
    // const data = event.target.value;
    console.log(address);
    console.log(typeof address);
    try {
      const response = await fetch(API_URL + 'mycampins/', {
        method: 'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(address),
      });
      console.log(response);
      addressArray.push(address);
      console.log(addressArray);
    } catch (error) {
      console.log(error);
    }
  }
  // #######################################################

  return (
    <>
      <div className='map_search'>
        <Combobox
          onSelect={async (address) => {
            setValue(address, false);
            clearSuggestions();

            try {
              const results = await getGeocode({ address });
              const { lat, lng } = await getLatLng(results[0]);
              panTo({ lat, lng });
              // #######################################################
              handleSubmit({ address });
              // #######################################################
            } catch (error) {
              console.log(error);
            }
            // #######################################################
            console.log(address);
            // addressArray.push(address);
            // #######################################################
          }}
        >
          <div>
            <ComboboxInput
              className='map_input'
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              disabled={!ready}
              placeholder='Enter an address'
              style={{ width: '250px', height: '40px' }}
            />
          </div>
          <ComboboxPopover>
            <ComboboxList style={{ backgroundColor: 'white' }}>
              {status === 'OK' &&
                data.map(({ id, description }) => (
                  <ComboboxOption
                    className='map-search-list'
                    key={id}
                    value={description}
                  />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
    </>
  );
}
export default Map;
