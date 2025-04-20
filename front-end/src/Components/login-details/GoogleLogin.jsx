//import {useState} from "react";
import { FaGoogle } from 'react-icons/fa';
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "./../../api";
import { useNavigate } from 'react-router-dom';

const GoogleLogin = (props) => {
	//const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const responseGoogle = async (authResult) => {
		console.log(authResult["code"]);
		try {
			if (authResult["code"]) {
				console.log("inside if...", authResult["code"]);
				const result = await googleAuth(authResult["code"]);
				console.log("inside if result", result);
				const { email, name, image } = result.data.updatedUser;
				const token = result.data.accessToken;
				const obj = { email, name, token, image };
				localStorage.setItem('user-info', JSON.stringify(obj));
				navigate('/dashboard');
			} else {
				console.log(authResult);
				throw new Error(authResult);
			}
		} catch (e) {
			console.log('Error while Google Login...', e);
		}
	};

	const googleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: responseGoogle,
		flow: "auth-code",
	});

	return (
		<div className="App">

			<button
				onClick={googleLogin}
				className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-xl p-3 shadow hover:shadow-md transition"
			>
				<FaGoogle className="text-red-500 text-lg" />
				<span className="text-sm font-medium text-gray-700">Continue with Google</span>
			</button>
		</div>
	);
};

export default GoogleLogin;