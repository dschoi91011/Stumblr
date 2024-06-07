import {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ModalProvider, Modal} from "../context/Modal";
import {thunkAuthenticate} from "../redux/session";
import Navigation from "../components/Navigation";

import './Layout.css'

export default function Layout(){
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return(
    <ModalProvider>
      <div className="layout">
        <Navigation />
        <div className="content">
          {isLoaded && <Outlet />}
        </div>
        <Modal />
      </div>
    </ModalProvider>
  );
}