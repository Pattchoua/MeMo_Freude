
import { Routes, Route } from 'react-router-dom';
import PostsPage from '../pages/PostsPage';
import UserPostDetails from '../pages/UserPostDetails';
import Home from '../pages/Home';
import UserPostUpdate from '../pages/UserPostUpdate';
import ProtectedRoute from '../Authentication/ProtectedRoute';
import Dashboard from '../pages/Dashboard';


const Mainbody = () => {
  return (
    <main>
    <Routes>
      <Route path="/posts" element={<ProtectedRoute />}>
        <Route path="" element={<PostsPage />} />
        <Route path="dashboard" element={<Dashboard  />} />
        <Route path=":id" element={<UserPostDetails />} />
        <Route path=":id/update" element={<UserPostUpdate/>} />
      </Route>

      <Route path="" element={<Home />} />
    </Routes>
  </main>
  );
};

export default Mainbody;
