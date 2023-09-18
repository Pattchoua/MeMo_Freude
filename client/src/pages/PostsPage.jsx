import { useContext, useState, useEffect } from "react";
import axios from "../Axios";
import { AuthContext } from "../context/Auth";
import ProjectsBanner from "../assets/ProjectsBanner.png";
import { Link, useLocation } from "react-router-dom";
import { FaComments, FaMapMarkerAlt } from "react-icons/fa";

const PostsPage = () => {
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  // Function to fetch the list of posts from the server
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`/api/posts`);
      const postsWithCommentCount = response.data.map((post) => ({
        ...post,
        commentsCount: post.comments.length,
      }));
      setPosts(postsWithCommentCount);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Fetch posts when the component mounts or when the likedCount query parameter changes
  useEffect(() => {
    fetchPosts();
  }, [location.search]);

  // Handle next page click
  const handleNextPage = () => {
    if (currentPage < Math.ceil(posts.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page click
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="bg-cover bg-center bg-no-repeat py-20 relative"
        style={{
          backgroundImage: `url(${ProjectsBanner})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
    className="absolute inset-0 bg-black opacity-50"
    style={{
      opacity: 0.5,
      backgroundColor: "black",
    }}
  ></div>
        <h1 className="text-white text-3xl mt-4 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-white font-bold">{user.username},</span>{" "}
          entdecke die besten Beiträge
        </h1>
      </div>

      {/* PostList */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {posts
            .slice(
              (currentPage - 1) * postsPerPage,
              currentPage * postsPerPage
            )
            .map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out transform hover:-translate-y-1 relative"
              >
                <Link to={`/posts/${post._id}`} className="block">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="bg-blue-900 text-white px-2 py-1 absolute top-2 left-2 rounded-md text-sm">
                    <span className="mr-2">
                      Geposted am  {new Date(post.createdAt).toLocaleDateString()}
                    </span><span>von {post.createdBy.username}</span>
                  </div>
                </Link>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <div className="flex items-center space-x-2 mb-2 text-gray-500">
                    <FaMapMarkerAlt className="h-5 w-5" />
                    <span>{post.location}</span>
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-1 text-blue-500">
                      <FaComments className="h-5 w-5" />
                      <span>Kommentare</span>
                      <span>({post.commentsCount || 0})</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`mr-2 ${
              currentPage === 1
                ? "bg-gray-500 text-gray-100"
                : "bg-blue-500 text-white"
            } px-4 py-2 rounded-md cursor-pointer`}
          >
            Vorherige Seite
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= Math.ceil(posts.length / postsPerPage)}
            className={`${
              currentPage >= Math.ceil(posts.length / postsPerPage)
                ? "bg-gray-500 text-gray-100"
                : "bg-blue-500 text-white"
            } px-4 py-2 rounded-md cursor-pointer`}
          >
            Nächste Seite
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
