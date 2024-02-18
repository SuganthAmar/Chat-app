import { createContext,useState,useEffect, Children, useContext } from "react";

const AuthContext = createContext();
export const AuthProvider=({children})=>{
    const [loading ,setLoading]=useState(true);
    const [user,setUser]=useState(null);

    useEffect(()=>{
        setLoading(false)
    },[])
    const contextData={
        user
    }
    return <AuthContext.Provider value={contextData}>
        {loading? <p>Loading....</p>: children}
    </AuthContext.Provider>

}

export const useAuth=()=>{
    return useContext(AuthContext)
}
export default AuthContext;
