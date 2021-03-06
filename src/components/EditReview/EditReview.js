import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';


export default function EditReview({ getArtistsDetail, reviewId}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const history = useHistory();
    const { id } = useParams();
    
    const API_ENDPOINT = `https://music-end-drf.herokuapp.com/reviews/${reviewId}/`;

    const initialFormState = {
        title: "",
        body: "",
        artist_id: `${id}`
    }
    const [values, setValues]=useState(initialFormState)

    const _handleChange = (e) => {
        setValues((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            };
        });
    };
    const getReviews = async () => {
        try {
            const editReviews = await fetch(API_ENDPOINT);
            const data = await editReviews.json();
            setValues({ title: data.title, body: data.body });
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getReviews();
    }, []);

    const _updateReviews = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://music-end-drf.herokuapp.com/reviews/${reviewId}`,{
                method: 'PATCH',
                body: JSON.stringify(values),
                headers: {
                    Authorization:`Token ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                getArtistsDetail();
                setValues(initialFormState);
                handleClose();
            }
        } catch (err) {
            console.log(err);
        }
    }
    const _handleDelete = async (reviewId) => {
        if (window.confirm('You sure you to deleted this review of the artist?')) {
            try {
                const deletedReview = await fetch(`https://music-end-drf.herokuapp.com/reviews/${reviewId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization:`Token ${localStorage.getItem('token')}`,
                    },
                });
                if (deletedReview.status === 204) {
                    getArtistsDetail();
                    history.goBack('/');
                    
                } else {
                    alert('One moment please while, we fix this issue.');
                }
            } catch (err) {
                console.log(err)
            }
        }
        return;
    }

    return (
        <>
            <Button className="edit-review"variant="primary" onClick={handleShow}>
            Edit review ???????
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                onSubmit={_updateReviews}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={_updateReviews}>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="title"value={values.title}onChange={_handleChange} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="body">
                            <Form.Label>Your review:</Form.Label>
                            <Form.Control type="text" placeholder="body" value={values.body}onChange={_handleChange} required as="textarea" rows={4} />
                            <Button type='submit'> ???? Save</Button>
                            <Button  onClick={(e) => _handleDelete(reviewId)} > ??? Delete</Button>
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
