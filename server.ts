import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/contact", (req, res) => {
    const { name, email, subject, message } = req.body;

    // Server-side validation
    const errors: Record<string, string> = {};
    if (!name || name.trim().length < 2) errors.name = "Name must be at least 2 characters.";
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.email = "Please enter a valid email address.";
    if (!subject || subject.trim().length < 3) errors.subject = "Subject must be at least 3 characters.";
    if (!message || message.trim().length < 10) errors.message = "Message must be at least 10 characters.";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // In a real app, you'd send an email or save to DB here.
    console.log("Contact form submission:", { name, email, subject, message });

    return res.json({ success: true, message: "Message sent successfully!" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
