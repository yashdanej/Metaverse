import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getLoggedInformation } from '../../api'
import { logOut } from '../../pages/auth/Auth'
import './navbar.css'
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import Switch, { switchClasses } from '@mui/joy/Switch';


const options = ['Visit_Profile', 'LogOut']
function SimpleDialog(props) {
  const { onClose, selectedValue, open, getLoggedUser, setTheme } = props;
  const navigate = useNavigate();
  const handleProfile = () => {
      logOut().then((response) => {
        if(response.success){
          setTheme(false);
          navigate('login');
        }else{
        }
      });
  }
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set your account bruh!</DialogTitle>
      <List sx={{ pt: 0 }}>
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleListItemClick('Visit Profile')}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Visit Profile' />
            </ListItemButton><br />
          </ListItem>
          <ListItem disableGutters>
          <ListItemButton onClick={() => {handleListItemClick('Logout')}}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText onClick={handleProfile} primary='Logout' />
            </ListItemButton>
          </ListItem>
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('addAccount')}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

const Navbar = ({setTheme, themeset, changeTheme, setChecked, checked}) => {
  const [getLoggedUser, setGetLoggedUser] = useState([])
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(options[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  useEffect(() => {
    getLoggedInformation(setGetLoggedUser);
  }, [])
  
  return (
    <>
      <div className={`${themeset?'__navbar _navbar':'__navbar'}`}>
      
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <Link style={{textDecoration: 'none', color: `${!themeset?'#191920':'#ffffffe8'}`}} to='/'><h1>Metaverse</h1></Link>
            </div>
            <div className="col-sm-6">
              <div className="d-flex alignItems">
              <Switch
                id='switchClass'
                  checked={checked}
                  onChange={(event) => setChecked(event.target.checked)}
                  sx={(theme) => ({
                    '--Switch-thumbShadow': `0 3px 7px 0 ${themeset?'#0c0c0d':'#0c0c0d'}`,
                    '--Switch-thumbSize': '27px',
                    '--Switch-trackWidth': '51px',
                    '--Switch-trackHeight': '31px',
                    '--Switch-trackBackground': '#e6e7e9',
                    [`& .${switchClasses.thumb}`]: {
                      transition: 'width 0.2s, left 0.2s',
                    },
                    '&:hover': {
                      '--Switch-trackBackground': theme.vars.palette.background.level3,
                    },
                    '&:active': {
                      '--Switch-thumbWidth': '32px',
                    },
                    [`&.${switchClasses.checked}`]: {
                      '--Switch-trackBackground': `${themeset?'red':'rgb(48 209 88)'}`,
                      '&:hover': {
                        '--Switch-trackBackground': `${themeset?'red':'rgb(48 209 88)'}`,
                      },
                    },
                  })}
                />
                {
                  themeset
                  ?<i onClick={changeTheme} style={{cursor: 'pointer'}} className="fa-solid fa-sun fw-bold mx-3"></i>
                  :<i onClick={changeTheme} style={{cursor: 'pointer'}} className="fa-solid fa-moon fw-bold mx-3"></i>
                }
                <Link to='/chat'><i className="fa-solid fa-comment-sms mx-3"></i></Link>
                <i className="fa-solid fa-rectangle-ad"></i>
                <div className="form-group has-search mx-3">
                  <span className="fa fa-search form-control-feedback"></span>
                  <input type="text" className="form-control borderR" placeholder="Search"/>
                </div>
                <SimpleDialog
                  setTheme={setTheme}
                  selectedValue={selectedValue}
                  open={open}
                  onClose={handleClose}
                  getLoggedUser={getLoggedUser}
                />
              <span style={{textAlign: 'right'}} id="selectProfile" className={`${themeset?'selectOptionProfile selectOptionP':'selectOptionProfile'} fw-bold`} onClick={handleClickOpen}>{getLoggedUser[0]?.user?.username}</span>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar