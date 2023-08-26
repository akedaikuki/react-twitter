import { login, register, checkPermission } from "../../API/auth";
import { adminLogin } from "../../API/admin";
import { createContext, useState, useEffect, useContext } from "react";
import * as jwt from "jsonwebtoken";
import { useLocation } from 'react-router-dom';


const defaultAuthContext = {
    isAuthenticated: false, 
    currentMember: null,    
    register: null,         
    login: null,            
    logout: null,           
  };

  const AuthContext = createContext(defaultAuthContext);
  export const useAuth = () => useContext(AuthContext);
  export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [payload, setPayload] = useState(null);

    const { pathname } = useLocation();

    useEffect(() => {
        const checkTokenIsValid = async () => {
            const userToken = localStorage.getItem
            ('userToken');
            if (!userToken) {
                setIsAuthenticated(false);
                setPayload(null);
                return;
            }
            const result = await checkPermission(userToken);
            if (!result) {
                setIsAuthenticated(true);
                const tempPayload = jwt.decode(userToken);
                setPayload(tempPayload);
            }else {
                setIsAuthenticated(false);
                setPayload(null);
            }
        };
    
        checkTokenIsValid();
      }, [pathname])

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                currentMember: payload && {
                    id: payload.sub,
                    name: payload.name,
                },
                register: async (data) => {
                    const { success, userToken } = await register 
                    ({
                        account: data.account,
                        name: data.name,
                        email: data.email,
                        password: data.password,
                        checkPassword: data.checkPassword,
                    });
                    const tempPayload = jwt.decode(userToken);
                    if(tempPayload) {
                        setPayload(tempPayload);
                        setIsAuthenticated(true);
                        localStorage.setItem('userToken', userToken);
                    } else {
                        setPayload(null);
                        setIsAuthenticated(false);
                    }
                    return success;
                },
                login: async (data) => {
                    const  { success, userToken } = await login({
                        account: data.account,
                        password: data.password,
                    });
                    const tempPayload = jwt.decode(userToken);
                    if(tempPayload) {
                        setPayload(tempPayload);
                        setIsAuthenticated(true);
                        localStorage.setItem('userToken', userToken);
                    } else {
                        setPayload(null);
                        setIsAuthenticated(false);
                    }
                    return success;
                },
                adminLogin: async (data) => {
                    const  { success, userToken } = await adminLogin({
                        account: data.account,
                        password: data.password,
                    });
                    const tempPayload = jwt.decode(userToken);
                    if(tempPayload) {
                        setPayload(tempPayload);
                        setIsAuthenticated(true);
                        localStorage.setItem('userToken', userToken);
                    } else {
                        setPayload(null);
                        setIsAuthenticated(false);
                    }
                    return success;
                },
                logout: () => {
                    localStorage.removeItem('userToken');
                    setPayload(null);
                    isAuthenticated(false);
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}