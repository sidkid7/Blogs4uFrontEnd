import React from 'react'
import { NavLink as ReactLink, Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import { BASE_URL } from "../services/helper";

function Post(
    { post = {  title: "This is default post title", content: "This is default post content" } }) {
    return (

        <Link style={{ textDecoration: "none" }} tag={ReactLink} to={'/posts/' + post.postId} >
        <Card className='border-0 shadow-sm mt-3 '>

            <CardBody className='text-dark'>
                <h1>{post.title}</h1>
                
                
                <img className="img-fluid "
                style={{ maxWidth: "100%" , maxHeight:"500px" }}
                      src={BASE_URL + '/get/image/' + post.postId}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = "Background.png";
                      }}
                    />
                    
                   
                <CardText dangerouslySetInnerHTML={{ __html: post.content.substring(0, 300) + "...." }}>

                </CardText>

                <div>
                    <Link className='btn btn-secondary border-0' to={'/posts/' + post.postId}>Read More</Link>
                </div>
            </CardBody>
        </Card>
        </Link>

    )
}

export default Post