import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { fbLogin } from "../../api";
import { FaFacebookF } from 'react-icons/fa';


const FacebookLogin = () => {

    const userLoginByFB = async (code) => {
        try {

            const result = await fbLogin(code);
            console.log("inside if result", result);

        } catch (e) {
            console.log('Error while accessing token from server...', e);
        }
    };
   // const [sdkLoaded, setSdkLoaded] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        // Check if FB already loaded
        if (window.FB) {
            initFB();
            return;
        }

        // Load Facebook SDK script
        window.fbAsyncInit = initFB;

        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        })(document, "script", "facebook-jssdk");
    }, []);

    const initFB = () => {
        window.FB.init({
            appId: "879979559159557", // <-- 🔁 यहाँ अपनी असली Facebook App ID डालें
            cookie: true,
            xfbml: false,
            version: "v18.0", // ✅ VALID VERSION
        });

      //  setSdkLoaded(true);
    };

    const handleFBLogin = () => {
        if (!window.FB) {
            console.error("Facebook SDK not loaded.");
            return;
        }

        window.FB.login(
            (response) => {
                if (response.authResponse) {
                    console.log("✅ Logged in:", response);
                    // setToken(response.accessToken)
                    // Get user info
                    window.FB.api(
                        "/me",
                        { fields: "name,email,picture" },
                        function (profile) {
                            const { id, name } = profile;
                            const image = profile.picture.data.url;
                            const obj = { id, name, image };
                            userLoginByFB(obj);
                            //    const token = result.data.accessToken;
                            localStorage.setItem('fb-user-info', JSON.stringify(obj));
                            navigate('/dashboard');
                            console.log("👤 User profile:", profile);
                            // alert(`Welcome, ${profile.name}!`);
                        }
                    );
                } else {
                    console.log("❌ User cancelled login or did not authorize.");
                }
            },
            { scope: "public_profile,email" }
        );
    };

    return (
        <div>
            <button
                onClick={handleFBLogin}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl p-3 shadow hover:bg-blue-700 transition"
            >
                <FaFacebookF className="text-white text-lg" />
                <span className="text-sm font-medium">Continue with Facebook</span>
            </button>
        </div>

    );
};

export default FacebookLogin;
