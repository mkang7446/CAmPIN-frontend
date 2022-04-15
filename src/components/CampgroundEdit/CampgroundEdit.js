import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CampgroundForm from '../CampgroundForm/CampgroundForm';
import useCampgroundDetail from '../hooks/useCampgroundDetail';
import API_URL from '../../apiConfig';

function CampgroundEdit(props) {
  const { id } = useParams();
  let navigate = useNavigate();
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState(null);

  const getCampgroundDetail = async () => {
    try {
      const response = await fetch(API_URL + `campgrounds/${id}`);
      if (response.status === 200) {
        const data = await response.json();
        setFormData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCampgroundDetail();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await fetch(API_URL + `campgrounds/${id}`, {
        method: 'PUT',
        body: formData,
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        navigate(`/campgrounds/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileUpload = async (event) => {
    setFormData({ ...formData, photo: event.target.files[0] });
  };

  useEffect(() => {}, []);

  if (!formData) {
    return null;
  }

  return (
    <div>
      <h1 style={{ fontSize: '50px', textAlign: 'center', marginTop: '20px' }}>
        Edit campground
      </h1>
      <CampgroundForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleFileUpload={handleFileUpload}
        formData={formData}
      />
    </div>
  );
}

export default CampgroundEdit;
