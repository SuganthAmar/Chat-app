import React,{useState,useEffect} from 'react'
import { COLLECTION_ID_MESSAGES, DATABASE_ID, databases } from '../appwriteConfig'

const Room = () => {
    useEffect(()=>{
        getMessage();
    },[])
    const getMessage =async()=>{
        const response=await databases.listDocuments(DATABASE_ID,COLLECTION_ID_MESSAGES);
        console.log(response);
    } 


  return (
    <div>Room</div>
  )
}

export default Room