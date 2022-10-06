import React from "react";
import './Sidebar.css';
import {CategoryFilter} from "../CategoryFilter/CategoryFilter";
import {useLocation} from "react-router-dom";

export function Sidebar() {
  const {pathname} = useLocation();

  return (
    <div className={'sidebar-block'}>
      {pathname === '/products'
        ? <CategoryFilter />
        : <>
          <h4>Some news</h4>
          <p>
            Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.
            Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla quis lorem ut libero malesuada feugiat.
            Proin eget tortor risus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
            Donec sollicitudin molestie malesuada. Quisque velit nisi, pretium ut lacinia in, elementum id enim.
          </p>
        </>
      }

    </div>
  )
}