import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import attendenceRouter from "./routes/attendence.js";
import applicationRouter from "./routes/application.js";
import connectDB from "./db/db.js";
connectDB();
const app = express();
app.use(
    cors({
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(express.json());
app.use(express.static("public/images"));
app.use(express.static("public/files"));
app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/attendance", attendenceRouter);
app.use("/api/application", applicationRouter);
app.listen(process.env.PORT, () => {
    console.log(`Server dang chay tai ${process.env.PORT}`);
});


