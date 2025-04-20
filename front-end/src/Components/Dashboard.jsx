import React, { useEffect, useState } from 'react';
import PostCard from "../Components/post-details/PostCard";
import { useNavigate } from 'react-router-dom';
import { getAllPost } from "./../api";
import image from "./../assets/logo192.png";

const Dashboard = () => {
//   const defaulIMGURL = './../assets/images.png'
   console.log(image)
    const [userInfo, setUserInfo] = useState(null);
    const [images, setImage] = useState();
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
	const getPosts = async () => {
		try {
			
				//console.log("inside if...",authResult["code"]);
				const result = await getAllPost();
				console.log("inside if result", result);
			    setPosts(result.data.post);
				
		} catch (e) {
			console.log('Error while fetching data from db...', e);
		}
	};

    useEffect(() => {
      getPosts();
       // const result =  getAllPost();
        let data = localStorage.getItem('user-info');
        let fbData = localStorage.getItem('fb-user-info');

        let userData = JSON.parse(data);
        let fbdatas = JSON.parse(fbData);
        if(!userData){
           userData= fbdatas;
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
        localStorage.removeItem('fb-user-info');
        navigate('/login');
    }
    const sentToCreatePost = () => {
        navigate('/create-post')
    }

    return (
        <>
      {/* Here we have implemented nav bar */}

    <nav className="bg-pink-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
       {images? <img src={images} className="w-16 h-16" alt={userInfo?.name || 'User Image'} /> : <img className="w-16 h-16" src={image} alt={userInfo?.name || 'User Image'} />}
        
        {/* Nav Links */}
        <div className="space-x-4 hidden md:flex">
          <span className="text-gray-700 hover:text-blue-600">
          <button onClick={sentToCreatePost}>Create Post</button>
          </span>
          <span className="text-gray-700 hover:text-blue-600">
           <button onClick={handleLogout}
            >Logout
            </button>
          </span>
          
        </div>
      </div>
    </nav>
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">All Posts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
        </>
    )
}

export default Dashboard;







    /*
                <h1>Welcome {userInfo?.name}</h1>
            <h3>{userInfo?.email} </h3>
            

            
            <h1 className="text-3xl bg-sky-50 font-bold underline">
                Hello world!
            </h1>
          */ 