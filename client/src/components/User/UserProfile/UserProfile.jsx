import React, {useState, useEffect } from 'react';
import Profile from './Profile';
import { getUser } from '../../../api/users/users.js'
const UserProfile = ({match: {params}}) => {
    // set intial state
    const [isLoggedIn, setLoggedIn] = useState(null);
    const [user, setUser] = useState({});
    //  load user
    useEffect(()=> {
        getUser(params.userId)
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
