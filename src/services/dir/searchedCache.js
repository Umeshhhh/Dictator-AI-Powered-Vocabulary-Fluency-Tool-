"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const zod_1 = __importDefault(require("zod"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Security middlewares
app.use((0, helmet_1.default)());
// app.use(cors({
//   origin: ["https://yourdomain.com"],
//   methods: ["POST"],
// }));
app.use((0, cors_1.default)());
app.use((0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 1 minute
    max: 60, // limit each IP to 60 requests per minute
    standardHeaders: true,
    legacyHeaders: false,
}));
const redisClient = (0, redis_1.createClient)();
redisClient.on("error", (err) => {
    console.error("Redis Client Error:", err);
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient.connect();
    console.log("✅ Redis connected");
}))();
const inputSchema = zod_1.default.object({
    word: zod_1.default.string().min(1).max(100),
    definition: zod_1.default.string().min(1).max(500),
    antonyms: zod_1.default.array(zod_1.default.string().min(1).max(100)).max(50),
    synonyms: zod_1.default.array(zod_1.default.string().min(1).max(100)).max(50),
    exampleSentences: zod_1.default.array(zod_1.default.string().min(1).max(300)).max(20),
    audio: zod_1.default.string().optional(),
});
// Async handler wrapper
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
app.post("/cache-word", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parseResult = inputSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({
            error: "Invalid input",
            details: parseResult.error.errors,
        });
    }
    const { word, definition, antonyms, synonyms, exampleSentences, audio } = parseResult.data;
    yield cacheData({ word, definition, antonyms, synonyms, exampleSentences, audio });
    return res.status(200).json({ message: "Word cached successfully" });
})));
const cacheData = (_a) => __awaiter(void 0, [_a], void 0, function* ({ word, definition, antonyms, synonyms, exampleSentences, audio = "" }) {
    const key = word.toLowerCase();
    yield redisClient.hSet(key, {
        definition,
        antonyms: JSON.stringify(antonyms),
        synonyms: JSON.stringify(synonyms),
        exampleSentences: JSON.stringify(exampleSentences),
        audio
    });
    // expire after 24h
    yield redisClient.expire(key, 60 * 60 * 24);
});
app.get("/get-cached-word/:word", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const word = req.params.word;
    if (!word || typeof word !== 'string' || word.length < 1 || word.length > 100) {
        return res.status(400).json({ error: "Invalid word parameter" });
    }
    try {
        const key = word.toLowerCase();
        const data = yield redisClient.hGetAll(key);
        if (Object.keys(data).length === 0) {
            return res.status(404).json({ error: "Word not found in cache" });
        }
        return res.status(200).json(data);
    }
    catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
})));
// Global error handler
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
});
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("\nShutting down...");
    yield redisClient.quit();
    process.exit(0);
}));
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
