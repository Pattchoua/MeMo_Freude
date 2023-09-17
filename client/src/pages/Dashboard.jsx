import { useContext } from "react";
import NewPost from './NewPost'; 
import UserPosts from './UserPosts'; 
import { FaPlusCircle } from 'react-icons/fa'; 
import { AuthContext } from "../context/Auth";


const Dashboard = () => {
    const { user } = useContext(AuthContext);
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen p-4">
      {/* Hero Section */}
      <div className="text-white text-center py-8">
        <h1 className="text-4xl font-bold mb-4">
        Hallo, {user.username}
        </h1>
        <p className="text-lg">Willkommen zu deinem Dashboard. Teile deine wunderbaren Erinnerungen.</p>
      </div>
      {/* Main Content */}
      <div className="max-w-8xl mx-auto bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2">
          {/* Render UserPosts in the main content area */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
            Deine Beiträge 
            </h2>
            <UserPosts />
          </div>
        </div>
        <div className="col-span-1">
          {/* Narrowed NewPost container */}
          <div className="bg-gray-100 p-4 rounded-lg max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
            Neuen Beitrag erstellen <FaPlusCircle className="ml-2" />
            </h2>
            <NewPost />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
