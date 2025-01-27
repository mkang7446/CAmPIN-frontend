import { Form, Button, Alert, Card } from 'react-bootstrap';
import createImg from '../../assets/create.jpg';
import styled from 'styled-components';

const Styles = styled.div`
  .create-camp {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .create-camp-container {
    display: flex;
    width: 85%;
    max-height: 800px;
    overflow: hidden;
    border-radius: 10px;
    gap: 50px;
  }
  .create-camp-img {
    margin-top: 50px;
    width: 100%;
    max-height: 'initial';
  }
  .create-camp-form {
    margin-top: 30px;
    width: 80%;
    display: flex;
    flex-direction: column;
    margin-left: 45px;
  }

  .create-camp-title {
    font-size: 50px;
    text-align: center;
    margin-top: 20px;
  }
  .create-camp-button {
    background-color: #8eecf5;
    border: 1px solid #8eecf5;
    border-radius: 8px;
    color: black;
    cursor: pointer;
    display: inline-block;
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
      'Helvetica Neue', sans-serif;
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: 600;
    width: 100%;
    height: 50px;
    margin-top: 10px;
  }

  .create-camp-button:hover {
    background-color: #ffb703;
    border: 1px solid #ffb703;
    color: #001219;
  }
`;
const CampgroundForm = ({
  handleSubmit,
  formData,
  handleChange,
  handleFileUpload,
  error,
}) => {
  return (
    <Styles>
      <div>
        <div className='create-camp'>
          <div className='create-camp-container'>
            <div className='create-camp-form' style={{ fontSize: '20px' }}>
              <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                <Form.Group controlId='name'>
                  <Form.Label>Campground Name</Form.Label>
                  <Form.Control
                    required
                    autoFocus
                    type='text'
                    name='name'
                    onChange={handleChange}
                    value={formData.name}
                    style={{ marginBottom: '20px', height: '3rem' }}
                  />
                </Form.Group>

                <Form.Group controlId='location'>
                  <Form.Label>Location ( City, State )</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    name='location'
                    onChange={handleChange}
                    value={formData.location}
                    style={{ marginBottom: '20px', height: '3rem' }}
                    placeholder='ex) Los Angeles, CA'
                  />
                </Form.Group>
                <Form.Group controlId='photo'>
                  <Form.Label>📸 Choose Imgae</Form.Label>
                  <Form.Control
                    mutiple
                    type='file'
                    name='photo'
                    accept='image/*'
                    onChange={handleFileUpload}
                    style={{ marginBottom: '20px' }}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='body'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as='textarea'
                    required
                    type='text'
                    name='body'
                    onChange={handleChange}
                    value={formData.body}
                    style={{ marginBottom: '20px', height: '10rem' }}
                  />
                </Form.Group>
                <Button
                  className='create-camp-button'
                  type='submit'
                  disabled={error}
                >
                  SUBMIT
                </Button>
                {error && (
                  <Alert variant='danger'>
                    Oops, something went wrong! Please try again!
                  </Alert>
                )}
              </Form>
            </div>
            <div className='create-camp-img'>
              <Card.Img src={createImg} />
            </div>
          </div>
        </div>
      </div>
    </Styles>
  );
};

export default CampgroundForm;
