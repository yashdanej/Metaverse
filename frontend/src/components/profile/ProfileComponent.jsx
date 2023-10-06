import React, { useState } from 'react'
import Post from './post/Post';
import './profileContainer.css'
import { Link } from "react-router-dom";

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Typography from '@mui/joy/Typography';

export function MessageComponent({open, setOpen}) {
    
    return (
      <React.Fragment>
        <Modal open={open} onClose={() => setOpen(false)}>
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
              You can't send message
            </Typography>
            <Divider />
            <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
              You fool🤡, this is not your friend!
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
              <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="solid" color="danger" onClick={() => setOpen(false)}>
                Absolutely Cancel🙃
              </Button>
            </Box>
          </ModalDialog>
        </Modal>
      </React.Fragment>
    );
  }

const ProfileComponent = ({followingUser, theme, setGetUserId, postLiked, getProfile, loggedId, userId, handleFollow}) => {
    const [open, setOpen] = useState(false);
    const isFollowingEachOther =
    getProfile.length >= 1 &&
    getProfile[0]?.people?.follower.includes(loggedId) &&
    getProfile[0]?.people?.following?.includes(loggedId);
  return (
    <>
        <div className="profileCt">
            <div className="p-3">
            <Link className={`${theme?'lightText':''}`} style={{textDecoration: 'none'}} to='/' onClick={()=>setGetUserId('')}><span className='backColor' style={{cursor: 'pointer'}}>BACK</span></Link>
                <div className="row">
                    <div className="col-sm-4 text-end">
                        <img style={{width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%'}} src={`${getProfile && getProfile.length>=1? getProfile[0].people.profilePic?.url: getProfile.profilePic?.url}`} alt="" />
                    </div>
                <div className="col-sm-8 px-3">
                        <div>
                            <span style={{fontSize: '14px'}} className={`fw-bold mx-2 fontSizeLarge ${theme?'lightText':''}`}>{getProfile && getProfile.length>=1? getProfile[0].people?.username: getProfile.username}</span>
                            <span style={{cursor: 'pointer'}} className={`btnProfileEdit fontSizeLarge ${theme?'lightText backgroundOfBtn':''}`} onClick={() => getProfile && getProfile.length>=1? handleFollow(getProfile[0].people?._id): getProfile._id}>
                            {
                                getProfile && getProfile?.length >= 1 &&
                                    getProfile[0]?.people?.follower.includes(loggedId)
                                    ?'Unfollow'
                                    :(getProfile[0]?.people?.following?.includes(loggedId) && !getProfile[0].people?.follower?.includes(loggedId))?'Follow back': 'Follow'
                            }
                            </span>
                            {
                                isFollowingEachOther?
                                (
                                    <Link to='/chat'><span style={{cursor: 'pointer', textDecoration: 'none'}} className={`btnProfileEdit ${theme?'lightText backgroundOfBtn':''}`}>Message</span></Link>
                                ):
                                <span style={{cursor: 'pointer'}} onClick={()=>setOpen(true)} className={`btnProfileEdit ${theme?'lightText backgroundOfBtn':''}`}>Message</span>
                            }
                        </div>
                        <div style={{fontSize: '14px'}} className='my-3 mx-2'>
                            <span className={`${theme?'lightText':''} fontSizeL`} style={{marginRight: '1rem'}}><span className='fw-bold fontSizeL'>{getProfile && getProfile?.length >= 1 ? `0${getProfile?.length}`:'00'}</span> posts</span>
                            <span className={`mx-2 ${theme?'lightText':''} fontSizeL`}><span className='fw-bold fontSizeL'>{getProfile && !getProfile.length ? `0${getProfile?.follower?.length}` : getProfile?.length >= 1 ? `0${getProfile[0]?.people?.follower?.length}`:'00'}</span> followers</span>
                            <span className={`mx-2 ${theme?'lightText':''} fontSizeL`}><span className='fw-bold fontSizeL'>{getProfile && !getProfile.length ? `0${getProfile?.following?.length}` : getProfile?.length >= 1 ? `0${getProfile[0]?.people?.following?.length}`:'00'}</span> following</span>
                        </div>
                        <div style={{fontSize: '12px'}} className='my-3 mx-2'>
                            <span style={{marginRight: '1rem'}} className={`fw-bold ${theme?'lightText':''}`}>{getProfile && getProfile.length>=1? getProfile[0].people?.username: getProfile.username} <span className='fw-light'>{getProfile && getProfile.length>=1? `(${getProfile[0].people?.location})`: `(${getProfile.location})`}</span></span><br />
                            <span className={`metaSubColor ${theme?'lightText':''}`}>Hobby</span><br />
                            <span className={`${theme?'lightText':''}`}>{getProfile && getProfile.length>=1? getProfile[0].people?.bio: getProfile.bio}</span><br />
                            <span className={`${theme?'lightText':''}`}><span className={`fw-bold ${theme?'lightText':''}`}>{getProfile && !getProfile.length ? `0${getProfile?.following?.length}` : getProfile?.length >= 1 ? `0${getProfile[0]?.people?.following?.length}`:'00'}</span> following</span>
                        </div>
                        
                    </div>
                </div>
                <hr style={{marginBottom: '5px', border: `${theme?'0.5px solid #f5f5f5bb':''}`}} />
                    <div className='text-center'>
                        <span className={`mx-4 fw-bold borderTop p-1 ${theme?'lightText borderTopColor':''}`}>POSTS</span>
                        <span className={`mx-4 ${theme?'lightText':''}`}>REELS</span>
                        <span className={`mx-4 ${theme?'lightText':''}`}>TAGGED</span>
                    </div>
                <div className="row my-4">
                    {
                        getProfile.length>=1?
                        (
                            getProfile.map((ele) => {
                                return (
                                    <Post theme={theme} userId={userId} postLiked={postLiked} ele={ele} />
                                )
                            })
                        ):
                        <span className={`${theme?'lightText':''} fontSize12`}>{'No post to show<3'}</span>
                    }
                </div>
            </div>
        </div>
        <MessageComponent open={open} setOpen={setOpen} />
    </>
  )
}

export default ProfileComponent
