import { Avatar } from '@mui/material';
import React from 'react';
import "./css/SidebarChat.css";

function SidebarChat() {
  return (
    <div className='sidebarchat'>
        <Avatar />
        <div className="sidebarchat__info">
            <h2>Aakarsh</h2>
            <p>This is a message</p>
        </div>
    </div>
  )
}

export default SidebarChat