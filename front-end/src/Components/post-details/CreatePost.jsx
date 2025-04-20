//import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React, { useState, useRef,useEffect } from 'react';
import axios from 'axios';
import image from "./../../assets/logo192.png";



function CreatePost() {

  const [userInfo, setUserInfo] = useState(null);
    const [images, setImage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    let data = localStorage.getItem('user-info');
    let fbData = localStorage.getItem('fb-user-info');

    let userData = JSON.parse(data);
    let fbdatas = JSON.parse(fbData);
    if(!userData){
       userData=fbdatas;
    }
    console.log(userData);
    setUserInfo(userData);
    const { image } = userData
    if(image){
      setImage(image)
      console.log(image);
    }  
  }, [])

  const handleLogout = () => {
      localStorage.removeItem('user-info');
      navigate('/login');
  }
  const sentToCreatePost = () => {
      navigate('/dashboard')
  }

  const inputRefs = useRef([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  //const [posts, setPosts] = useState([]);

  //const fetchPosts = async () => {
  //  const res = await axios.get('http://localhost:5000/api/posts');
  // setPosts(res.data);
  // };



  const handelCreatePost = async (e) => {
    e.preventDefault();
    console.log(title, description);
    await axios.post('http://localhost:3000/post/create-post', { title, description }, {
      withCredentials: true, // send cookies
    });
    console.log("hello hemnat sharma")
    inputRefs.current.forEach((ref) => {
      ref.value = '';
    });
    // fetchPosts();
  };

  return (
  <>
    <nav className="bg-pink-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
       {images? <img src={images} className="w-16 h-16" alt={userInfo?.name || 'User Image'} /> : <img className="w-16 h-16" src={image} alt={userInfo?.name || 'User Image'} />}
        
        {/* Nav Links */}
        <div className="space-x-4 hidden md:flex">
          <span className="text-gray-700 hover:text-blue-600">
          <button onClick={sentToCreatePost}>Dashboard</button>
          </span>
          <span className="text-gray-700 hover:text-blue-600">
           <button onClick={handleLogout}
            >Logout
            </button>
          </span>
          
        </div>
      </div>
    </nav>
   <div className='m-4'>
   <form onSubmit={handelCreatePost} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            name="Title"
            type="text"
            ref={(el) => (inputRefs.current[0] = el)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => setTitle(e.target.value)} 
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            name="message"
            rows="4"
            ref={(el) => (inputRefs.current[1] = el)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => setDescription(e.target.value)} 
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
   </div>
  </>
  )
}

export default CreatePost


/*
<div>
      <form style={{ display: "flex", flexDirection: "column", flexWrap: 'no-wrap', padding: "40px" }}>
        <label style={{ padding: "10px" }}>Title</label>
        <input  style={{ padding: "10px", margin: "20px" }} type='text' ></input>
        <label style={{ padding: "10px" }} >Description</label>
        <input  style={{ padding: "10px", margin: "20px" }} type='text' ></input>
        <button style={{ padding: "20px", margin: "20px", backgroundColor: "yellowgreen", color: "white" }} onClick=''>Create Post</button>
      </form>
    </div>
*/