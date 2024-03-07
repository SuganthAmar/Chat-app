import React, { useState, useEffect } from 'react';
import client, { COLLECTION_ID_MESSAGES, DATABASE_ID, databases } from '../appwriteConfig';
import { ID, Query, Role, Permission } from 'appwrite';
import { Trash2 } from 'react-feather';
import Header from '../components/Header';
import { useAuth } from '../utils/AuthContext';

const Room = () => {
    const { user } = useAuth();

    const [messages, setMessages] = useState([]);
    const [messageBody, setMessageBody] = useState('');

    useEffect(() => {
        getMessage();
        const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {
            if (response.events.includes("databases.*.collections.*.documents.*.create")) {
                setMessages(previous => [response.payload, ...previous]);
            }
            if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
                setMessages(prevMessages => prevMessages.filter(message => message.$id !== response.payload.$id));
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            user_id: user.$id,
            username: user.name,
            body: messageBody
        };
        const permissions = [
            Permission.write(Role.user(user.$id)),
        ];
        await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            ID.unique(),
            payload,
            permissions
        );
        getMessage();
        setMessageBody('');
    };

    const getMessage = async () => {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(100),
            ]
        );
        setMessages(response.documents);
    };

    const deleteMessage = async (message_id) => {
        console.log("Deleting message:", message_id);
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, message_id);
        console.log("Message deleted:", message_id);
        setMessages(prevMessages => prevMessages.filter(message => message.$id !== message_id));
    };

    return (
        <main className='container'>
            <Header />
            <div className='room--container'>
                <form onSubmit={handleSubmit} id="message--form">
                    <div>
                        <textarea
                            required
                            maxLength={1000}
                            placeholder='Enter the message to send'
                            onChange={(e) => { setMessageBody(e.target.value) }}
                            value={messageBody}
                        ></textarea>
                    </div>
                    <div className='send-btn--wrapper'>
                        <input className="btn btn--secondary" type="submit" value="Send" />
                    </div>
                </form>
                <div>
                    {messages.map(message => (
                        <div key={message.$id} className='message--wrapper'>
                            <div className='message--header'>
                                <p>
                                    {message?.username ? (
                                        <span>
                                            {message.username}
                                        </span>
                                    ) : (
                                        <span>Anonymous user</span>
                                    )}
                                    <small className='message-timestamp'>
                                        {new Date(message.$createdAt).toLocaleString()}
                                    </small>
                                </p>
                                {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                                    <Trash2
                                        onClick={() => { deleteMessage(message.$id) }}
                                        className='delete--btn' />
                                )}
                            </div>
                            <div className='message--body'>
                                <span >{message.body}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Room;
