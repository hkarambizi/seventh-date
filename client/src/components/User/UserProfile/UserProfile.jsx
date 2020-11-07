import React, {useState, useEffect } from 'react';
import Profile from './Profile';

import { getUser } from '../../../api/users/users.js'
const UserProfile = ({match: {params}}) => {
    // set intial state
    const [user, setUser] = useState({});
    //  load user
    useEffect(()=> {
        getUser(params.userId)
        .then((userData) => {
            setUser(prevUser => {
                return {
                    ...prevUser,
                    ...userData
                }
            });
        })
    },[])

    const updateUser = (updatedUser) => {
        setUser(prevUser => {
            return {
                ...prevUser,
                ...updatedUser
            }
        });
    }


    return (
        <div className="user-profile">

            <Profile user={user} updateProfileHandler={updateUser}/>

        </div>
    )


}
export default UserProfile;
