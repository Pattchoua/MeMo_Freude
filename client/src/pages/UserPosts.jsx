import { AuthContext } from '../context/Auth';
import { useState, useEffect, useContext } from 'react';
import axios from '../Axios';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserPosts = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(`/api/posts/users/${user._id}/posts`);
        if (response.status === 200) {
          setPosts(response.data);
        } else {
          console.error('Error fetching user posts');
        }
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <Link to={`/posts/${post._id}`} className="block">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3">
                  <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                  <div className="flex items-center space-x-2 text-gray-500 text-sm mb-2">
                    <FaMapMarkerAlt className="h-4 w-4" />
                    <span>{post.location}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPosts;
