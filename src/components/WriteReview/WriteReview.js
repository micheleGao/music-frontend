import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';


export default function WriteReview({getArtistsDetail}){
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
		console.log('you submitted a review!!!!');
		const API_ENDPOINT = `http://localhost:8000/reviews/`;
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
			console.log(response);
            setValues(initialFormValues)
		}
    
    }

    return(
        <>
            <Button variant="primary" onClick={handleShow}>
            Write Review
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Write review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={_createReview}>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="title"value={values.title}onChange={(e)=>_handleChange(e)} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="body">
                            <Form.Label>Your review:</Form.Label>
                            <Form.Control type="text" placeholder="title"value={values.body}onChange={(e)=>_handleChange(e)}
                                required as="textarea" rows={4} />
                            <Button type='submit'>Post</Button>
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
        // <form onSubmit={_createReview}>
        //     <div>
        //         <label htmlFor="title">Title</label>
        //         <input type="text" id="title" value={values.title} required 
        //         onChange={(e)=>_handleChange(e)}/>
        //     </div>
        //     <div>
        //         <label htmlFor="url">URL</label>
        //         <input type="text" id="url" value={values.body} required 
        //         onChange={(e)=>_handleChange(e)}/>
        //     </div>

        //     <input type="submit" value="create Review"/>
        // </form>

//     )
// }