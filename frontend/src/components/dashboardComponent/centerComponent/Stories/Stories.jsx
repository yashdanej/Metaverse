import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { handleSeen } from '../../../../api';
const Stories = ({ storyStatus, seenStory, ele }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    seenStory(ele?._id)
    setOpen(false)
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    p: 4,
  };
  return (
    <>
      <div style={{margin: 'auto'}} className="col-sm-2 col-md-3 col-xs-6">
        <img
          src={ele?.people?.profilePic?.url}
          width="65px"
          height="65px"
          style={{ borderImageRepeat: 'round', borderImageOutset: '2px', borderImageSlice: '1', backgroundImage: 'linear-gradient(to right, violet, indigo, blue, green, yellow, orange, red)', borderImageWidth: '2px', objectFit: 'cover', borderRadius: '50%', cursor: 'pointer' }}
          alt=""
          onClick={handleOpen}
        />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <img
          src={ele?.story?.url}
          style={{ width: '500px', objectFit: 'cover', borderRadius: '25' }}
          alt=""
          onClick={handleOpen}
        />
        </Box>
      </Modal>
    </>
  );
};

export default Stories;
