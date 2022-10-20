import React from "react";
import './Sidebar.css';

export function Sidebar(props: any) {

  return (
    <div className='sidebar'>
      {props.children}
    </div>
  )
}