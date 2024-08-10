import { NextResponse } from "next/server";
import OpenAI from "openai";

// system prompr for the AI, providing guidelines on how to respond to users.
const systemPrompt = 'my prompts'