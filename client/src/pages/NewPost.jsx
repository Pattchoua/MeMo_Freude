import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../Axios';

const NewPost = () => {
  const navigate = useNavigate();

  // Initialization of the state for the input fields
  const [post, setPost] = useState({
    title: '',
    message: '',
    location: '',
    tags: '',
    image: null, // Use null to represent no selected image initially
  });

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', post.title);
      formData.append('message', post.message);
      formData.append('location', post.location);
      formData.append('tags', post.tags);
      formData.append('image', post.image);

      await axios.post('/api/posts', formData);

      // Reset the form fields by setting the state to its initial values
      setPost({
        title: '',
        message: '',
        location: '',
        tags: '',
        image: null,
      });

      // Redirect to the dashboard
      navigate('/posts');
    } catch (error) {
      console.error('Error creating new post:', error);
    }
  };

  // Function to handle changes in the form input fields
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Use a conditional to check if the input is an image file
    const newValue = name === 'image' ? files[0] : value;

    setPost((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  return (
    <div className="p-4">
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
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Nachricht:
          </label>
          <textarea
            type="text"
            rows="10"
            name="message"
            value={post.message}
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
  );
};

export default NewPost;
