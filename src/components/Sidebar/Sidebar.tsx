import React from 'react';
import styled from 'styled-components';

const StyledSidebar = styled.div`
  padding: 0 25px;
  background-color: #fbfbfb;
  box-shadow: 1px 1px 9px 0 #d1d1d1;
`;

export function Sidebar(props: any) {
  return (
    <StyledSidebar>
      {props.children}
    </StyledSidebar>
  );
}
