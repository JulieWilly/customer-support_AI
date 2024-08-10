import { NextResponse } from "next/server";
import OpenAI from "openai";

// system prompr for the AI, providing guidelines on how to respond to users.
const systemPrompt = 'my prompts'

// POST functioin to handle incoming requests.
export const POST =async (req) => {
 // create a new instance of the OpenAI client
    const openai = new OpenAI()
    // Parse the JSON body of the incoming request.
    const data = await req.json()

    // create a chat completion request to the OpenAI API

    const completion  = await openai.chat.completions.create({
        // include the system prompt and the data.
        messages: [{role: 'system', content: systemPrompt}, ...data],
        model: 'gpt-4o',// model to use.
        stream: true // enable streaming.
    })

    // create a ReadableHandleStream to handle the streaming response.
    const stream = new ReadableStream({
        async start(controller)  {
            const encoder = new TextEncoder()// create a text encoder to convert string to Uint8Array
            try{

                // itereate through the stream chunk of the response.
                for await (const chunk of completion){
                    // extract the content from the chunk
                    const content = chunk.choices[0]?.delta?.content
                    if (content){
                        const text = encoder.encode(content) // encode the text.
                        controller.enqueue(text)// the the encode on to the stream
                    }
                }
            } catch(error){
                controller.error.error // handling errors that may occur.
            } finally{
                controller.close() // close stream when done.
            }
            
        }
        
    })

    return new NextResponse(stream) // return the stream as the response.
}