import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import subjectRoutes from "./routes/subject.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";

const app = express();

// Set up dynamic allowed origins for production and local development
const allowedOrigins = [
  process.env.FRONTEND_URL, 
  "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json({
    limit: "32kb",
}));
app.use(express.urlencoded({ extended: true, limit: "32kb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("JIIT Review API running [Production Live]");
});

// Auth Routes
app.use("/api/auth", authRoutes);

// Subject Routes
app.use("/api/subjects", subjectRoutes);

// Teacher Routes
app.use("/api/teachers", teacherRoutes);

export default app;