import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import React, { useEffect, useState } from 'react';
import Pusher from "pusher-js";
import axios from "./components/axios";
function App() {
  const [messages,setMessages] =useState([]);



  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);


  useEffect(() => {
    const pusher = new Pusher("6447a1db55682a28b547", {
      cluster: 'ap2'
    });    

    const channel = pusher.subscribe("messages");
    channel.bind("inserted",  (data) => {
      setMessages([...messages,data]) 
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);

  console.log(messages); 

 

  return (
    <div className="app">
      <div className='app__body'>
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
