import React, { useContext, useEffect, useState } from "react";
import { Router, useNavigate } from "react-router-dom";
import { getCurrentUserDetail, isLoggedIn } from "../../auth";
import Base from "../../components/Base";
import Post from "../../components/Post";
import userContext from "../../context/userContext";
import { deletePostById, getPostByUserId } from "../../services/post-service";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Row,
  Col,
  Button
} from "reactstrap";



const ProfileInfo = () => {

  const navigate = useNavigate();
  const user = useContext(userContext);
  console.log(user);

  const [postContent, setPostContent] = useState([]);

  useEffect(() => {
    getPostByUserId(user.id).then((data) => {
      console.log(data);
      setPostContent(data);
    });
  }, []);

  const deletePost=(event)=>{
    console.log(event.target.value)
    
    deletePostById(event.target.value)
    .then(response => toast.success("Post deleted successfully")) 
    
    .catch(error => {
        toast.error('There was an error!', error);
    });
   navigate("/")
}


//Test API
  //const [posts, setPost] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/posts")
  //     .then((response) => {
  //       console.log(response.data);
  //       setPost(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <Base>
    <div className="container-fluid pt-5 pe-1 ps-1">
      <Row>
        <Col
          md={{
            size: 10,
            offset: 1,
          }}
        >
      <div>
      <h1>Welcome {user.name} </h1>
      <h5>email:{user.email}</h5>
      <h5>about:<small>{user.about}</small></h5>
      <h1>All posts By you so far( {postContent.length} )</h1>
      </div>

      {/* //Test API */}
      {/* <div>
        <ol>
          {
            //map is used for iterating
            posts.map((post) => (
              <li key={post.id}>{post.title}<button>delete</button></li>
             // <li>{post.title}</li>
            ))
          }
        </ol>
      </div> */}

      <div>
        <ol reversed>
          {
            //map is used for iterating
            postContent.map((post) => (
              <li key={post.id}>
                <h6>{post.title}</h6>
                {/* &nbsp;&nbsp;&nbsp;&nbsp; */}

                <Button className="d-flex" color="danger" value={post.postId} onClick={deletePost}>delete</Button><br/>

              </li>
              // <li>{post.title}</li>
            ))
          }
        </ol>

        {/* Using defalut Post format */}
        {/* {postContent.map((post) => (
              <Post>post={post} key={post.postId} </Post> //Post fuction is called here to display data.
            ))} */}
      </div>

      {/* <div>
      {postContent.map(data => (
        <p>{data.postId}</p>
      ))} */}
      {/* </div> */}
      </Col>
      </Row>
    </div>
    </Base>
  );
};

export default ProfileInfo;
