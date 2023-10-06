import React, { useState } from 'react'
import { BACKEND_URL } from '../../../constant';
import Friends from './friendsList/Friends'
import './rightComponent.css'
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import axios from 'axios';
import { AddPostOfUser } from '../../../api';

export function FormDialog({handlePostChange, open, setOpen}) {
  const [postFile, setPostFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const handleClose = () => {
    setOpen(false);
    setPreviewImage(null);
  };
  const handlePost = () => {
    if (postFile && caption) {
      handlePostChange(postFile, caption)
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
        <DialogTitle className='fw-bold'>Add Post</DialogTitle>
        <DialogContent>
          <DialogContentText className=''>
            <span style={{fontSize: '13px'}}>If you post this then it can be seen by your following people!!! Are you comfortable??? If you are not comfortable with it and want to add this to private, I WILL NOT!!!</span>
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
        <Button color="secondary" variant="contained" component="span">
        Upload Pic
        </Button>{" "}
      </label>
      {previewImage?<img className='my-2' src={previewImage} width='100%' alt="Preview" />:<span className='fontSize12'>&nbsp;&nbsp;No selected image</span>}
        <br />
        <br />
      <span className='captionnn'><ClosedCaptionIcon/>Caption:   &nbsp;&nbsp;<TextField onChange={x => setCaption(x.target.value)} id="filled-basic" label="Filled" variant="filled" /></span>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePost}>Post</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function Story({handlePostChange, open, setOpen}) {
  const [postFile, setPostFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const handleClose = () => {
    setOpen(false);
    setPreviewImage(null);
  };
  const handlePost = () => {
    if (postFile) {
      handlePostChange(postFile)
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
        <DialogTitle className='fw-bold'>Add Story</DialogTitle>
        <DialogContent>
          <DialogContentText className=''>
            <span style={{fontSize: '13px'}}>If you post this then it can be seen by your people!!! Are you comfortable??? If you are not comfortable with it and want to add this to private, I WILL NOT!!!</span>
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
        <Button color="secondary" variant="contained" component="span">
        Upload Pic
        </Button>{" "}
      </label>
      {previewImage?<img className='my-2' src={previewImage} width='100%' alt="Preview" />:<span className='fontSize12'>&nbsp;&nbsp;No selected image</span>}
        <br />
        <br />
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePost}>Story</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const RightComponent = ({ handleStoryChange, theme, handlePostChange, handleProfileVisit, allSuggetion, handleFollow, getLoggedUser }) => {
  const [open, setOpen] = useState(false);
  const [story, setStory] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickStory = () => {
    setStory(true);
  };

  
  const handleFollowClick = (userId) => {
    handleFollow(userId);
  };
  return (
    <div>
      <div className={`row profileBlock align-items-center ${theme?'colorBottomBorder':''}`}>
        <div className="gill fontSize12 py-2"><span className={`${theme?'lightText':''}`}>You can also add a post!!! and if you want to add post click on <span onClick={handleClickOpen} style={{cursor: 'pointer', color: '#eb271a'}}>Add Post</span> <i onClick={handleClickOpen} style={{cursor: 'pointer', color: '#eb271a'}} className="fa-solid fa-square-plus"></i></span></div>
        <div className="gill fontSize12 py-2"><span className={`${theme?'lightText':''}`}>You can also add a story!!! and if you want to add story click on <span onClick={handleClickStory} style={{cursor: 'pointer', color: '#eb271a'}}>Add Story</span> <i onClick={handleClickStory} style={{cursor: 'pointer', color: '#eb271a'}} className="fa-solid fa-square-plus"></i></span></div>
      </div>

        <div className="suggetions py-3">
            <h5 className={`fw-bold ${theme?'lightText':''}`}>Suggetion List</h5>
            <div className="row align-items-center">
            {allSuggetion && allSuggetion.length > 0 ? (
            allSuggetion.map((ele) => {
              return (
                <Friends loggedId={getLoggedUser[0]?._id} theme={theme} handleProfileVisit={handleProfileVisit} key={ele.user_id} ele={ele} handleFollowClick={handleFollowClick} />
              );
            })
          ) : (
            <span className={`${theme?'lightText':''}`}>No suggestions to show</span>
          )}
            </div>
        </div>
        <FormDialog open={open} handlePostChange={handlePostChange} setOpen={setOpen} />
        <Story open={story} handlePostChange={handleStoryChange} setOpen={setStory} />
    </div>
  )
}

export default RightComponent
