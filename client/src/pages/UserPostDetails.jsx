import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/Auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../Axios";
import { FaMapMarkerAlt, FaCommentAlt, FaThumbsUp } from "react-icons/fa";

const UserPostDetails = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isCreator, setIsCreator] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // State for Comment Modal:
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const openCommentModal = () => {
    setIsCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  const handleCommentTextChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleLikePost = async () => {
    try {
      await axios.post(`/api/posts/${id}/like`);
      setIsLiked(true);

      // Update the local post data with the new like count
      setPost((prevPost) => {
        if (prevPost) {
          return {
            ...prevPost,
            likes: [...prevPost.likes, user._id],
          };
        }
        return prevPost;
      });

      const updatedLikeCount = post ? post.likes.length + 1 : 1;
      navigate(`/posts/${id}?likedCount=${updatedLikeCount}`);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const submitComment = async () => {
    try {
      const response = await axios.post(
        `/api/posts/${id}/comment`,
        {
          text: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPost((prevPost) => {
        if (prevPost) {
          return {
            ...prevPost,
            commentsCount: (prevPost.commentsCount || 0) + 1,
            comments: [
              ...(prevPost.comments || []),
              { ...response.data, createdBy: user },
            ],
          };
        }
        return prevPost;
      });

      setIsCommentModalOpen(false);
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`/api/posts/users/${user._id}/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setIsCreator(user._id === res.data.createdBy);
        setIsLiked(res.data.likes.includes(user._id));
      })
      .catch((e) => {
        setError(e.response?.data?.error || "Error fetching post");
        setPost(null);
      });
  }, [id, user]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${id}`);
      console.log("Post deleted successfully");
      navigate("/posts/dashboard");
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-center items-start">
        <div className="lg:w-1/2 pr-6">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-4">
              <img
                src={post?.image}
                alt={post?.title}
                className="w-full h-auto"
              />
              <div className="p-6">
                <h2 className="text-4xl font-semibold mb-4 text-blue-900">
                  {post?.title}
                </h2>
                <div className="flex items-center space-x-2 text-gray-600 text-lg mb-4">
                  <FaMapMarkerAlt className="h-6 w-6" />
                  <span className="text-blue-500">Ort: </span>{" "}
                  <span className="text-gray-700">{post?.location}</span>
                </div>
                <p className="text-gray-700 text-base mb-6">{post?.message}</p>
                <div className="text-center">
                  {isCreator && (
                    <div className="flex space-x-4">
                      <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition duration-300 text-lg flex-1"
                      >
                        Löschen
                      </button>
                      <Link
                        to={`/posts/${id}/update`}
                        className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 text-lg flex-1"
                      >
                        Bearbeiten
                      </Link>
                    </div>
                  )}
                  {!isCreator && !isLiked && (
                    <button
                      onClick={handleLikePost}
                      className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 text-lg mt-4"
                    >
                      <FaThumbsUp className="h-6 w-6 mr-2" /> Like
                    </button>
                  )}

                  {/* Display the number of likes */}
                  <div className="mt-2">
                    <div className="flex items-center space-x-2 text-gray-600 text-lg">
                      <FaThumbsUp className="h-6 w-6 text-blue-500 border border-blue-500 rounded-full p-1" />
                      <span className="text-blue-500 text-lg">
                        {post?.likes.length} Likes
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="lg:w-1/2 pl-6">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-900">
                Kommentare
              </h2>
              <div className="comment-container max-h-64 overflow-y-auto">
                {post?.comments && (
                  <div>
                    {post.comments.map((comment) => (
                      <div
                        key={comment._id}
                        className="bg-gray-100 p-2 rounded-lg mt-2"
                      >
                        <p className="text-black">{comment.text}</p>
                        <p className="text-gray-500">
                          Von {comment.createdBy.username}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={openCommentModal}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
              >
                <FaCommentAlt className="h-6 w-6 mr-2" /> Kommentar hinzufügen
              </button>
              {isCommentModalOpen && (
                <div className="mt-4">
                  <textarea
                    rows="5"
                    placeholder="Schreibe deinen Kommentar..."
                    className="w-full border rounded-md p-2 mb-2 text-black"
                    value={commentText}
                    onChange={handleCommentTextChange}
                  ></textarea>
                  <div className="flex justify-end">
                    <button
                      onClick={closeCommentModal}
                      className="text-blue-500 hover:text-blue-600 mr-2"
                    >
                      Abbrechen
                    </button>
                    <button
                      onClick={submitComment}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Absenden
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPostDetails;
