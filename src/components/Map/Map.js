import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../apiConfig';
import { Button } from 'react-bootstrap';

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
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
import { Row, Col, Card } from 'react-bootstrap';

const Styles = styled.div``;

const libraries = ['places'];

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 34.052235,
  lng: -118.243683,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

function Map({ userInfo, loggedIn }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [mycampin, setMycampin] = useState([]);
  const [error, setError] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

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

  const getMycampinList = async () => {
    try {
      setError(false);

      const response = await fetch(API_URL + 'mycampins');
      if (response.status === 200) {
        const data = await response.json();
        setMycampin(data);
      }
    } catch (error) {
      setError(true);
    }
    return;
  };

  const handleDelete = async (event) => {
    try {
      const response = await fetch(
        API_URL + `mycampins/${event.target.value}`,
        {
          method: 'DELETE',
          headers: {
            AUthorization: `Token ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 204) {
        getMycampinList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMycampinList();
  }, []);

  if (!error && !mycampin.length) {
    return null;
  }

  if (error && !mycampin.length) {
    return <div>Oops, something went wrong! Please try again later!</div>;
  }

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    <>
      <Row
        className='g-4'
        style={{
          gap: '50px',
          marginLeft: '50px',
          marginRight: '50px',
          marginTop: '20px',
        }}
      >
        <Col>
          <Search panTo={panTo} getMycampinList={getMycampinList} />
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
                  scaledSize: new window.google.maps.Size(40, 40),
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
        </Col>

        <Col style={{ maxWidth: '40%' }}>
          <div className='mySites'>
            <div
              style={{
                textAlign: 'center',
                fontSize: '40px',
                fontWeight: '600',
                marginBottom: '20px',
                borderTop: '2px solid black',
                borderBottom: '2px solid black',
              }}
            >
              MY<span style={{ color: 'white' }}>-</span>CAMPING
              <span style={{ color: 'white' }}>-</span>LOGS
            </div>

            {mycampin.map((mycampin, idx) => (
              <Card style={{ marginBottom: '5px' }}>
                <Card.Body style={{ fontSize: '18px' }}>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div>{mycampin.body}</div>
                    <div>
                      <Button
                        value={mycampin.id}
                        onClick={handleDelete}
                        variant='danger'
                        style={{ marginLeft: '10px', marginRight: '10px' }}
                      >
                        X
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
            {/* </div>
            ) : (
              ''
            )} */}
          </div>
        </Col>
      </Row>
    </>
  );
}

function Search({ panTo, getMycampinList }) {
  let navigate = useNavigate();

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
  const handleSubmit = async (event) => {
    // event.preventDefault();
    // const data = event.target.value;
    console.log(event.address);
    // console.log(typeof address);
    const formData = new FormData(event.target);
    console.log(formData);
    try {
      const response = await fetch(API_URL + 'mycampins/', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({ body: event.address }),
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          // Accept: 'application/json',
          // 'Access-Control-Allow-Origin': '*',
        },
      });
      // if (response.status === 204) {
      getMycampinList();
      navigate('/mycampin');
      // }
      console.log(response);
      // addressArray.push(address);
      // console.log(addressArray);
    } catch (error) {
      console.log(error);
    }
  };
  // #######################################################

  return (
    <>
      <Styles>
        <div style={{ width: '100%' }} className='map_search'>
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
              setValue('');
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
                style={{ width: '100%', height: '40px', marginBottom: '30px' }}
              />
            </div>
            <ComboboxPopover>
              <ComboboxList
                id='map-search-list'
                style={{ backgroundColor: 'white', cursor: 'pointer' }}
              >
                {status === 'OK' &&
                  data.map(({ id, description }) => (
                    <ComboboxOption key={id} value={description} />
                  ))}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
        </div>
      </Styles>
    </>
  );
}
export default Map;
