import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const app = express();
const prisma = new PrismaClient(); // ✅ No arguments – config is loaded from prisma.config.js

// ✅ Correct CORS configuration
const allowedOrigins = ['https://triton-tech-frontend.vercel.app', 'http://localhost:5173'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/contact", async (req, res) => {
  try {
    const data = contactSchema.parse(req.body);
    const contact = await prisma.contact.create({ data });
    res.status(201).json({ success: true, contact });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, errors: error.errors });
    } else {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
});

app.get("/api/contacts", async (_req, res) => {
  const contacts = await prisma.contact.findMany({ orderBy: { createdAt: "desc" } });
  res.json(contacts);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));