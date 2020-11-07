import React, {useState, useEffect} from "react";
import { submitFile } from '../../api/uploads/uploads';
import { updateUserAvatar } from '../../api/users/users';

const FileUpload = ({ dataHandler, stateHandler, user }) => {
    const [file, setFile] = useState(null);

    useEffect(() => {
        if(file) {
            submitFile(file)
            .then((response)=>{
                dataHandler({user, fileUrl: response.data.Location})
                .then(response => {
                    console.log("updated user with image", response);
                    stateHandler(response.data)
                })
            })
        }
    }, [file])

    return (
        <>
            <input
            id="file-upload"
            type="file"
            onChange={e => setFile(e.target.files)}
            style={{visibility: 'hidden'}}
            />
        </>
    );
};


export default FileUpload;
