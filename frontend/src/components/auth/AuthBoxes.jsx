import React from 'react'
import './authBoxes.css'
const AuthBoxes = ({header, content, content2, page, progress, active}) => {
      
  return (
    <div className="authbb col-sm-6 col-lg-3">
        <div className={`${active?'active':''} authboxes card p-3 mb-2`}>
            <div className="d-flex justify-content-between">
                <div className="d-flex flex-row align-items-center">
                    <div className="icon"><i style={{fontSize: '2rem'}} className="fa-brands fa-meta"></i> </div>
                    <div className="ms-2 c-details">
                        <h6 className={`${active?'activeHeader':'notActiveHeader'} mb-0 font`}>{header}</h6>
                    </div>
                </div>
                <div className={`${active?'activeBadge':'badge'}`}> <span>Design</span> </div>
            </div>
            <div className="mt-3">
                <h3 className="heading">{content}<br/>{content2}</h3>
                <div className="mt-3">
                    <div className="progress">
                        <div className={`${active?'activeProgress-bar':'progress-bar'}`} role="progressbar" style={{width: progress}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div className="mt-3"> <span className="text1">You are in <span className={`${active?'activePage':''} text2`}>{page}</span></span> </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AuthBoxes