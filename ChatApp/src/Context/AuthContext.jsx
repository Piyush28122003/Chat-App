import { createContext,useState,useContext } from 'react';


export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    return (
        <AuthContext.Provider value={{
            user,
            setUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}
