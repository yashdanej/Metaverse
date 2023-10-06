import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Friends from '../../components/dashboardComponent/rightComponent/friendsList/Friends'
import { BACKEND_IMAGE_URL, BACKEND_URL } from '../../constant'
import { io } from 'socket.io-client'
import {v4 as uuidv4} from 'uuid'
import './chat.css'
import ChatUser from './ChatUser'

const Chat = ({followingUser, setChecked, theme, handleFollow, checked, addComment, postLiked, followingPost, handleProfileVisit, getLoggedUser}) => {
    const socket = useRef();
    const scrollRef = useRef();
    const [selectedUser, setSelectedUser] = useState(followingUser[0]);
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const handleSendMsg = async () => {
        try {
            await axios.post(`${BACKEND_URL}/message/addmsg`, {
                from: getLoggedUser[0]?._id,
                to: selectedUser?._id,
                message: msg
            });
            socket.current.emit('send-msg', {
                to: selectedUser?._id,
                from: getLoggedUser[0]?._id,
                message: msg
            });
            const msgs = [...messages];
            msgs.push({fromSelf: true, message: msg});
            setMessages(msgs);
            setMsg('');
        } catch (error) {
            // Handle the error (e.g., show a notification)
            console.error('Error sending message:', error);
        }
    }
    const getUser = () => {
        axios.post(`${BACKEND_URL}/message/getmsg`, {
            from: getLoggedUser[0]?._id,
            to: selectedUser?._id
        }).then((response) => {
            setMessages(response.data);
        });
    }
    useEffect(() => {
        getUser();
    }, [selectedUser?._id])
    useEffect(() => {
        if(followingUser[0]?._id){
            socket.current = io(BACKEND_IMAGE_URL);
            socket.current.emit('add-user', getLoggedUser[0]?._id)
        }
    }, [followingUser[0]?._id])

    useEffect(() => {
        if(socket.current){
            socket.current.on('msg-recieve', (msg) => {
                setArrivalMessage({fromSelf: false, message: msg});
            });
        }
    }, [])

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage])
    
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behaviour: 'smooth'});
    }, [messages])
    
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
  return (
    <>
        <div className="container chatContainer">
        <div class="row justify-content-center">
				<div class="col-md-4 col-xl-3 chat chatLeft"><div class="card mb-sm-3 mb-md-0 contacts_card">
					<div class="card-header">
						<div class="input-group">
							<input type="text" placeholder="Search..." name="" class="form-control search"/>
							<div class="input-group-prepend">
								<span class="input-group-text search_btn"><i class="fas fa-search"></i></span>
							</div>
						</div>
					</div>
					<div class="card-body contacts_body">
						<ui class="contacts">
                            {
                                followingUser.length>0 ?
                                followingUser?.map((ele) => {
                                    return(
                                        <ChatUser selectedUser={selectedUser?._id} setSelectedUser={setSelectedUser} loggedId={getLoggedUser[0]?._id} theme={theme} handleProfileVisit={handleProfileVisit} key={ele.user_id} ele={ele} />
                                    )
                                }):
                                <span>No messages to show.</span>
                            }
						</ui>
					</div>
					<div class="card-footer"></div>
				</div></div>
				<div class="col-md-8 col-xl-6 chat chatRight">
					<div class="card">
						<div class="card-header msg_head">
							<div class="d-flex bd-highlight">
								<div class="img_cont">
									<img src={`${selectedUser?.profilePic?.url}`} class="rounded-circle user_img"/>
									<span class="online_icon"></span>
								</div>
								<div class="user_info">
									<span className='fw-bold'>{selectedUser?.username}</span>
									<p>{messages.length} Messages</p>
								</div>
								<div class="video_cam">
									<span><i class="fas fa-video"></i></span>
									<span><i class="fas fa-phone"></i></span>
								</div>
							</div>
							<span id="action_menu_btn"><i class="fas fa-ellipsis-v"></i></span>
						</div>
						<div class="card-body msg_card_body">
                        {messages ?
                            messages.map((message) => {
                                return (
                                    <>
                                    <div ref={scrollRef} key={uuidv4()} class={`d-flex ${message.fromSelf?'justify-content-end':'justify-content-start'}  mb-4`}>
                                    <div className={`d-flex ${message.fromSelf ? 'justify-content-end' : 'justify-content-start'} mb-4 align-items-center`}>
                                        {!message.fromSelf ? (
                                            <>
                                                <div className="img_cont_msg">
                                                    <img src={`${selectedUser.profilePic?.url}`} className="rounded-circle user_img_msg" />
                                                </div>
                                                <div className={`msg_cotainer w-100`}>
                                                    <button className='recieveColor'>
                                                        {message.message}
                                                    </button>
                                                    <span className="msg_time">({displayTimeOfPost(message?.createdAt)})</span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className={`msg_cotainer_send w-100`}>
                                                    <button className='sendColor'>
                                                        {message.message}
                                                    </button>
                                                    <span className="msg_time">({displayTimeOfPost(message?.createdAt)})</span>
                                                </div>
                                                <div className="img_cont_msg">
                                                    <img src={`${getLoggedUser[0]?.profilePic?.url}`} className="rounded-circle user_img_msg" />
                                                </div>
                                            </>
                                        )}
                                        </div>
                                    </div>
                                    </>
                                )
                            }):
                            <span>No messages to show</span>
                        }
						</div>
						<div class="card-footer">
							<div class="input-group">
								<div class="input-group-append">
									<span class="input-group-text attach_btn"><i class="fas fa-paperclip"></i></span>
								</div>
								<textarea onChange={(e) => setMsg(e.target.value)} name="" class="form-control type_msg" placeholder="Type your message...">{msg}</textarea>
								<div onClick={handleSendMsg} class="input-group-append">
									<span class="input-group-text send_btn"><i class="fas fa-location-arrow"></i></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
        </div>
    </>
  )
}

export default Chat
