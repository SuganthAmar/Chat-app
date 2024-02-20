import { Account, Client,Databases } from 'appwrite';

const client = new Client();


export const PROJECT_ID=import.meta.env.VITE_APPWRITE_PROJECT_ID;
export const DATABASE_ID=import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const COLLECTION_ID_MESSAGES=import.meta.env.VITE_APPWRITE_COLLECTION_ID_MESSAGES;


client
.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const databases = new Databases(client);
export const account = new Account(client);
export default client;