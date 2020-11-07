import React from "react";
import styled from "styled-components";
import Image from "../../Image/Image";

const ImageDiv = ({ className, user }) => {
  return (
    <div className={className}>
      <Image user={user}></Image>
    </div>
  );
};

const Avatar = styled(ImageDiv)`
  font-family: "David Libre", serif;
`;
export default Avatar;
