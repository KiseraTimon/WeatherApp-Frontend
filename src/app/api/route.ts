import { handleError } from '@/utils/serverlogger';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, message, stack } = body;

    // Reconstruct the Error object
    const error = new Error(message);
    error.name = name;
    error.stack = stack;

    // Log the error using your existing logger
    handleError(error, 'frontend_logs.txt');

    return NextResponse.json({ message: "Error logged successfully" }, { status: 200 });
  } catch (err) {
    console.error("Failed to log error:", err);
    return NextResponse.json({ message: "Failed to log error" }, { status: 500 });
  }
}
