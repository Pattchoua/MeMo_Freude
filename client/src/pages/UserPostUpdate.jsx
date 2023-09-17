import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../Axios';
import { AuthContext } from '../context/Auth';

const UserPostUpdate = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: '',
    message: '',
    location: '',
    tags: '',
    image: '',
  });

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/api/posts/users/${user._id}/posts/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching Post', error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const updatePost = async () => {
    try {
      const formData = new FormData();
      formData.append('title', post.title);
      formData.append('message', post.message);
      formData.append('location', post.location);
      formData.append('tags', post.tags);
      formData.append('image', post.image);

      const response = await axios.put(`/api/posts/users/${user._id}/posts/${id}/update`, formData);
      setPost(response.data);
      navigate('/posts/dashboard');
    } catch (error) {
      console.error('Error updating Post', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      setPost({ ...post, image: files[0] });
    } else {
      setPost({ ...post, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePost();
  };

  return (

    <div className="flex py-8 items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-black">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Beitrag bearbeiten</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Titel:
          </label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-primary"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Nachricht:
          </label>
          <input
            type="text"
            name="message"
            value={post.message}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-primary"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Ort:
          </label>
          <input
            type="text"
            name="location"
            value={post.location}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-primary"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Bilder:
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition duration-300"
        >
          Senden
        </button>
      </form>
    </div>
    </div>
  );
};

export default UserPostUpdate;
