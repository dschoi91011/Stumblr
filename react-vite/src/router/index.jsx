import {createBrowserRouter} from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import AllPosts from '../components/AllPosts';
import UserPosts from '../components/UserPosts';
import CreatePostForm from '../components/CreatePostForm';
import OnePost from '../components/OnePost';
import Layout from './Layout';
import Favorites from '../components/Favorites';
import Follows from '../components/Follows';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
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
        element: <UserPosts/>,
      },
      {
        path: "new-post",
        element: <CreatePostForm/>,
      },
      {
        path: "posts/:postId",
        element: <OnePost/>,
      },
      {
        path: "favorites",
        element: <Favorites/>,
      },
      {
        path: "following",
        element: <Follows/>,
      }
    ],
  },
]);