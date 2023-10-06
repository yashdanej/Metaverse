import React from 'react';
import { useState } from 'react';
import Following from './friends/Following';
import './leftComponent.css';

import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';


import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

export function FormDialog({loggedId, handleProfileUpdate, open, setOpen}) {
  const [postFile, setPostFile] = useState(null);
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const handleClose = () => {
    setOpen(false);
    setPreviewImage(null);
  };
  const handlePost = () => {
    if (bio && postFile && location) {
      handleProfileUpdate(bio, postFile, location, loggedId)
      handleClose();
      setPreviewImage(null);
    } else {
      alert('All fields are required!!!')
    }
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPostFile(file);

    // Preview the selected image
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className='fw-bold'>Edit Profile</DialogTitle>
        <DialogContent>
          <DialogContentText className=''>
            <span style={{fontSize: '13px'}}>You know? you can update your profile too!!!</span>
          </DialogContentText>
          <label htmlFor="upload-photo">
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo"
          type="file"
          onChange={handleFileChange}
        />
        <br />
        <Button style={{background: '#9c27b0', color: 'white', paddingLeft: '25px', paddingRight: '25px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} color="secondary" variant="contained" component="span">
        Profile Pic
        </Button>{" "}
      </label>
      {previewImage?<img className='my-2' src={previewImage} width='100%' alt="Preview" />:<span className='fontSize12'>&nbsp;&nbsp;No selected image</span>}
        <br />
        <br />
      <span className='captionnn'><i className="fa-solid fa-address-card fa-flip"></i>Bio:   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<TextField onChange={x => setBio(x.target.value)} id="filled-basic" label="Your bio" variant="filled" /></span>
      <span className='captionnn'><i className="fa-solid fa-earth-europe">&nbsp;</i>Location:   &nbsp;&nbsp;<TextField onChange={x => setLocation(x.target.value)} id="filled-basic" label="Your location" variant="filled" /></span>
        </DialogContent>
        
        <DialogActions>
          <Button style={{background: 'none'}} className='text-primary' onClick={handleClose}>Cancel</Button>
          <Button style={{background: 'none'}} className='text-primary' onClick={handlePost}>Post</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function LayoutModalDialog({flag = false, handleFollow, handleProfileVisit, layout, getLoggedUser, setLayout}) {
  return (
    <React.Fragment>
      <Modal open={!!layout} onClose={() => setLayout(undefined)}>
        <ModalDialog
          aria-labelledby="layout-modal-title"
          aria-describedby="layout-modal-description"
          layout={layout}
        >
        <Typography id="layout-modal-title" component="h2">
            {!flag?'Following':'Follower'} list
          </Typography>
          <ModalClose />
          {flag == false ? (
          <div className="followingModal row align-items-center">
          {
            getLoggedUser[0]?.following?.length > 0 ? (
              <>
             { getLoggedUser[0].following.map((ele) => (
                <Following key={ele._id} loggedId={getLoggedUser[0]?._id} handleProfileVisit={handleProfileVisit} ele={ele} handleFollow={handleFollow} />
              ))}
              </>
            ) : (
              <span className='fontSize12'>Don't be introvert!!! let's make new friends</span>
            )
          }
        </div>
          ):(
            <div className="followingModal row align-items-center">
          {
            getLoggedUser[0]?.follower?.length > 0 ? (
              <>
             { getLoggedUser[0].follower.map((ele) => (
                <Following thisFlag={true} loggedId={getLoggedUser[0]?._id} key={ele._id} handleProfileVisit={handleProfileVisit} ele={ele} handleFollow={handleFollow} />
              ))}
              </>
            ) : (
              <span className='fontSize12'>Don't be introvert!!! let's make new friends</span>
            )
          }
        </div>
          )
          }
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

const LeftComponent = ({myStory, handleDeletePost, theme, handleProfileUpdate, loggedUserPost, handleProfileVisit, getLoggedUser, handleFollow }) => {
  const [layout, setLayout] = React.useState(undefined);
  const [follow, setFollow] = useState('Following')
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(true);
  };
  const handleFollower = () => {
    setLayout('center');
    setFlag(true);
  }
  const handleFollowing = () => {
    setLayout('center')
    setFlag(false);
  }
  const openDeleteModal = (postId) => {
    setDeleteModalOpen(postId);
  };
  const closeDeleteModal = () => {
    setDeleteModalOpen(null);
  };
  const [sopen, setSOpen] = React.useState(false);
  const handleOpen = () => setSOpen(true);
  const handleClose = () => setSOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    p: 4,
  };
  return (
    <div className='leftComponent'>
      <div className={`row profileBlock align-items-center ${theme?'colorBottomBorder':''}`}>
        <div className="col-3 col-sm-3">
          <img onClick={handleOpen} src={`${getLoggedUser[0]?.profilePic?.url}`} style={{ cursor: 'pointer', borderImageRepeat: myStory.length>0?'round':'', borderImageOutset: myStory?.length>0?'2px':'', borderImageSlice: myStory?.length>0?'1':'', backgroundImage: myStory?.length>0?'linear-gradient(to right, violet, indigo, blue, green, yellow, orange, red)':'', borderImageWidth: myStory.length>0?'2px':'', width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} alt="" />
        </div>
        <div className="col-6 col-sm-6">
          <span className={`profileName fontSize12 ${theme?'lightText':''}`}>{getLoggedUser[0]?.user?.username}</span><br />
          <span onClick={() => handleFollower()} style={{cursor: 'pointer'}} className={`${theme?'lightText':''} fontSize12 gill`}>Follower: {getLoggedUser[0]?.follower?.length !== undefined ? getLoggedUser[0]?.follower?.length : '0'}, </span>
          <span onClick={() => handleFollowing()} style={{cursor: 'pointer'}} className={`${theme?'lightText':''} fontSize12 gill`}>Following: {getLoggedUser[0]?.following?.length !== undefined ? getLoggedUser[0]?.following?.length : '0'}</span>
        </div>
        <div style={{textAlign: 'end'}} className="col-3 col-sm-3">
          <span className={`${theme?'lightText':''} fontSize12 gill btn fontSize12 visitProfileButton fw-bold`}>Profile</span>
        </div>
        <div className="afterProfileBlock">
          <div className='pt-2'><span><i className={`fa-brands fa-gg-circle ${theme?'lightText':''}`}></i><span className={`px-2 fontSize12 gill ${theme?'lightText':''} `}>{getLoggedUser[0]?.bio !== '' ? getLoggedUser[0]?.bio : 'No bio'}</span></span></div>
          <p><i className={`fa-solid fa-location-dot ${theme?'lightText':''}`}></i><span className={`px-2 fontSize12 gill ${theme?'lightText':''} `}>{getLoggedUser[0]?.location !== '' ? getLoggedUser[0]?.location : 'Somewhere on earth'}</span></p>

          <div className="row">
            <div className="col-6 col-sm-6"><button onClick={handleClickOpen} className={`btn px-4 btnProfileEditShare fontSize12 fw-bold ${theme?'lightText backgroundOfBtn':''}`}>Edit profile</button></div>
            <div className="col-6 col-sm-6"><button className={`btn px-4 btnProfileEditShare fontSize12 fw-bold ${theme?'lightText backgroundOfBtn':''}`}>Share_profile</button></div>
          </div>
        </div>

      </div>
      <Modal
        open={sopen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <img
          src={myStory[0]?.story?.url}
          style={{ width: '500px', objectFit: 'cover', borderRadius: '25' }}
          alt=""
          onClick={handleOpen}
        />
        </Box>
      </Modal>
        {loggedUserPost.length>0 && <p className={`gill fontSize12 fw-bold my-2 ${theme?'lightText':''}`}>Your post ({loggedUserPost.length})</p>}
      {
        loggedUserPost.length>0?
        (
          loggedUserPost.map((ele) => {
            return (
              <div className={`card m-auto postCard my-3 ${theme?'backgroungCard colorBorder':''}`}>
              <img src={`${ele.post?.url}`} className="card-img-top postCardImage" alt="..." />
              <div className={`card-body ${theme?'backgroungCard':''}`}>
                <span className={`card-text fontSize12 fw-bold ${theme?'lightText':''}`}>
                  {ele.caption}
                </span><br />
                <span className=""><i className={`fa-regular fa-heart fontHeartColor ${theme?'lightText':''}`}></i><span className={`px-1 fontHeartColor fontSize12 ${theme?'lightText':''}`}>{ele.likes.length}</span></span>
                <span className="mx-3"><i className={`fa-regular fa-comment fontHeartColor ${theme?'lightText':''}`}></i><span className={`px-1 fontHeartColor fontSize12 ${theme?'lightText':''}`}>{ele.comments.length}</span></span>
                <span>
              <Button
                variant="outlined"
                color="danger"
                endDecorator={<DeleteForever />}
                onClick={() => openDeleteModal(ele._id)}
              >
                Delete
              </Button>
              <Modal
                open={deleteModalOpen === ele._id}
                onClose={closeDeleteModal}
              >
                <ModalDialog
                  variant="outlined"
                  role="alertdialog"
                  aria-labelledby="alert-dialog-modal-title"
                  aria-describedby="alert-dialog-modal-description"
                >
                  <Typography
                    id="alert-dialog-modal-title"
                    level="h2"
                    startDecorator={<WarningRoundedIcon />}
                  >
                    Confirmation
                  </Typography>
                  <Divider />
                  <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
                    Are you sure you want to delete this post?
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                    <Button variant="plain" color="neutral" onClick={closeDeleteModal}>
                      Cancel
                    </Button>
                    <Button
                      variant="solid"
                      color="danger"
                      onClick={() => {
                        closeDeleteModal();
                        handleDeletePost(ele._id);
                      }}
                    >
                      Delete Post
                    </Button>
                  </Box>
                </ModalDialog>
              </Modal>
            </span>
              </div>
            </div>
            )
          })
        ):
        (
        <>
          <p className={`gill fontSize12 fw-bold ${theme?'lightText':''}`}>No post to show</p>
          <div className="posterbatman pt-3">
            <img style={{ width: '100%', objectFit: 'cover', borderRadius: '20px' }} src="/Images/batman.jpg" alt="" />
          </div>
        </>
        )
      }
      <LayoutModalDialog flag={flag} handleProfileVisit={handleProfileVisit} handleFollow={handleFollow} getLoggedUser={getLoggedUser} layout={layout} setLayout={setLayout} />
      <FormDialog loggedId={getLoggedUser[0]?._id} open={open} handleProfileUpdate={handleProfileUpdate} setOpen={setOpen} />
      
    </div>
  );
};

export default LeftComponent;
