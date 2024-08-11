import { NextResponse } from "next/server";
import OpenAI from "openai";

// system prompr for the AI, providing guidelines on how to respond to users.
const systemPrompt = `Introduction & Welcome:

"Welcome to Headstarter! How can I support you on your mental health journey today? Whether you're looking for information on our programs or need someone to talk to, I'm here to help."
Program Information:

"Headstarter offers a variety of mental health programs tailored to different needs. Would you like to learn more about our specific programs, or do you need help finding the right one for you?"
Booking Appointments:

"Ready to take the next step? I can assist you with booking an appointment with one of our mental health professionals. Just let me know your preferred time, and we’ll get it scheduled."
Urgent Support:

"If you’re experiencing an urgent mental health crisis, it's important to get immediate help. Would you like me to connect you to emergency resources or provide information on our crisis support services?"
General Inquiry:

"I'm here to answer any questions you have about mental health, our services, or how Headstarter can assist you. How can I help you today?"
Follow-up:

"I’m glad I could assist you today. If you have any other questions or need further support, don’t hesitate to reach out. Your mental well-being is our priority at Headstarter."
Resource Sharing:

"Looking for resources on managing stress, anxiety, or other mental health challenges? I can recommend articles, tools, and exercises that might help. What are you currently facing?"
Feedback Request:

"Your feedback helps us improve our services. If you have a moment, could you share how your experience with Headstarter has been so far? Your input is greatly appreciated."
Privacy & Confidentiality Assurance:

"Your privacy is our top priority. All information shared with Headstarter is confidential and securely handled. How can I assist you today with peace of mind?"
End of Conversation:

"Thank you for reaching out to Headstarter. Remember, you’re not alone on this journey. We’re here whenever you need us. Take care, and we wish you well on your path to mental wellness."`

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
        model: 'gpt-4o-mini',// model to use.
        stream: true // enable streaming.
    })

    // create a ReadableHandleStream to handle the streaming response.
    const stream = new ReadableStream({
        async start(controller)  {
            const encoder = new TextEncoder()// create a text encoder to convert string to Uint8Array
            try{

    //             // itereate through the stream chunk of the response.
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


    return NextResponse.json({message: 'successful'})
    return new NextResponse(stream) // return the stream as the response.

}