import React from "react";
import styled from "styled-components";
const Img = ({ className, user }) => {
    const { firstName, lastName } = user;
    const fullName = `${firstName} ${lastName}`;
  return (
    <img
      className={className}
      alt={fullName}
      src={user.avatar}
    />
  );
};

const Image = styled(Img)`
  width: 15em;
  box-shadow: 3px 3px 3px black;
  border-radius: 50%;
  border: 2px solid black;
`;
export default Image;
