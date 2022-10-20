import React from 'react';
import {Outlet, useOutlet} from "react-router";

export const Home = () => {
  const outlet = useOutlet();

  return outlet ? <Outlet/> : (
    <>
      <h2>Home page</h2>
      <p>
        Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
        Donec rutrum congue leo eget malesuada. Pellentesque in ipsum id orci porta dapibus.
      </p>
      <p>
        Sed porttitor lectus nibh. Donec rutrum congue leo eget malesuada. Proin eget tortor risus.
        Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Sed porttitor lectus nibh.
        Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
      </p>
      <p>
        Nulla quis lorem ut libero malesuada feugiat. Nulla porttitor accumsan tincidunt.
        Cras ultricies ligula sed magna dictum porta. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
        Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
      </p>
      <p>
        Pellentesque in ipsum id orci porta dapibus. Cras ultricies ligula sed magna dictum porta.
        Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Nulla porttitor accumsan tincidunt.
        Quisque velit nisi, pretium ut lacinia in, elementum id enim. Sed porttitor lectus nibh.
        Cras ultricies ligula sed magna dictum porta.
      </p>
      <img src="https://cdn.britannica.com/80/150980-050-84B9202C/Giant-panda-cub-branch.jpg" alt="panda"/>
      <p>
        Sed porttitor lectus nibh. Donec rutrum congue leo eget malesuada. Proin eget tortor risus.
        Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Sed porttitor lectus nibh.
        Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
      </p>
      <p>
        Nulla quis lorem ut libero malesuada feugiat. Nulla porttitor accumsan tincidunt.
        Cras ultricies ligula sed magna dictum porta. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
        Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
      </p>
      <p>
        Pellentesque in ipsum id orci porta dapibus. Cras ultricies ligula sed magna dictum porta.
        Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Nulla porttitor accumsan tincidunt.
        Quisque velit nisi, pretium ut lacinia in, elementum id enim. Sed porttitor lectus nibh.
        Cras ultricies ligula sed magna dictum porta.
      </p>
    </>
  );
}
