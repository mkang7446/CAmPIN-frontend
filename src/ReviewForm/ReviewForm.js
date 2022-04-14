import { Form, Button, Alert } from 'react-bootstrap';

function ReviewForm({ handleSubmit, formData, handleChange, error }) {
  return (
    <div className='w-75 p-3'>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='body'>
          <Form.Label>Body</Form.Label>
          <Form.Control
            required
            as='textarea'
            rows={5}
            value={formData.body}
            onChange={handleChange}
            name='body'
          />
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
}

export default ReviewForm;
