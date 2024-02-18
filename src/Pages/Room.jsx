import React,{useState,useEffect} from 'react'
import { COLLECTION_ID_MESSAGES, DATABASE_ID, databases } from '../appwriteConfig'
import {ID, Query} from 'appwrite' //used to create unique document id

const Room = () => {
    
    const [messages,setMessages]=useState([]);
    const [messageBody,setMessageBody]=useState('');

    useEffect(()=>{
        getMessage();
    },[])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        let payload={
            body:messageBody
        }

        let response=await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            ID.unique(),
            payload  //object for creating a document
           
        )
        console.log("Created!",response)
        setMessages(previous=>[response,...messages])
        setMessageBody('') //after sending we're reseting that messageBody field
    }

    const getMessage =async()=>{
        const response=await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(20)
            ]  //Additonal parameter to show,in this we can sort this in descending based on the time 
            );
        console.log(response);
        setMessages(response.documents)
    } 




  return (
    <main className='container'>

        <div className='room--container'>
            <form onSubmit={handleSubmit} id="message--form">
                <div>
                    <textarea 
                    required 
                    maxLength={1000} 
                    placeholder='Enter the message to send'
                    onChange={(e)=>{setMessageBody(e.target.value)}}
                    value={messageBody}
                    ></textarea>
                </div>
                <div className='send-btn--wrapper'>
                    <input className="btn btn--secondary" type="submit" value="Send" />
                </div>
            </form>
            <div>
                {messages.map(message=>(
                    <div key={message.$id} className='message--wrapper'>
                        <div className='message--header'>
                            <small className='message-timestamp'>
                                {message.$createdAt}
                            </small>
                        </div>
                        <div className='message--body'>
                            <span >{message.body}</span>
                        </div>
                    </div>
    ))}
            </div>
        </div>
    </main>
  )
}

export default Room