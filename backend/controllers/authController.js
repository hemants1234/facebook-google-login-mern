import axios from 'axios';
import jwt from 'jsonwebtoken';
import {asyncHandler} from "../utils/asyncHandler.js";
import { oauth2Client } from '../utils/googleClient.js';
import User from '../models/userModel.js';
import {ApiError} from '../utils/ApiError.js'

const generateAccessAndRefreshTokens = async(userId) => {
     console.log(userId)
    try {
  
       const user = await User.findById(userId)
       console.log(user)
       const accessToken = user.generateAccessToken()
       console.log(accessToken)
       const refreshToken = user.generateRefreshToken()
       console.log(refreshToken)
      
  
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})
  
        return {accessToken, refreshToken}
  
      } catch (error) {
  
        throw new ApiError(500, "Something Went Wrong while generating refresh and access tokes")
      }
  }
  

/* GET Google Authentication API. */
const googleAuth = asyncHandler(async (req, res) => {
    const code = req.query.code;
    console.log(code);
    
    try {
        const googleRes = await oauth2Client.getToken(code);
        console.log(googleRes);

        oauth2Client.setCredentials(googleRes.tokens);
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );
        const { email, name, picture } = userRes.data;
        // console.log(userRes);
        let user = await User.findOne({ email });


        if (!user) {
            user = await User.create({
                name,
                email,
                image: picture,
            });
        }
        const { _id } = user;
       // const token = jwt.sign({ _id, email },
       //     process.env.JWT_SECRET, {
       //     expiresIn: process.env.JWT_TIMEOUT,
       // });
        const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(_id)

    let updatedUser = await User.findByIdAndUpdate(
              _id,
            {
               $set: {
                 refreshToken: refreshToken
               }
            },
            {
                new: true
            }
          )

        const options = {
            httpOnly: true,
            secure: true
        }

        res.status(200)
         .cookie("accessToken", accessToken, options)
         .cookie("refreshToken", refreshToken, options)
         .json({
            message: 'success',
            accessToken,
            refreshToken,
            updatedUser
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
});

const facebookAuth = asyncHandler(async (req, res) => {
    const userId = req.query.userId;
    const name = req.query.name;
    const picture = req.query.imageURL;
  //  const userId = req.query.userId;
    console.log(userId);
    
    try {
       
        //const { userId, name, picture } = codes;
        // console.log(userRes);
        let user = await User.findOne({ userId });


        if (!user) {
            user = await User.create({
                name,
                userId,
                image: picture,
            });
        }
        const { _id } = user;
       
        const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(_id)

        let updatedUser = await User.findByIdAndUpdate(
              _id,
            {
               $set: {
                 refreshToken: refreshToken
               }
            },
            {
                new: true
            }
          )

        const options = {
            httpOnly: true,
            secure: true
        }

        res.status(200)
         .cookie("accessToken", accessToken, options)
         .cookie("refreshToken", refreshToken, options)
         .json({
            message: 'success',
            accessToken,
            refreshToken,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
});



export {
    googleAuth,
    facebookAuth
  }