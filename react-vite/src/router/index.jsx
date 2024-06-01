import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import AllPosts from '../components/AllPosts';
import UserPosts from '../components/UserPosts';
import CreatePostForm from '../components/CreatePostForm';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        // element: <h1>Welcome!</h1>,
        element: <AllPosts/>
      },
      {
        path: "login",
        element: <LoginFormPage/>,
      },
      {
        path: "signup",
        element: <SignupFormPage/>,
      },
      {
        path: "user/:userId/posts",
        element: <UserPosts/>
      },
      {
        path: "new-post",
        element: <CreatePostForm/>,
      },
    ],
  },
]);