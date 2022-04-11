import { useState, useEffect } from 'react';
import API_URL from '../../apiConfig';

function useCampgroundDetail(id) {
  const [campground, setCampground] = useState(null);

  const getCampgroundDetail = async () => {
    try {
      const response = await fetch(API_URL + `posts/${id}`);
      if (response.status === 200) {
        const data = await response.json();
        setCampground(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCampgroundDetail();
  }, []);

  return campground;
}

export default useCampgroundDetail;
