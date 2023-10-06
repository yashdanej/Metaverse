import React, { useState } from "react";
import { Link } from "react-router-dom";
import './centerComponent.css'

import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';

import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Stories from "./Stories/Stories";
import { handleStory } from "../../../api";


const CenterComponent = ({previousStory, previousStoryfn, storyStatus, setStoryStatus, seenStory, story, setStory, handleDeleteComment, setChecked, theme, handleFollow, checked, addComment, postLiked, followingPost, handleProfileVisit, getLoggedUser}) => {
  const [flag, setFlag] = useState('');
  const [comment, setComment] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(null);
  let timeDifference;
  const displayTimeOfPost = (ele) => {
    const createdDate = new Date(ele);
    const currentDate = new Date();
    // Calculate the time difference in milliseconds
    timeDifference = currentDate.getTime() - createdDate.getTime();
  
    // Function to calculate the time difference in minutes, hours, days, weeks, or years
    const getTimeDifferenceString = () => {
      if (timeDifference < 60 * 1000) { // Less than 1 minute
        return `${Math.floor(timeDifference / 1000)} seconds ago`;
      } else if (timeDifference < 60 * 60 * 1000) { // Less than 1 hour
        return `${Math.floor(timeDifference / (60 * 1000))} minutes ago`;
      } else if (timeDifference < 24 * 60 * 60 * 1000) { // Less than 1 day
        return `${Math.floor(timeDifference / (60 * 60 * 1000))} hours ago`;
      } else if (timeDifference < 7 * 24 * 60 * 60 * 1000) { // Less than 1 week
        const daysAgo = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
        return daysAgo === 1 ? 'yesterday' : `${daysAgo} days ago`;
      } else if (timeDifference < 365 * 24 * 60 * 60 * 1000) { // Less than 1 year
        const weeksAgo = Math.floor(timeDifference / (7 * 24 * 60 * 60 * 1000));
        return weeksAgo === 1 ? '1 week ago' : `${weeksAgo} weeks ago`;
      } else { // More than 1 year
        const yearsAgo = Math.floor(timeDifference / (365 * 24 * 60 * 60 * 1000));
        return yearsAgo === 1 ? '1 year ago' : `${yearsAgo} years ago`;
      }
    };
    return getTimeDifferenceString();
  }

  const CommentOnPost = (id) => {
    addComment(id, comment);
    setFlag('');
  }
  const openDeleteModal = (postId) => {
    setDeleteModalOpen(postId);
  };
  const closeDeleteModal = () => {
    setDeleteModalOpen(null);
  };

  // story
  const seenApi = (story) => {
    handleStory(setStory);
  }
  console.log(story);
  return (
    <>
    <span style={{cursor: 'pointer'}} onClick={() => {setStoryStatus('new');handleStory(setStory);}} className={`fontSize12 ${theme?'lightText':''}`}>New</span>&nbsp;&nbsp;&nbsp;
    <span style={{cursor: 'pointer'}} onClick={() => {setStoryStatus('seen'); previousStoryfn()}} className={`fontSize12 ${theme?'lightText':''}`}>Seen</span>
    { storyStatus==='new'?
        (
          story.length!==0?
          (
            <>
              <div className="row p-2">
                {story?.map((ele) => {
                  return (
                    <Stories storyStatus={storyStatus} seenStory={seenStory} ele={ele} />
                  );
                })}
              </div>
            </>
          ):<p className={`fontSize12 ${theme?'lightText':''}`}>No story to show</p>
        ):
        (
          (
            previousStory.length>0?
            (
              <>
                <div className="row p-2">
                  {previousStory.map((ele) => {
                    return (
                      <Stories seenStory={seenStory} ele={ele} />
                    );
                  })}
                </div>
              </>
            ):<p className={`fontSize12 ${theme?'lightText':''}`}>No story to show</p>
          )
        )
    }
    
    {
      followingPost.length> 0? followingPost.map((ele) => {
        return (
          <>
          {checked ?( 
          <div className="row">
          <div className={`col-sm-6 marginInSmall ${theme?'divColor2':'divColor'}`}>
          <div className="row align-items-center">
            <div className="col-3 col-sm-2">
              <Link to='/profile'><img
                onClick={() => handleProfileVisit(ele.people._id)}
                src={`${ele.people.profilePic?.url}`}
                style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: 'cover' }}
                alt=""
              /></Link>
            </div>
            <div className={`col-6 col-sm-6`}>
            <Link className={`${theme?'lightText':''}`} style={{textDecoration:'none'}} to='/profile'><span onClick={() => handleProfileVisit(ele.people._id)} className={`profileName fontSize12`}>{ele.people.username} <span style={{fontWeight: '300', color: 'grey'}}>({displayTimeOfPost(ele.createdAt)})</span></span></Link>
              <br />
              <span className={`fontSize12 gill ${theme?'lightText':''} `}>Follower: {ele.people.follower.length !== undefined? ele.people.follower.length:'0'}, </span>{" "}
              <span className={`fontSize12 gill ${theme?'lightText':''} `}>Following: {ele.people.following.length !== undefined? ele.people.following.length:'0'}</span>
            </div>
            <div className="col-3 col-sm-4 d-flex justify-content-end">
              <Link to='/profile'><span onClick={() => handleProfileVisit(ele.people._id)} className={`btn fontSize12 visitProfileButton fw-bold ${theme?'lightText':''}`}>
                Visit
              </span></Link>
            </div>
          </div>

          <div className="post my-3">
            <div className={`card m-auto postCard ${theme?'backgroungCard colorPBorder':''}`}>
              <img src={`${ele.post?.url}`} className="card-img-top postCardImage" alt="..." />
              <div className="card-body">
                <span className={`card-text fontSize12 fw-bold ${theme?'lightText':''}`}>
                  {ele.caption} &nbsp;<span onClick={() => setFlag(flag===''?ele._id:'')} className="fontSize12 fw-light" style={{cursor: 'pointer', color: `${theme?'grey':''}`}}>({ele.comments.length === 1?'1 comment':`${ele.comments.length} comments`})</span>
                </span><br />
                <span style={{cursor: 'pointer'}} onClick={() => postLiked(ele._id)}>{ele.likes.includes(getLoggedUser[0]?.user?._id)?<i style={{color: '#eb271a'}} className="fa-solid fa-heart"></i>:<i className={`fa-regular fa-heart ${theme?'lightText':''}`}></i>}<span className={`px-1 fontHeartColor fontSize12 ${theme?'lightText':''}`}>{ele.likes.length}</span></span>
                <span className="mx-3"><i className={`fa-regular fa-comment fontHeartColor ${theme?'lightText':''}`}></i><span className={`px-1 fontHeartColor fontSize12 ${theme?'lightText':''}`}>{ele.comments.length}</span></span>
                <span onClick={() => setFlag(flag===''?ele._id:'')} className={`fontSize12 ${theme?'lightText':''}`} style={{cursor: 'pointer'}}>{flag==ele._id?'Close':'Add'} comment</span>
                {
                  flag==ele._id?(
                    <>
                  <div id="commentBox">
                    <div id="demo">
                      <FormControl>
                        <FormLabel
                          className={`${theme?'lightText':''}`}
                          sx={(theme) => ({
                            '--FormLabel-color': theme.vars.palette.primary.plainColor,
                          })}
                        >
                          You are writing comment
                        </FormLabel>
                        <Input
                          className={`${theme?'lightText backgroungCard colorBorder':''}`}
                          sx={{ '--Input-decoratorChildHeight': '45px' }}
                          placeholder="write a comment"
                          type="text"
                          required
                          onChange={x => setComment(x.target.value)}
                          endDecorator={
                            <Button className={`commentButton ${theme?'backgroundOfBtn':''}`}
                              variant="solid"
                              type="submit"
                              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                              onClick={() => CommentOnPost(ele._id)}
                            >
                              Comment
                            </Button>
                          }
                        />
                      </FormControl>
                    </div>
                  </div>
                  </>
                  ):
                  null
                }
              </div>
            </div>
          </div>
          </div>
          <div className={`col-sm-1 whiteSpaceColor ${theme?'whiteSpaceSecondColor':''}`}></div>
            <div className={`col-sm-5 widthHeight ${theme?'whiteSpaceFirstColor':''}`}>
            <span className={`fontSize12 ${theme?'lightText':''}`}>Comments <span>{ele.comments.length>0?`(${ele.comments.length})`:'(0)'}</span></span>
              {
                ele.comments.length > 0 &&
                  ele.comments.map((c) => {
                    return (
                      <>
                          <div className={`row align-items-center`}>
                            <div className="col-3 col-sm-2 py-2">
                              <img
                                src={`${c?.getPeople?.profilePic?.url}`}
                                style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: 'cover' }}
                                alt=""
                              />
                            </div>
                            <div className={`col-6 col-sm-7 `}>
                              <Link className={`textDeco ${theme?'lightText':''}`} to={`/profile`}><span onClick={() => handleProfileVisit(c?.getPeople?._id)} className="profileName fontSize12">{c?.getPeople?.username}</span></Link><span style={{ fontSize: '11px', color: 'grey'}} className='fontSmall'>&nbsp;&nbsp;({displayTimeOfPost(c.createdAt)})</span>
                              <br />
                              <span className={`fontSize12 gill ${theme?'lightText':''}`}>{c.comment}</span>&nbsp;
                              { c.getPeople?._id.includes(getLoggedUser[0]?._id) &&
                                <i onClick={() => openDeleteModal(c?._id)} style={{fontSize: '11px'}} className={`fa-solid fa-trash ${theme?'lightText':''}`}></i>
                              }
                              <Modal
                                open={deleteModalOpen === c?._id}
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
                                    Are you sure you want to delete this comment?
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
                                        handleDeleteComment(ele?._id, c?._id)
                                      }}
                                    >
                                      Delete Comment
                                    </Button>
                                  </Box>
                                </ModalDialog>
                            </Modal>
                            </div>
                            <div className='col-3 col-sm-3 d-flex justify-content-end'>
                              <button className='btn fontSize12 visitProfileButton'>
                              {c.getPeople._id == getLoggedUser[0]?._id
                              ?(
                                <span className={`btnProfileEdit ${theme?'lightText backgroundOfBtn':''}`}>Profile</span>
                              ):
                                <span style={{cursor: 'pointer'}} className={`btnProfileEdit ${theme?'lightText backgroundOfBtn':''}`} onClick={() => handleFollow(c.getPeople._id)}>
                              {
                                c?.getPeople?.follower.includes(getLoggedUser[0]?._id)
                                ?'Unfollow'
                                :(c?.getPeople?.following?.includes(getLoggedUser[0]?._id) && !c?.getPeople?.follower?.includes(getLoggedUser[0]?._id))?'Follow_back': 'Follow'
                              }
                              </span>
                              }
                              
                              </button>
                            </div>
                          </div>
                      </>
                    )
                  })
              }
            </div>
          </div>
        ):(
          <>
          <div className="row align-items-center">
            <div className="col-3 col-sm-2">
              <Link to='/profile'><img
                onClick={() => handleProfileVisit(ele.people._id)}
                src={`${ele.people.profilePic?.url}`}
                style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: 'cover' }}
                alt=""
              /></Link>
            </div>
            <div className="col-6 col-sm-6">
            <Link style={{textDecoration:'none'}} to='/profile'><span onClick={() => handleProfileVisit(ele.people._id)} className={`profileName fontSize12 ${theme?'lightText':''}`}>{ele.people.username} <span style={{fontWeight: '300', color: `${theme?'grey':''}`}}>({displayTimeOfPost(ele.createdAt)})</span></span></Link>
              <br />
              <span className={`fontSize12 gill ${theme?'lightText':''}`}>Follower: {ele.people.follower.length !== undefined? ele.people.follower.length:'0'}, </span>{" "}
              <span className={`fontSize12 gill ${theme?'lightText':''}`}>Following: {ele.people.following.length !== undefined? ele.people.following.length:'0'}</span>
            </div>
            <div className="col-3 col-sm-4 d-flex justify-content-end">
              <Link to='/profile'><span onClick={() => handleProfileVisit(ele.people._id)} className={`btn fontSize12 visitProfileButton fw-bold ${theme?'lightText':''}`}>
                Visit
              </span></Link>
            </div>
          </div>

          <div className="post my-3">
            <div className={`card m-auto postCard ${theme?'backgroungCard colorBorder':''}`}>
              <img src={`${ele.post?.url}`} className="card-img-top postCardImage" alt="..." />
              <div className="card-body">
                <span className={`card-text fontSize12 fw-bold ${theme?'lightText':''}`}>
                  {ele.caption} &nbsp;<span onClick={() => setFlag(flag===''?ele._id:'')} className="fontSize12 fw-light" style={{cursor: 'pointer', color: `${theme?'grey':''}`}}>({ele.comments.length === 1?'1 comment':`${ele.comments.length} comments`})</span>
                </span><br />
                <span style={{cursor: 'pointer'}} onClick={() => postLiked(ele._id)}>{ele.likes.includes(getLoggedUser[0]?.user?._id)?<i style={{color: '#eb271a'}} className="fa-solid fa-heart"></i>:<i className={`fa-regular fa-heart ${theme?'lightText':''}`}></i>}<span className={`px-1 fontHeartColor fontSize12 ${theme?'lightText':''}`}>{ele.likes.length}</span></span>
                <span className="mx-3"><i className={`fa-regular fa-comment fontHeartColor ${theme?'lightText':''}`}></i><span className={`px-1 fontHeartColor fontSize12 ${theme?'lightText':''}`}>{ele.comments.length}</span></span>
                <span onClick={() => setFlag(flag===''?ele._id:'')} className={`fontSize12 ${theme?'lightText':''}`} style={{cursor: 'pointer'}}>{flag==ele._id?'Close':'Add'} comment</span>
                {
                  ele.comments.length > 0 && ele.comments.map((c, index) => (
                    <div key={index}>
                      {index < 2 ? (
                        <div className="row align-items-center">
                          <div className="col-3 col-sm-2 py-2">
                            <img
                              src={`${c?.getPeople?.profilePic?.url}`}
                              style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: 'cover' }}
                              alt=""
                            />
                          </div>
                          <div className="col-6 col-sm-6">
                            <Link className={`textDeco ${theme?'lightText':''}`} to={`/profile`}>
                              <span onClick={() => handleProfileVisit(c?.getPeople?._id)} className="profileName fontSize12">
                                {c?.getPeople?.username}
                              </span>
                            </Link>
                            <span style={{ fontSize: '11px', color: 'grey' }} className="fontSmall">
                              &nbsp;&nbsp;({displayTimeOfPost(c.createdAt)})
                            </span>
                            <br />
                            <span className={`fontSize12 gill ${theme?'lightText':''}`}>{c.comment}</span>&nbsp;
                            { c.getPeople?._id.includes(getLoggedUser[0]?._id) &&
                                <i onClick={() => openDeleteModal(c?._id)} style={{fontSize: '11px'}} className={`fa-solid fa-trash ${theme?'lightText':''}`}></i>
                              }
                              <Modal
                                open={deleteModalOpen === c?._id}
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
                                    Are you sure you want to delete this comment?
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
                                        handleDeleteComment(ele?._id, c?._id)
                                      }}
                                    >
                                      Delete Comment
                                    </Button>
                                  </Box>
                                </ModalDialog>
                            </Modal>
                          </div>
                          <div className='col-3 col-sm-4 d-flex justify-content-end'>
                            <button className='btn fontSize12 visitProfileButton'>
                            {c.getPeople._id === getLoggedUser[0]?._id
                            ?(
                              <span className={`btnProfileEdit ${theme?'lightText backgroundOfBtn':''}`}>Profile</span>
                            ):
                              <span style={{cursor: 'pointer'}} className={`btnProfileEdit ${theme?'lightText backgroundOfBtn':''}`} onClick={() => handleFollow(c.getPeople._id)}>
                            {
                              c?.getPeople?.follower.includes(getLoggedUser[0]?._id)
                              ?'Unfollow'
                              :(c?.getPeople?.following?.includes(getLoggedUser[0]?._id) && !c?.getPeople?.follower?.includes(getLoggedUser[0]?._id))?'Follow_back': 'Follow'
                            }
                            </span>
                            }
                            </button>
                          </div>
                        </div>
                      ) : (
                        null
                      )}
                    </div>
                  ))
                }
                {ele.comments.length>2 && <div className="d-flex" style={{justifyContent: 'space-between'}}><p className={`fontSize12 ${theme?'lightText':''}`}>Comments read limt reached</p> <p style={{cursor: 'pointer'}} onClick={()=>{setChecked(true)}} className={`fontSize12 ${theme?'lightText':''}`}>See more...</p></div>}
                {
                  flag==ele._id?(
                    <>
                  <div id="commentBox">
                    <div id="demo">
                      <FormControl>
                        <FormLabel
                          className={`${theme?'lightText':''}`}
                          sx={(theme) => ({
                            '--FormLabel-color': theme.vars.palette.primary.plainColor,
                          })}
                        >
                          You are writing comment
                        </FormLabel>
                        <Input
                          className={`${theme?'lightText backgroungCard':''}`}
                          sx={{ '--Input-decoratorChildHeight': '45px' }}
                          placeholder="write a comment"
                          type="text"
                          required
                          onChange={x => setComment(x.target.value)}
                          endDecorator={
                            <Button className={`commentButton ${theme?'backgroundOfBtn':''}`}
                              variant="solid"
                              type="submit"
                              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                              onClick={() => CommentOnPost(ele._id)}
                            >
                              Comment
                            </Button>
                          }
                        />
                      </FormControl>
                    </div>
                  </div>
                  </>
                  ):
                  null
                }
              </div>
            </div>
          </div>
          </>
        )
        }
        </>
        )
      }):<span className={`fontSize12 ${theme?'lightText':''}`}>No post to show</span>
    }
    </>
  );
};

export default CenterComponent;
