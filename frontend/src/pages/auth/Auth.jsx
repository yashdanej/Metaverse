import React, { useState } from 'react'
import './auth.css'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Modal from '../../components/modal/Modal';
import { BACKEND_URL, TOKEN } from '../../constant';
import AlertVariousStates from '../../components/modal/Modal';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Auth = ({path, handleCheckboxChange, checkboxRef, secondDesign}) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')
    const [open, setOpen] = useState(false);
    const auth = () => {
        const pathName = path==='signup'?`${BACKEND_URL}/signup`:`${BACKEND_URL}/login`;
        const object = path==='signup'?{username:username, email:email,password: password}:{email:email,password: password};
        if(path==='signup'?username === '' || email === '' || password === '':email === '' || password === ''){
            setErr('All fiels are required!');
            alert('All fields are required!')
            setOpen(true);
        }else{
            axios.post(pathName, object)
            .then((res)=>{
                localStorage.setItem(TOKEN, res.data.token);
                path==='login'?navigate('/'):navigate('/login')
                setErr('');
                setOpen(true);
            }).catch((err)=>{
                setErr(err.response.data.message);
                alert(err.response.data.message)
                setOpen(true);
            })
        }
    }
  return (
    <div>
    {/* {open?<Modal setOpen={setOpen} err={err===''?false:err} success={`yayy! ${path} successfull.`} />:''} */}
        <div className="container">
        <div className="auth d-md-flex align-items-center justify-content-between">
            <div className="box-1 mt-md-0 mt-5">
                <img src="https://images.pexels.com/photos/2033997/pexels-photo-2033997.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    className="" alt=""/>
            </div>
            <div className="box-2 d-flex flex-column h-100">
                    <div className="checkbox">
                        <p>You can switch design</p>
                        <input type="checkbox" id="cbx2" style={{display:'none'}} ref={checkboxRef} checked={secondDesign?'checked':''} onChange={handleCheckboxChange}/>
                        <label htmlFor="cbx2" className="toggle"><span></span></label>
                    </div>
                <div className="mt-2">
                    <p className="mb-1 h-1">{path==='signup'?'Create Account.':'Login.'}</p>
                    <p className="text-muted mb-2">Share your thouhts with the world form today.</p>
                    <div className="d-flex flex-column ">
                        <p className="text-muted mb-2">Continue with...</p>
                        <div style={{flexDirection: 'column'}} className="d-flex align-items-center">
                        {
                            path==='signup'?
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">@</span>
                                </div>
                                <input onChange={x => setUsername(x.target.value)} type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                            </div>:''
                        }
                        
                        <div className="input-group mb-3">
                            <input onChange={x => setEmail(x.target.value)} type="text" className="form-control" placeholder="Your email" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">@example.com</span>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Password</span>
                            </div>
                            <input onChange={x => setPassword(x.target.value)} type="password" className="form-control" placeholder="Your Password" aria-label="Password" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="d-grid gap-2">
                            <button onClick={auth} className="btn btn-primary" type="button">{path==='signup'?'Create Account':'Login'}</button>
                        </div>
                        </div>
                        <div className="mt-3">
                            <p className="mb-0 text-muted">{path==='signup'?'Already have an account?':"Don't have an account?"}</p>
                            <div className="btn btn-primary"><Link className='p-color me-1' to={path==='signup'?'/login':'/signup'}>{path==='signup'?'Log in':'Register'}<span className="fas fa-chevron-right ms-1"></span></Link></div>
                        </div>
                        {
                            path==='login'?
                            <div className="mt-3">
                                <p className="footer text-muted mb-0 mt-md-0 mt-4">By this login you agree with our
                                    <span className="p-color me-1">terms and conditions</span>and
                                    <span className="p-color ms-1">privacy policy</span>
                                </p>
                            </div>:''
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    </div>
  )
}

export default Auth

export const isLogin = () => {
    if(localStorage.getItem(TOKEN)){
        return true;
    }else{
        return false;
    }
}

export const logOut = () => {
    return new Promise((resolve) => {
      const key = localStorage.getItem(TOKEN);
      if (key) {
        localStorage.removeItem(TOKEN);
        resolve({ success: true, data: "Logout Successfully!!!" });
      } else {
        resolve({ success: false, data: "error" });
      }
    });
  };