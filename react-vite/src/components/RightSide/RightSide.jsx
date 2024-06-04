// import {useState, useEffect} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {useNavigate} from 'react-router-dom';
// import './RightSide.css';


// export default function RightSide(){
//     const [isLoaded, setIsLoaded] = useState(false);
//     const dispatch = useDispatch();
//     const posts = useSelector(state => state.posts.posts);
//     const currentUser = useSelector(state => state.session.user);
//     const navigate = useNavigate();
//     const [randomPosts, setRandomPosts] = useState([]);


//     const futureFeature = () => {
//         alert('Feature under construction')
//     };

//     const handleHeaderClick = (userId) => {
//         navigate(`/user/${userId}/posts`);
//     };

//     const getRandomPosts = (posts, count) => {
//         const randomized = [...posts].sort(() => 0.5 - Math.random());
//         return randomized.slice(0, count);
//     };
//     const randomizedPosts = isLoaded ? getRandomPosts(posts.filter(post => post.poster_id !== (currentUser ? currentUser.id : null)), 5) : [];

//     const reshufflePosts = () => {
//         const newRandomized = getRandomPosts(posts, 5);
//         setRandomPosts(newRandomized);
//     }

//     const searchBar = (
//         <div className='search-bar-container'>
//             <div id='search-icon'>
//                 <img style={{height: '25px', width: '25px'}} src='/search_icon.png' alt='search_icon'/>
//             </div>
//             <input
//                 id='search-bar'
//                 type='search'
//                 style={{width: '200px'}}
//                 // value=''
//                 // onChange={}
//                 placeholder='Feature under construction'
//             />
//         </div>
//     );


//     return (
//         <div className='post-block-right'>
//           <h1>Test</h1>
//           {isLoaded && (
//             <div>
//               <div className='right-side-search-block'>
//                 <div className='search'>{searchBar}</div>
//               </div>
//               <h3 className='post-block-right-title'>Check out these blogs</h3>
//               <div className='post-block-right-list'>
//                 {randomizedPosts.map(obj => (
//                   <div className='post-block-right-features' key={obj.id} onClick={() => handleHeaderClick(obj.poster_id)} style={{ cursor: 'pointer' }}>
//                     <img className='poster-profpic' style={{ height: '50px', width: '50px', marginTop: '5px', marginRight: '5px' }} src={obj?.profile_pic || '/default_profpic.jpg'} alt='prof_pic' />
//                     <div className='post-block-right-textblock'>
//                       <p className='poster-username'>{obj.username}</p>
//                       <p className='poster-caption'>{obj.body ? obj.body : ``}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <button className='reshuffle-btn' onClick={reshufflePosts}>Show more blogs</button>
//             </div>
//           )}
//         </div>
//       )
// }