import { createContext, useContext,useEffect,useState } from "react"
import { useNavigate } from "react-router-dom";
import {dummyChats, dummyUserData} from "../assets/assets";
const AppContext = createContext() //creates a context object. a box where we will store our global data
export const AppContextProvider = ({ children }) =>{
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [chats,setChats] = useState([]);
    const [selectedChat, setSelectedChat]= useState(null);
     const [theme,setTheme] = useState(localStorage.getItem('theme') || 'light'); //we will get theme from either browser local storage or set a default value
    const fetchUser = async () =>{
        setUser(dummyUserData)
    }
    const fetchUserChats = async ()=>{
        setChats(dummyChats)
        setSelectedChat(dummyChats[0])
    }
    useEffect(()=>{
        if ( theme === 'dark'){
            document.documentElement.classList.add('dark');
        }else{
             document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme',theme)
    },[theme]) //[theme] means run this code  everytime theme changes, we use document.documentElement because we apply theme globallly to entire page
    useEffect(()=>{
        if (user){
            fetchUserChats()
        }else{
            setChats([])
            setSelectedChat(null)
        }
    },[user])
    useEffect (()=>{
     fetchUser()
    },[])
     const value = {
        navigate,user,setUser,fetchUser,chats,setChats,selectedChat,setSelectedChat,theme,setTheme
     }
   return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
   )
}
export const useAppContext = () => useContext(AppContext) //It creates a custom hook to easily access your AppContext data anywhere in your app. useContext is a React Hook which is used to get data from a context.

