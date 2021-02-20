import React, { createContext , useReducer } from 'react'
import UserReducer from './UserReducer'
// import axios from 'axios';

const initialStat={
    users: [
        {id:1, name:AAAA},
        {id:2, name:SSSS},
        {id:3, name:DDDD}
    ]
}


    //Create Context
    export const UserContext = createContext(getAllUser)

    //Provider Component
    export const UserProvider=({children})=>{
        const [state, dispatch] = useReducer(reducer, initialState)
    }

    //Actions
    const removeUser=(id)=>{
        dispatch({
            type:'REMOVE_USER',
            payload:id
        })
    }


    // const getAllUser=()=>{
    //     axios.get('https://localhost:44384/api/users')
    //     .then(res=> {
    //      console.log(res.data);
    //     })
    //     .catch(err=>console.error(err))
    // }
    return (
        <UserContext.Provider value={{
            users:state.getAllUser,
            removeUser
        }}>
            {children}
        </UserContext.Provider>
    )

// export default UserState
