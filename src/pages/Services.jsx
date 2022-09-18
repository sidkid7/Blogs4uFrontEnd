import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { loadAllPosts } from "../services/post-service";
import { Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import Base from "../components/Base";
import Post from "../components/Post";
import { loadPostByCat } from "../services/post-service";
import "./Services.css";
const Services = () => {
  //defining postContent
  

  return (
    <Base>
      <h1>Services page</h1>
    </Base>
  );
};

export default Services;
