'use client'
import { Box, Button, Stack, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import '../Sign_up/auth.css'
import { auth, firestore } from "@/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { toast } from "react-toastify";
  import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()


  const messageEndRef = useRef(null)
  const [details, setDetails] = useState('')
    
const logout = () => {
    setDetails(null)

  signOut(auth).then(() => {
    console.log('add',auth)
    console.log('details', details)
    router.push('/')
  }).catch((error) => {
    console.log(error)
});

   
  }
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth'})
  }

 const fetchUserData = async() => {
   onAuthStateChanged( auth, async (user) => {
  if (user){
     try{
      const docRef = doc(firestore, 'Users', user.uid);
    console.log('docref', docRef)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setDetails(docSnap.data())
    } else {
     toast.warning('User not logged in.', {position: 'top-center'})
    }
    }catch(error){
      console.log(error)
      toast.error('Failed to fetch user data.')
    } 
  }else{
      toast.warning('user not logged in.')
    }
  })
 }

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the MentalHealth support assistant. How can i help you today?",
    }
  ])

  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)



  const sendMessage = async () => {
    // to limit sending empty messages.
    if (!message.trim() || isLoading) return;
    setIsLoading(true)


    setMessage('')
    setMessages((messages) => [
      ...messages, 
      {role: 'user', content: message},
      {role: 'assistant', content: ''}

    ])

    // send message to the server.
    try{

      const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([...messages, {role: 'user', content: message}])
    })


    if (!response.ok){
      throw new Error('Network response was not ok')
    }
      const reader = response.body.getReader() // get a reader to read the response body
      const decoder = new TextDecoder() // create a decoder to decode the response text
      
  // function to process the text from the response.
  while(true){
    const {done, value} = await reader.read()
    if(done) break;

    const text = decoder.decode(value, { stream: true})
     setMessages((messages) => {
      let lastMessage = messages[messages.length - 1] // get the last message.
      let otherMessages = message.slice(0, messages.length - 1) // get all the messages.

      return [
        ...otherMessages,
        {...lastMessage, content:lastMessage.content + text} // append the decoded text to the assistant's message
      ]
     })  
  }
    setIsLoading(false)

    } catch(error){
      console.error('Error:', error)
      setMessages((messages) => [
        ...messages,
        {role: 'assistant', content: "I'm sorry, but I encoutered an error. Please  try again later."}
      ])
    }
  
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter ' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

   useEffect(() => {
   
      fetchUserData()
      scrollToBottom()

  }, [auth])

  return (<>
  <div className="header">Welcome back {details ? <p>{details?.userName} </p>: <p>loading data..</p> } <button className="button" onClick={logout}> Log out</button></div>

  <Box width={'100vw'} height={'95vh'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
  <Stack direction={'column'} width={'500px'} height={'700px'} border={'solid black 1px '} p={2} spacing={2} >
    <Stack direction={'column'} spacing={2} flexGrow={1} overflow={'auto'} maxHeight={'100%'}>
      {messages.map((message, index) => (
        <Box  key={index} display={'flex'} justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}  >
          <Box bgcolor={message.role === 'assistant' ? 'primary.main' : 'secondary.main'} color={'white'} borderRadius={16} p={3} >
            {message.content}
          </Box>
        </Box>
      ))
        
      }
    </Stack>
 <Stack direction={'row'} spacing={2}>
    <TextField label={'Message'} fullWidth margin="dense" value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={handleKeyPress} disabled={isLoading} />

      <Button variant="contained" onClick={sendMessage} disabled={isLoading}> {isLoading ? 'Sending... ': 'Send'}</Button>

      <div ref={messageEndRef}/>
  </Stack>
  </Stack>

 

</Box></>

  );
}
