import React from "react";
import styled from "styled-components";
import {ProfileField} from '../../Field/Field';
import Avatar from './Avatar';
import "./Profile.css";



const ProfileDiv = ({ className, editing, user }) => {
  return (
    <div className={className}>
      <Avatar user={user}/>
      <h3>{user.firstName} {user.lastName}</h3>
      <ProfileField type="number" field="age" editable={editing} value={user.age}/>
      <ProfileField type="text" field="gender" editable={editing} value={user.gender}/>
      <ProfileField type="text" field="city" editable={editing} value={user.city}/>
    </div>
  );
};

const Profile = styled(ProfileDiv)`
  min-height: 40%;
  min-width: 50%;
  text-align: center;
  margin: 15% auto;
  font-family: "David Libre", serif;
`;
export default Profile;
