import { createContext,useState,useEffect, Children, useContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

const AuthContext = createContext();
export const AuthProvider=({children})=>{
    const [loading ,setLoading]=useState(true);
    const [user,setUser]=useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        getUserOnLoad();
    },[])

    const getUserOnLoad= async()=>{
        try {
            const accountDetails = await account.get();
            setUser(accountDetails);
        } catch (error) {
            console.warn(error);
        }
        setLoading(false)
    }

    const handlelogin=async (e,credentials)=>{
        e.preventDefault()
        try {
            const response =await account.createEmailSession(credentials.email, credentials.password);
            // console.log("Login",response);
            const accountDetails = await account.get();
            setUser(accountDetails);
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }
    const handleLogout=async()=>{
        await account.deleteSession('current');
        setUser(null);

    }
    const handleRegister=async(e,credentials)=>{
        e.preventDefault();
        if(credentials.password1 !== credentials.password2){
            alert("Password Mismatch!");
            return
        }
        try {
            let response=await account.create(
                ID.unique(),
                credentials.email,
                credentials.password1,
                credentials.name
                )
            await account.createEmailSession(credentials.email,credentials.password1)
            const accountDetails = await account.get();
            setUser(accountDetails);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    const contextData={
        user,
        handlelogin,
        handleLogout,
        handleRegister
    }
    return <AuthContext.Provider value={contextData}>
        {loading? <p>Loading....</p>: children}
    </AuthContext.Provider>

}

export const useAuth=()=>{
    return useContext(AuthContext)
}
export default AuthContext;
