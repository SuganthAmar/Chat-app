import { Client,Databases } from 'appwrite';

const client = new Client();


export const PROJECT_ID='65d1cd6b5aa5d64c685c';
export const DATABASE_ID='65d1d0996e57d5392274';
export const COLLECTION_ID_MESSAGES='65d1d0ad89facef670e4';
client
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject('65d1cd6b5aa5d64c685c');

export const databases = new Databases(client);
export default client;