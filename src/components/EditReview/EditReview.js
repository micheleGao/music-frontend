import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';


export default function EditReview({artists, setArtists, getArtistDetails}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const history = useHistory();
    const { id } = useParams();
    
    const API_ENDPOINT = `http://localhost:8000/reviews/${id}`;

    const initialFormState = {
        title: "",
        body: "",
        id: `${id}`
    }
    const [values, setValues]=useState(initialFormState)
    // const [values, setValues] = useState({
    //     title: '',
    //     body: '',
    //     id:`${id}`
    // })
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
            const response = await fetch(API_ENDPOINT, {
                method: 'PUT',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 201) {
                getArtistDetails();
                setArtists(setValues)
                history.goBack();
            } else {
                alert('Oooopppps.');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Button  small variant="primary" onClick={handleShow}>
            Edit review
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
                            <Form.Control type="text" placeholder="title"value={values.body}onChange={_handleChange} required as="textarea" rows={4} />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type='submit'>Edit</Button>
                    <Button type='submit'>Edit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

        // <form onSubmit={_updateReviews}>
        //     <div>
        //         <label htmlFor="title">Title</label>
        //         <input
        //             type="text"
        //             id="title"
        //             value={values.title}
        //             onChange={_handleChange}
        //             required
        //         />
        //     </div>
        //     <div>
        //         <label htmlFor='body'>Body</label>
        //         <input
        //             type='text'
        //             id='body'
        //             value={values.body}
        //             onChange={_handleChange}
        //             required
        //         />
        //     </div>
        //     <input type='submit' value='update Review' />
        // </form>

//     )
// }