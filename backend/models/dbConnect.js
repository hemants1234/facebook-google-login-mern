import mongoose from "mongoose";



const DatabaseConnect = async () => {
    try {
        const DB = `mongodb://127.0.0.1:27017/googleAuth`;
        const DatabaseConnection = mongoose.connect(DB)
        console.log("Database Connected")
       // console.log(`\n MongoDB Connected !! DB HOST:${process.env.DB_URI} , ${DB_NAME}, ${(await DatabaseConnection).connection.host}`);
    } catch (error) {
       console.log("MongoDB Connection Error:- ", error);
       process.exit(1)        
    }
}

export default DatabaseConnect


//console.log('DB--', DB);
//mongoose
//    .connect(DB)
//    .then(() => {
//        console.log('DB connection established');
//    })
//    .catch((err) => {
 //       console.log('DB CONNECTION FAILED');
//        console.log('ERR: ', err);
//    });