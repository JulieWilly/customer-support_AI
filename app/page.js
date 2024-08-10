'use client'
import { Box, Button, Stack, TextField } from "@mui/material";
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
    
  }
  return (
<Box width={'100vw'} height={'100vh'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
  <Stack direction={'column'} width={'500px'} height={'700px'} border={'solid black 1px '} p={2} spacing={3} >
    <Stack direction={'column'} spacing={2} flexGrow={1} overflow={'auto'} maxHeight={'100%'}>
      {
      <Box display={'flex'} justifyContent={'//'}  >
        <Box bgcolor={'//'} color={'white'} borderRadius={16} p={3} ></Box>

      </Box>
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
