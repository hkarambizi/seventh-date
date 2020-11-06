import React, {useState, useEffect } from 'react';
import Profile from './Profile';
import { getUser } from '../../../api/users/users.js'
const UserProfile = (props) => {
    // set intial state
    const [isLoggedIn, setLoggedIn] = useState(null);
    const [user, setUser] = useState({});
    //  load user
    useEffect(()=> {
        getUser("5ee9b62509c5ce4bb658ea98")
        .then((userData) => {
            setUser(user => {
                return {
                    ...user,
                    ...userData
                }
            });
        })
    },[])



    return (
        <div className="user-profile">
            <Profile user={user}/>
        </div>
    )

    // DOM elements/components: Avatar, Details, Options
}
export default UserProfile;
