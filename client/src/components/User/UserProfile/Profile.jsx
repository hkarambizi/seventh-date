import React from "react";
import styled from "styled-components";
import {EditableProfileField} from '../../Field/Field';
import "./Profile.scss";



const ProfileDiv = ({ className, editing, user }) => {
  return (
    <div className={className}>
      <h3>{user.firstName} {user.lastName}</h3>
      <EditableProfileField type="number" field="age" />
      <EditableProfileField type="text" field="gender" />
      <EditableProfileField type="text" field="location" />
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
