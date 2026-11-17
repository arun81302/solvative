import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../api";
import socket from "../socket";

function Home() {
  const [reviews, setReviews] = useState([]);

  
  const getReviews = async () => {
    try {
      const res = await api.get("/api/reviews");
      setReviews(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  
  const deleteReview = async (id) => {
    try {
      await api.delete(`/api/reviews/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReviews();

    
    const addReview = (review) => {
      setReviews((prev) => [
        review,
        ...prev.filter((item) => item._id !== review._id),
      ]);
    };

    
    const updateReview = (review) => {
      setReviews((prev) =>
        prev.map((item) =>
          item._id === review._id ? review : item
        )
      );
    };

    
    const removeReview = (id) => {
      setReviews((prev) =>
        prev.filter((review) => review._id !== id)
      );
    };

    socket.on("review:added", addReview);
    socket.on("review:updated", updateReview);
    socket.on("review:deleted", removeReview);

    return () => {
      socket.off("review:added", addReview);
      socket.off("review:updated", updateReview);
      socket.off("review:deleted", removeReview);
    };
  }, []);

  return (
    <div>
      <h1>Live Reviews</h1>

      <Link to="/new">
        <button>Create New Review</button>
      </Link>

      <br />
      <br />

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Content</th>
            <th>Date-Time</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {reviews.length === 0 ? (
            <tr>
              <td colSpan="6">No reviews found</td>
            </tr>
          ) : (
            reviews.map((review, index) => (
              <tr key={review._id}>
                <td>{index + 1}</td>
                <td>{review.title}</td>
                <td>{review.content}</td>
                <td>
                  {new Date(review.createdAt).toLocaleString()}
                </td>

                <td>
                  <Link to={`/${review._id}`}>
                    <button>Edit</button>
                  </Link>
                </td>

                <td>
                  <button onClick={() => deleteReview(review._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Home;