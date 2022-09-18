import { useContext, useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import Base from "../components/Base";
import { createComment, loadPost } from "../services/post-service";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";
import { isLoggedIn } from "../auth";
import userContext from "../context/userContext";


const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  
  //context Comment user name
  // const [name,setUser] = useState("")
  // const user = useContext(userContext);
  // let user2=user.name;
  // console.log(user2)


  
  const [comment, setComment] = useState({
    content: " ",
  });

  useEffect(() => {
    // load post of postId
    //setUser(user2)
    loadPost(postId)
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading post");
      });
  }, []);

  const printDate = (numbers) => {
    return new Date(numbers).toLocaleDateString();
  };

  const submitPost = () => {
    if (!isLoggedIn()) {
      toast.error("Need to login first !!");
      return;
    }

    if (comment.content.trim() === "") {
      return;
    }
    createComment(comment, post.postId)
      .then((data) => {
        console.log(data);
        toast.success("comment added ..");
        setPost({
          ...post,
          comments: [...post.comments, data.data],
        });
        setComment({
          content: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Base>
      <Container className="mt-4">
      <br></br>
        <Link to="/">Home</Link> / {post && <Link to=""> {post.category.categoryTitle} </Link>}
        <Row>
          <Col
            md={{
              size: 12,
            }}
          >
            <Card className="mt-3 ps-2 border-0 shadow-sm">
              {post && (
                <CardBody>
                  <CardText>
                    {" "}
                    Posted By <b>{post.user.name}</b> on{" "}
                    <b>{printDate(post.addedDate)} </b>{" "}
                  </CardText>

                  <CardText>
                    <span className="text-muted">
                      {post.category.categoryTitle}
                    </span>
                  </CardText>

                  <div
                    className="divder"
                    style={{
                      width: "100%",
                      height: "1px",
                      background: "#e2e2e2",
                    }}
                  ></div>

                  <CardText className="mt-3">
                    <h1>{post.title}</h1>
                  </CardText>
                  {/* <div
                    className="image-container  mt-4 shadow  "
                    style={{ maxWidth: "50%" }}
                  > */}
                    {/* <img className="img-fluid" id="foo" src={BASE_URL + '/get/image/' + postId} /> */}

                    <img className="img-fluid mt-4 shadow"
                    style={{ maxWidth: "100%" , maxHeight:"500px" }}
                      src={BASE_URL + '/get/image/' + postId}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = "https://i.ibb.co/ngyckYP/ebook.jpg";
                      }}
                    />

                    {/* <img className="img-fluid" src={"https://i.ibb.co/GtQDBrN/luigi-pozzoli-Db8x-EYwtd-Ww-unsplash-3.jpg"} alt="" /> */}
                  {/* </div> */}
                  <CardText
                    className="mt-5"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></CardText>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
        <Row className="my-4">
          <Col
            md={{
              size: 9,
              offset: 1,
            }}
          >
            <h3>Comments ( {post ? post.comments.length : 0} )</h3>

            {post &&
              post.comments.map((c, index) => (
                <Card className="mt-4 border-0" key={index}>
                  <CardBody>
                    <CardText>{c.content}</CardText>
                  </CardBody>
                </Card>
              ))}

            <Card className="mt-4 border-0">
              <CardBody>
                <Input
                  type="textarea"
                  placeholder="Enter comment here"
                  value={comment.content}
                  onChange={(event) =>
                    setComment({ content: event.target.value })
                  }
                />

                <Button onClick={submitPost} className="mt-2" color="primary">
                  Submit
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default PostPage;
