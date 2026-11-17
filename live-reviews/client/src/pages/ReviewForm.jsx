import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api";

function ReviewForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  
  const getReview = async () => {
    try {
      const res = await api.get(`/api/reviews/${id}`);

      setTitle(res.data.review.title);
      setContent(res.data.review.content);
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  
  useEffect(() => {
    if (id) {
      getReview();
    }
  }, [id]);

  
  const saveReview = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    try {
      setLoading(true);

      if (id) {
        await api.put(`/api/reviews/${id}`, {
          title,
          content,
        });
      } else {
        await api.post("/api/reviews", {
          title,
          content,
        });
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  
  const resetForm = () => {
    if (id) {
      getReview();
    } else {
      setTitle("");
      setContent("");
    }
  };

  
  const deleteReview = async () => {
    try {
      setLoading(true);

      await api.delete(`/api/reviews/${id}`);

      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>{id ? "Edit Review" : "Create Review"}</h1>

      <form onSubmit={saveReview}>
        <div>
          <label>Title</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </div>

        <br />

        <div>
          <label>Content</label>
          <br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter content"
            rows="5"
          />
        </div>

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>

        <button type="button" onClick={resetForm} disabled={loading}>
          Reset
        </button>

        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>

        {id && (
          <button type="button" onClick={deleteReview} disabled={loading}>
            Delete
          </button>
        )}
      </form>
    </div>
  );
}

export default ReviewForm;