import { createContext,useState,useEffect, Children, useContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";

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
            const accountDetails = account.get();
            setUser(accountDetails);
        } catch (error) {
            console.error(error);
        }
        setLoading(false)
    }

    const handlelogin=async (e,credentials)=>{
        e.preventDefault()
        try {
            const response =await account.createEmailSession(credentials.email, credentials.password);
            console.log("Login",response);
            const accountDetails = account.get();
            setUser(accountDetails);
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    const contextData={
        user,
        handlelogin,
    }
    return <AuthContext.Provider value={contextData}>
        {loading? <p>Loading....</p>: children}
    </AuthContext.Provider>

}

export const useAuth=()=>{
    return useContext(AuthContext)
}
export default AuthContext;
