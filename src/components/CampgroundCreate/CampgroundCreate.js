import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CampgroundForm from '../CampgroundForm/CampgroundForm';
import API_URL from '../../apiConfig';

const CampgroundCreate = ({ loggedIn }) => {
  const initialCampgroundData = {
    name: '',
    body: '',
    location: '',
    photo: '',
  };

  const navigate = useNavigate();

  const [newCampground, setNewCampground] = useState(initialCampgroundData);

  const handleChange = (event) => {
    setNewCampground((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleFileUpload = (event) => {
    setNewCampground({ ...newCampground, photo: event.target.files[0] });
  };

  const createCampground = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await fetch(API_URL + 'campgrounds/', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 201) {
        navigate('/campgrounds');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '50px', textAlign: 'center', marginTop: '20px' }}>
        New campground
      </h1>
      <CampgroundForm
        handleSubmit={createCampground}
        handleChange={handleChange}
        handleFileUpload={handleFileUpload}
        formData={newCampground}
      />
    </div>
  );
};

export default CampgroundCreate;
