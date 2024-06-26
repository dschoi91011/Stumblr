import {useModal} from '../../context/Modal';

function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the button that opens the modal
  onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}){
  const {setModalContent, setOnModalClose} = useModal();

  const onClick = () => {
    if(onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if(typeof onItemClick === "function") onItemClick();
  };

  return(
    <button className='ommi-btn' style={{height: '30px', width: '130px', borderRadius: '10px', backgroundColor: 'rgb(128, 181, 228)', cursor: 'pointer'}} onClick={onClick}>{itemText}</button>
  );
}

export default OpenModalMenuItem;
