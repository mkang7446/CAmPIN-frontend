import { Form, Button, Alert } from 'react-bootstrap';

const CampgroundForm = ({
  handleSubmit,
  formData,
  handleChange,
  handleFileUpload,
  error,
}) => {
  return (
    <div className='w-75 p-3'>
      <Form onSubmit={handleSubmit} encType='multipart/form-data'>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            autoFocus
            type='text'
            name='name'
            onChange={handleChange}
            value={formData.name}
          />
        </Form.Group>
        <Form.Group controlId='body'>
          <Form.Label>body</Form.Label>
          <Form.Control
            required
            type='text'
            name='body'
            onChange={handleChange}
            value={formData.body}
          />
        </Form.Group>
        <Form.Group controlId='location'>
          <Form.Label>location</Form.Label>
          <Form.Control
            required
            type='text'
            name='location'
            onChange={handleChange}
            value={formData.location}
          />
        </Form.Group>
        <Form.Group controlId='photo'>
          <Form.Label>Photo</Form.Label>
          <Form.Control
            mutiple
            type='file'
            name='photo'
            accept='image/*'
            onChange={handleFileUpload}
          ></Form.Control>
        </Form.Group>

        <Button className='mt-4' type='submit' disabled={error}>
          Submit
        </Button>
        {error && (
          <Alert variant='danger'>
            Oops, something went wrong! Please try again!
          </Alert>
        )}
      </Form>
    </div>
  );
};

export default CampgroundForm;
