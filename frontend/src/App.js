import './App.css';
import Auth, { isLogin } from './pages/auth/Auth';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AuthBoxes from './components/auth/AuthBoxes';
import { useEffect, useRef, useState } from 'react';
import Navbar from './components/navbar/Navbar';
import Dashboard from './pages/dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { AddPostOfUser, AddStoryOfUser, CommentedPost, FollowHandle, getAllSuggetionPeoples, getFollowingPost, getFollowingUser, getLoggedInformation, getLoggedUserPost, getUserProfile, handleMyStory, HandlePostComment, HandlePostDelete, handleSeen, handleStory, LikedThePost, previousStoryfun, ProfileUpdate } from './api';
import Profile from './pages/profile/Profile';
import Chat from './pages/chat/Chat';
import 'react-notifications/lib/notifications.css';

function App() {
  const location = useLocation();
  const [url, setUrl] = useState('');
  const checkboxRef = useRef(null);
  const [secondDesign, setSecondDesign] = useState(false)
  const [getLoggedUser, setGetLoggedUser] = useState([])
  const [allSuggetion, setAllSuggetion] = useState([])
  const [followingPost, setFollowingPost] = useState([])
  const [followingUser, setFollowingUser] = useState([])
  const [loggedUserPost, setLoggedUserPost] = useState([])
  const [checked, setChecked] = useState(false);
  const [getUserId, setGetUserId] = useState('')
  const [getProfile, setGetProfile] = useState([])
  const [theme, setTheme] = useState(false)
  const [story, setStory] = useState([]);
  const [myStory, setMyStory] = useState([]);
  const [previousStory, setPreviousStory] = useState([]);
  const [storyStatus, setStoryStatus] = useState('new');


  const changeTheme = () => {
    setTheme(!theme);
  }

  const navigate = useNavigate();
  useEffect(() => {
    if(isLogin()){
      navigate('/');
    }else{
      navigate('/login');
    }
  }, [isLogin])

  const handleProfileVisit = (id) => {
    setGetUserId(id);
  }

  const handleCheckboxChange = () => {
    setSecondDesign(checkboxRef.current.checked);
  };

 const handlePostChange = (postFile, caption) => {
  AddPostOfUser(postFile, caption)
  .then(() => {
    getLoggedUserPost(setLoggedUserPost);
  })
  .catch((err) => {
  });
 }

 const handleStoryChange = (postFile) => {
  AddStoryOfUser(postFile)
  .then(() => {
    getLoggedUserPost(setLoggedUserPost);
  })
  .catch((err) => {
  });
 }

 const handleProfileUpdate = (bio, profilePic, location, id) => {
  ProfileUpdate(bio, profilePic, location, id)
  .then(() => {
    getLoggedInformation(setGetLoggedUser);
  })
  .catch((err) => {
  });
 }
// Like the post
 const postLiked = (postId) => {
  LikedThePost(postId)
  .then(() => {
    getFollowingPost(setFollowingPost);
    getUserProfile(setGetProfile, getUserId);
  })
  .catch((err) => {
  });;
 }

 // Add comment on post
 const addComment = (postId, comment) => {
  CommentedPost(postId, comment)
  .then(() => {
    getFollowingPost(setFollowingPost);
    getUserProfile(setGetProfile, getUserId);
  })
  .catch((err) => {
  });;
 }

  const handleFollow = (userId) => {
    FollowHandle(userId)
      .then((message) => {
        getLoggedInformation(setGetLoggedUser);
        getAllSuggetionPeoples(setAllSuggetion);
        getFollowingPost(setFollowingPost);
        getUserProfile(setGetProfile, getUserId);
      })
      .catch((error) => {
        console.error("Error following user:", error);
      });
  };
  const handleDeletePost = (postId) => {
    HandlePostDelete(postId);
    getLoggedUserPost(setLoggedUserPost);
  }
  const handleDeleteComment = (postId, commentId) => {
    HandlePostComment(postId, commentId);
    getFollowingPost(setFollowingPost);
    getUserProfile(setGetProfile, getUserId);
  }
  const MyStory = (setMyStory) => {
    handleMyStory(setMyStory);
    getLoggedUserPost(setLoggedUserPost);
  }
  const seenStory = (id) => {
    handleSeen(id);
    handleStory(setStory);
  }

  const previousStoryfn = () => {
    previousStoryfun(setPreviousStory);
  }
  
  useEffect(() => {
    setUrl(location.pathname);
    if(url !== '/signup' || url !== '/login'){
      getLoggedInformation(setGetLoggedUser);
      getAllSuggetionPeoples(setAllSuggetion);
      getFollowingPost(setFollowingPost);
      getLoggedUserPost(setLoggedUserPost);
      getFollowingUser(setFollowingUser);
      getUserProfile(setGetProfile, getUserId);
      handleStory(setStory);
      MyStory(setMyStory);
    }
  }, [location, getUserId]);
  const isSignupOrLoginPath = url === '/signup' || url === '/login';
  return (
    <div className={`${theme?'body2':'body'}`}>
    {!isSignupOrLoginPath && <Navbar setTheme={setTheme} themeset={theme} changeTheme={changeTheme} setChecked={setChecked} checked={checked} />}
    <Routes> 
      <Route exact path="/signup" element={
        secondDesign?(
          <div className='alignItems d-flex container justify-content-between'>
          {
            url==='/signup'?
            <AuthBoxes active={url==='/signup'?true:false} header='Sign up' content='Register' content2=' Wanna make new friends?' page='Sign up page' progress='0%'/>
            :
            <AuthBoxes active={url==='/login'?true:false} header='Log in' content='Login' content2="Wanna be extrovert?" page='Log in page' progress='50%'/>
          }
            <Auth secondDesign={secondDesign} checkboxRef={checkboxRef} handleCheckboxChange={handleCheckboxChange} path='signup' />
          </div>
        ):
        <>
        <div className='authBox'>
            <div className="container mt-5 mb-3">
                <div className="row justify-content-around">
                    <AuthBoxes active={url==='/signup'?true:false} header='Sign up' content='Register' content2=' Wanna make new friends?' page='Sign up page' progress='0%'/>
                    <AuthBoxes active={url==='/login'?true:false} header='Log in' content='Login' content2="Wanna be extrovert?" page='Log in page' progress='50%'/>
                    <AuthBoxes active={url==='/dashboard'?true:false} header='Dashboard' content='Dashbard' content2="Let's make new friends" page='Dashboard page' progress='100%'/>
                </div>
            </div>
        </div>
        <Auth checkboxRef={checkboxRef} handleCheckboxChange={handleCheckboxChange} path='signup' />
        </>
      } />
      <Route exact path="/login" element={
        secondDesign?(
          <div className='alignItems d-flex container justify-content-between'>
          {
            url==='/signup'?
            <AuthBoxes active={url==='/signup'?true:false} header='Sign up' content='Register' content2=' Wanna make new friends?' page='Sign up page' progress='0%'/>
            :
            <AuthBoxes active={url==='/login'?true:false} header='Log in' content='Login' content2="Wanna be extrovert?" page='Log in page' progress='50%'/>
          }
            <Auth secondDesign={secondDesign} checkboxRef={checkboxRef} handleCheckboxChange={handleCheckboxChange} path='login' />
          </div>
        ):
        <>
        <div className='authBox'>
          <div className="container mt-5 mb-3">
              <div className="row justify-content-around">
                  <AuthBoxes active={url==='/signup'?true:false} header='Sign up' content='Register' content2=' Wanna make new friends?' page='Sign up page' progress='0%'/>
                  <AuthBoxes active={url==='/login'?true:false} header='Log in' content='Login' content2="Wanna be extrovert?" page='Log in page' progress='50%'/>
                  <AuthBoxes active={url==='/dashboard'?true:false} header='Dashboard' content='Dashbard' content2="Let's make new friends" page='Dashboard page' progress='100%'/>
              </div>
          </div>
      </div>
      <Auth checkboxRef={checkboxRef} handleCheckboxChange={handleCheckboxChange} path='login' />
    </>
      } />
      <Route element={<PrivateRoute />}>
        <Route exact path='/' element={<Dashboard previousStory={previousStory} previousStoryfn={previousStoryfn} storyStatus={storyStatus} setStoryStatus={setStoryStatus} seenStory={seenStory} myStory={myStory} handleStoryChange={handleStoryChange} setStory={setStory} story={story} handleDeleteComment={handleDeleteComment} handleDeletePost={handleDeletePost} setChecked={setChecked} theme={theme} addComment={addComment} postLiked={postLiked} handleProfileUpdate={handleProfileUpdate} checked={checked} handlePostChange={handlePostChange} loggedUserPost={loggedUserPost} followingPost={followingPost} handleProfileVisit={handleProfileVisit} handleFollow={handleFollow} getLoggedUser={getLoggedUser} allSuggetion={allSuggetion} />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route exact path={`/profile`} element={<Profile myStory={myStory} followingUser={followingUser} setGetUserId={setGetUserId} theme={theme} getProfile={getProfile} postLiked={postLiked} handleProfileUpdate={handleProfileUpdate} loggedUserPost={loggedUserPost} handleProfileVisit={handleProfileVisit} getUserId={getUserId} handleFollow={handleFollow} getLoggedUser={getLoggedUser} allSuggetion={allSuggetion} />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route exact path={`/chat`} element={<Chat followingUser={followingUser} setChecked={setChecked} theme={theme} handleFollow={handleFollow} checked={checked} addComment={addComment} postLiked={postLiked} handleProfileVisit={handleProfileVisit} followingPost={followingPost} getLoggedUser={getLoggedUser} />} />
      </Route>
    </Routes>
    </div>
  );
}

export default App;