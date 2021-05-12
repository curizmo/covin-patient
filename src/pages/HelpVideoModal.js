import React from 'react'
import closeIcon from '../assets/images/icon_close_white.svg'
import "./home.css"

const Modal = props => {
    if(!props.show){
        return null
    }
    return(
    <div className="modal">
        <div className="modal-content">
            <div className="modal-header">
                <img src={closeIcon} alt="close icon" onClick={props.onClose}/>
            </div>
            <object data='https://www.youtube.com/embed/YipRpSJ9X6k'
                    title='video'
                    className="video">
            </object>
        </div>
    </div>
    )
}

export default Modal