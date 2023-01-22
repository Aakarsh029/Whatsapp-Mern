import React from 'react';
import "./css/Sidebar.css";
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { Avatar, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SidebarChat from './SidebarChat';
function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <Avatar src='https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg' />
                <div className="sidebar__headerright">
                    <IconButton>
                        <PeopleIcon />
                    </IconButton>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar_searchcontainer">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <input type="text" placeholder='Search or Start New Chat' />
                    <div className='MenuOpenIcon'>
                        <IconButton>
                            <MenuOpenIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar