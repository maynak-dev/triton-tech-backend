import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(20).optional().default(""),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(2000),
});

app.post("/api/contact", async (req, res) => {
  try {
    const data = contactSchema.parse(req.body);
    const contact = await prisma.contact.create({ data });
    res.status(201).json({ success: true, id: contact.id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ success: false, errors: err.errors });
    } else {
      console.error(err);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
});

app.get("/api/contacts", async (_req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
