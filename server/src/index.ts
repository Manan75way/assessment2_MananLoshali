import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { connectToDb } from "./db/connectDB";
import driverRoute from "./routes/authRoute";
import customerRoute from "./routes/authRoute";

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config({ path: path.join(__dirname, ".env") });

const PORT = process.env.PORT;
const mongo_uri: any = process.env.MONGO_DB_URI;

connectToDb(mongo_uri);

//routes

//auth routes
app.use("/api/driver", driverRoute);
app.use("/api/customer", customerRoute);

//driver routes
app.use("/api/driver/register_vehcile",driverRoute);


app.listen(PORT, () => {
  console.log(`server running at the port ${PORT}`);
});
