//import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'

import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import NotFound from './Components/NotFound';
import RefreshHandler from './Components/RefreshHandler';
import CreatePost from './Components/post-details/CreatePost';

// facebook cred :- 
// AppId:- 9282755081832764
// screat :- 28760ee1c649b6dcd92c035dcf7a43fcA
// 
 /*
 
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>




FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
});


{
    status: 'connected',
    authResponse: {
        accessToken: '...',
        expiresIn:'...',
        signedRequest:'...',
        userID:'...'
    }
}



<fb:login-button 
  scope="public_profile,email"
  onlogin="checkLoginState();">
</fb:login-button>


function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

 */


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

	const PrivateRoute = ({ element }) => {
		return isAuthenticated ? element : <Navigate to="/login" />
	}
 
  return (
    <div className="App">
      <BrowserRouter>
         <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
         <Routes>
             <Route path='/login' element={<Login/>}/>
             <Route path='/' element={<Navigate to="/login"/>}/>
             <Route path='/dashboard' element={<PrivateRoute element={<Dashboard/>}/>}/>
             <Route path='/create-post' element={<PrivateRoute element={<CreatePost/>}/>}/>
             <Route path='*' element={<NotFound/>}/>
          </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
