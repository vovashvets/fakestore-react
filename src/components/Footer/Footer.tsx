import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  position: relative;
  padding: 30px;
  box-shadow: -1px -1px 5px #9e9e9e;
  background-color: #1976d2;
`

export function Footer() {
  return (
    <StyledFooter>
      Some footer data here
    </StyledFooter>
  )
}