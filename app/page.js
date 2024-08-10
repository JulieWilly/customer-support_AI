'use client'
import { Box, Button, Stack, TextField } from "@mui/material";
import { tree } from "next/dist/build/templates/app-page";
import { AssistantStream } from "openai/lib/AssistantStream";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the MentalHealth support assistant. How can i help you today?",
    }
  ])

  const [message, setMessage] = useState('')
  const sendMessage = async () => {
    setMessage('')
    setMessages((messages) => [
      ...messages, 
      {role: 'user', content: message},
      {role: 'assistant', content: ''}

    ])

    // send message to the server.
    const response = fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([...messages, {role: 'user', content: message}])
    }).then(async (res) => {
      const reader = res.body.getReader() // get a reader to rea the response body
      const decoder = new TextDecoder() // create a decoder to decode the response text
      
  let result = ''
  // function to process the text from the response.
  return reader.read().then(function processText({done, value}) {
    if (done) {
      return result;
    } 

     const text = decoder.decode(value || new Uint8Array(), { stream: tree})
     setMessages((messages) => {
      let lastMessage = messages[message.length - 1] // get the last message.
      let otherMessages = messages.slice(0, messages.length - 1) // get all the messages.

      return [
        ...otherMessages,
        {...lastMessage, content:lastMessage.content + text} // append the decoded text to the assistant's message
      ]
     })
     return reader.read().then(processText) // continue reading the next chunk of the response.
  })
    })
  }
  return (
<Box width={'100vw'} height={'100vh'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
  <Stack direction={'column'} width={'500px'} height={'700px'} border={'solid black 1px '} p={2} spacing={3} >
    <Stack direction={'column'} spacing={2} flexGrow={1} overflow={'auto'} maxHeight={'100%'}>
      {messages.map((message, index))(
        <Box  key={index} display={'flex'} justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}  >
          <Box bgcolor={message.role === 'assistant' ? 'primary.main' : 'secondary.main'} color={'white'} borderRadius={16} p={3} >
            {message.content}
          </Box>

        </Box>
      )
        
      }
    </Stack>

  </Stack>
  <Stack direction={'row'} spacing={2}>
    <TextField label={'Message'} fullWidth value={'message'} onChange={(e) => setMessage(e.target.value)} />
      <Button variant="contained" onClick={sendMessage}>Send</Button>
  </Stack>

</Box>
  );
}
