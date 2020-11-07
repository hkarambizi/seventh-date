import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import Image from "../../Image/Image";
import FileUpload from '../../FileUpload/FileUpload';
import { updateUserAvatar } from '../../../api/users/users';

const ImageDiv = ({ className, user , setUserState }) => {

const triggerFileSelect = () => {
    document.getElementById('file-upload').click();
}
const content = (
    <div className={className}>
        <Image user={user}/>
        <div className="edit-option">
        <FontAwesomeIcon icon={faEdit} onClick={()=> triggerFileSelect()}/>
        <FileUpload user={user} dataHandler={updateUserAvatar} stateHandler={setUserState}/>
      </div>
    </div>
);
  return user ? content : null;
};

const Avatar = styled(ImageDiv)`
  font-family: "David Libre", serif;
  width: 15em;
  text-align: center;
  margin: 0 auto;
`;
export default Avatar;
