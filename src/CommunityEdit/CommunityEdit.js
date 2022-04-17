import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommunityForm from '../CommunityForm/CommunityForm';
import useCampgroundDetail from '../hooks/useCampgroundDetail';
import API_URL from '../../apiConfig';

function CommunityEdit(props) {
  const { id } = useParams();
  let navigate = useNavigate();
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState(null);

  const getPostDetail = async () => {
    try {
      const response = await fetch(API_URL + `posts/${id}`);
      if (response.status === 200) {
        const data = await response.json();
        setFormData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostDetail();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await fetch(API_URL + `posts/${id}`, {
        method: 'PUT',
        body: formData,
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        navigate(`/community/${id}`);
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
        Edit community
      </h1>
      <CommunityForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleFileUpload={handleFileUpload}
        formData={formData}
      />
    </div>
  );
}

export default CommunityEdit;
