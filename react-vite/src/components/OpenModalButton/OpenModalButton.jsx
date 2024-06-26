import React from 'react';
import {useModal} from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  children // optional: custom content for the button, added to utilize icons
}){
  const {setModalContent, setOnModalClose} = useModal();

  const onClick = () => {
    if(onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if(typeof onButtonClick === "function") onButtonClick();
  };

  if(children){
    return React.cloneElement(children, {onClick});
  }

  return(
    <button className='open-modal-btn' style={{height: '30px', width: '130px', borderRadius: '10px', backgroundColor: 'rgb(128, 181, 228)', cursor: 'pointer'}} onClick={onClick}>
      {buttonText}
    </button>
  );
}

export default OpenModalButton;