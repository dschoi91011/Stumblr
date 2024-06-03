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
                <button className='to-create-post-form-btn' style={{height: '30px', width: '100px'}} onClick={handleSubmit}>Image</button>
                <button className='to-create-text-form-btn' style={{height: '30px', width: '100px'}} onClick={futureFeature}>Text</button>
            </div>
        </div>
    )

}