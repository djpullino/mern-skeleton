import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import getUserInfo from "../../utilities/decodeJwt";

// This page will provide the implementations of a history page which will let the users check the submission of rating, comment etc..

const History = () => {
    const [ratings, setRatings] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRating, setSelectedRating] = useState({});

    const [user, setUser] = useState({})
    const [searchTerm, setSearchTerm] = useState(""); //Imports the Search Bar
    
    const handleCloseModal = () => setShowModal(false);
    const handleOpenModal = (rating) => {

        if (user.username === rating.username) {
            setSelectedRating(rating);
            setShowModal(true);
        } else {
            alert("You cannot edit this rating as you are not the creator.");
        }
    };

    // Will fetch and call all the ratings from the Mongo_DB Rating collection.
    const fetchRatings = async () => {
        const response = await axios.get('http://localhost:8081/ratings/getAll');
        setRatings(response.data);
    };

    const handleEditRatings = async (updatedRating) => {
        try {
            const response = await axios.post('http://localhost:8081/ratings/editRatings', updatedRating);
            await fetchRatings();
            setSelectedRating({});
            handleCloseModal();

            console.log('response from server: ', response.data);
            alert("Rating updated successfully!");
        }
        catch (error) {
            console.error(error);
            alert("Failed to update Rating. Please try again later.");
        }
    };

    useEffect(() => {
        fetchRatings(); 
        setUser(getUserInfo()) //Retrieves the user information.
    }, []);


    return (
        <div className="history_container" style={{ textAlign: 'center', paddingTop: "10px", fontFamily: 'Montserrat', backgroundColor: '#0c0c1f', paddingBottom: '15px', color: 'white', minHeight: '100vh' }}>
            <div className="container" style={{ backgroundColor: '#0c0c1f', color: 'white' }}
            >
                <h1>History</h1>
                <br></br>

                <input
                    type="text"
                    placeholder="Search by station name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <table className="table" style={{ color: 'white' }}>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>stationName</th>
                            <th>Comments</th>
                            <th>Ratings</th>

                            <th></th>
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: '#0c0c1f', color: 'white' }}>
                        {ratings
                            .filter((rating) =>
                                rating.stationName.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((rating) => (
                                <tr key={rating.id}>
                                    <td>{rating.username}</td>
                                    <td>{rating.stationName}</td>
                                    <td>{rating.comments}</td>

                                    <td style={{ color: "#ffc107" }}>
                                        {[...Array(rating.ratings)].map((star, i) => (
                                            <FaStar key={i} className="star" />
                                        ))}
                                    </td>
                                    <td>{rating.Date}</td>

                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleOpenModal(rating)}
                                        disabled={!user || user.username !== rating.username}
                                        style={{ background: (!user || user.username !== rating.username) ? 'gray' : '' }}
                                    >
                                        Edit
                                    </button>
                                </tr>


                            ))}
                    </tbody>
                </table>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Rating</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ backgroundColor: '#0c0c1f', color: 'white' }}>
                            <label>Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={selectedRating.username}
                                disabled
                            />
                        </div>
                        <div>
                            <label>stationName:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={selectedRating.stationName}
                                disabled
                            />
                        </div>

                        <div className="mt-2">
                            <label>Comments:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={selectedRating.comments}
                                onChange={(e) =>
                                    setSelectedRating({
                                        ...selectedRating,
                                        comments: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="mt-2">
                            <label>Ratings:</label>
                            <div>
                                {[...Array(5)].map((star, i) => (
                                    <FaStar
                                        key={i}
                                        className="star"
                                        onClick={() =>
                                            setSelectedRating({
                                                ...selectedRating,
                                                ratings: i + 1,
                                            })
                                        }
                                        style={{
                                            color:
                                                i + 1 <= selectedRating.ratings ? 'yellow' : 'gray',
                                        }}
                                    />
                                ))}
                            </div>

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                        <Button variant="primary" type='submit' onClick={() => handleEditRatings(selectedRating)}>
                            submit
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default History;