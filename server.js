import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";

await connectDB(process.env.MONGO_URL); // Connect to the MongoDB database
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});