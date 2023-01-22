import React , {useState} from 'react';
import "./css/Chat.css";
import { Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SearchIcon from '@mui/icons-material/Search';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import SelectInput from '@mui/material/Select/SelectInput';
import axios from "./axios";
function Chat({ messages }) {

  const [input,setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/messages/new",{
      message: input,
        name: "Aakarsh",
        timestamp: "Just now!!! ",
        received: true
    });
    setInput("");
  }
  return (
    <div className='chat'>
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerinfo">
          <h3>Aakarsh</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat__headerright">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map(message => (
          <p className={`chat__message ${message.received && "chat__receiver"}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}

        <p className='chat__message '>
          <span className="chat__name">Aakarsh</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>

      </div>
      <div className="chat__footer">
        <EmojiEmotionsIcon />
        <form>
          <input value={input} onChange={e => setInput(e.target.value)} placeholder='Type a Message' type="text" />
          <button onClick={sendMessage} type="submit">Send a Message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat