import { handleError } from "@/utils/serverlogger";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  try {
    const { name, message, stack } = req.body;
    const err = new Error(message);
    err.name = name;
    err.stack = stack;

    handleError(err); // server-side logging
    res.status(200).json({ status: "Logged" });
  } catch (error) {
    console.error("Failed to log error:", error); // ✅ Use the caught error
    res.status(500).json({ status: "Failed to log error" });
  }
}
