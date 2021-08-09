import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


export default function WriteReview({getArtistsDetail}){
    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {id} =useParams();

    const initialFormValues={
        title: "",
        body: "",
        artist_id:`${id}`     
    }
    const [values, setValues] = useState(initialFormValues);
    const _handleChange = (e) => {
        setValues(prevState => {
            return {
                ...prevState, 
                [e.target.id]: e.target.value

            }
        })
    }
    const _createReview = async (e) => {
		e.preventDefault();
		const API_ENDPOINT = `https://music-end-drf.herokuapp.com/reviews/`;
		const response = await fetch(API_ENDPOINT, {
			method: 'POST',
			body: JSON.stringify(values),
			headers: {
                Authorization:`Token ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
			},
		});
		if (response.status === 201) {
            getArtistsDetail();
            setValues(initialFormValues)
            handleClose();
            history.goBack('/');
		}
    
    }

    return(
        <>
            <Button variant="primary" onClick={handleShow}>
            Write Review 💌
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Reviews</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={_createReview}>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="title"value={values.title}onChange={(e)=>_handleChange(e)} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="body">
                            <Form.Label>Your review:</Form.Label>
                            <Form.Control type="text" placeholder="review"value={values.body}onChange={(e)=>_handleChange(e)}
                                required as="textarea" rows={4} />
                            <Button type='submit'>💌 Post</Button>
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}