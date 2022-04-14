import { useState, useEffect } from 'react';
import ReviewForm from '../ReviewForm/ReviewForm';
import { useParams, useNavigate } from 'react-router-dom';
import API_URL from '../../apiConfig';

function ReviewEdit(props) {
  const { campgroundId, reviewId } = useParams();
  let navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(false);

  async function getReviewData() {
    try {
      const response = await fetch(`${API_URL}reviews/${reviewId}`);
      const data = await response.json();
      setFormData(data);
    } catch (error) {}
  }

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(`${API_URL}reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 200) {
        navigate(`/campgrounds/${campgroundId}`);
      }
    } catch (error) {}
  }
  useEffect(() => {
    getReviewData();
  }, []);
  return (
    <div>
      <h2>Edit Review</h2>
      {formData && (
        <ReviewForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          error={error}
        />
      )}
    </div>
  );
}

export default ReviewEdit;
