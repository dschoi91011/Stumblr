import { useModal } from '../../context/Modal';
import { useNavigate } from 'react-router-dom';
import './NewPostType.css';

export default function NewPostType(){
    const {closeModal} = useModal();
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/new-post');
        closeModal();
    }

    const futureFeature = () => {
        alert('Feature under construction')
    }

    return(
        <div id='new-post-type-container'>
            <div className='type-buttons-container' style={{height: '200px', width: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '50px'}}>
                <img className='to-create-post-form-btn' style={{cursor: 'pointer'}} src="/photo_icon.png" alt="Image" onClick={handleSubmit}/>
                <img className='to-create-text-form-btn' style={{cursor: 'pointer'}} src="/text_icon.png" alt="Text" onClick={futureFeature}/>
            </div>
        </div>
    )

}