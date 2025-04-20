import mongoose,{Schema} from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    userId: {
        type: String,
    },
    image: {
        type: String
    },
    password: {
        type: String,
       // required: [true, 'Password is required']
    },
    refreshToken: {
        type: String
    }
},
{
    timestamps: true
}
 );

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    try {
      const salt = await bcrypt.genSalt(10); // 10 is the salt rounds
      this.password = await bcrypt.hash(this.password, salt);
      next(); // Proceed with the save operation
    } catch (err) {
      next(err); // Handle errors
    }
  //  next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_TIMEOUT
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN,
        {
            expiresIn: process.env.REFRESH_TOKEN_TIMEOUT
        }
    )
}

 const User = mongoose.model('social-login', userSchema);

 export default User