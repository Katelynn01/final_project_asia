import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

export const rateLimiter = rateLimit({
    windowMs: 120000,
    max: 100,
    message: "Too many requests, please try again later.",
    standardHeaders: true,
    legacyHeaders: false
});