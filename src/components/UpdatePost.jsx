import { useState } from "react";
import { useEffect } from "react";
import {
  Card,
  CardBody,
  Form,
  Input,
  Label,
  Button,
  Container,
} from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import { createPost as doCreatePost,updatePostById, uploadPostImage } from "../services/post-service";
import { getCurrentUserDetail } from "../auth";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
const UpdatePost = () => {


    //to get postId from profile info
    const [searchParams] = useSearchParams();
    const postId = searchParams.get("postId");
    //console.log(postId);

  const editor = useRef(null);
  // const [content,setContent] =useState('')
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(undefined);
  const [image,setImage] = useState(null);

  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: ""
  });

  
  // const config={
  //     placeholder:"Start typing...",

  // }

 

  useEffect(() => {
    setUser(getCurrentUserDetail());
    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //field changed function
  const fieldChanged = (event) => {
    // console.log(event)
    setPost({ ...post, [event.target.name]: event.target.value });
  };

   //   file change uplad event
   const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
  };

  const contentFieldChanaged = (data) => {
    setPost({ ...post, content: data });
  };

  //create post function
  const createPost = (event) => {
    event.preventDefault();

    // console.log(post)
    if (post.title.trim() === "") {
      toast.error("post  title is required !!");
      return;
    }

    if (post.content.trim() === "") {
      toast.error("post content is required !!");
      return;
    }

    if (post.categoryId === "") {
      toast.error("select some category !!");
      return;
    }

    //submit the form one server
    // post["postId"] = user.id;
   // console.log(postId+"Inside");
    post["postId"] = postId;
    updatePostById(post)
      .then((data) => {
        uploadPostImage(image, data.postId)
          .then(data => {
            toast.success("Image uploaded.")
          })
        //   .catch(error => {
        //     toast.error("Error in uploading")
        //     console.log(error)
        //   })
        toast.success("Post Created !!");
        // console.log(post)

        setPost({
          title: "",
          content: "",
          categoryId: "",
        });
      })
      .catch((error) => {
        toast.error("Post not created due to some error !!");
        console.log(error)
      });
  };

  

  return (
    <div className="wrapper pt-5">
      <Card className="shadow-sm  border-0 mt-2">
        <CardBody>
          {/* {JSON.stringify(post)} */}
          <h3>Update your post</h3>
          <Form onSubmit={createPost}>
            <div className="my-3">
              <Label for="title">Post title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter here"
                className="rounded-0"
                name="title"
                onChange={fieldChanged}
              />
            </div>

            <div className="my-3">
              <Label for="content">Post Content</Label>
              {/* <Input
                                type="textarea"
                                id="content"
                                placeholder="Enter here"
                                className="rounded-0"
                                style={{ height: '300px' }}
                            /> */}

              <JoditEditor
                ref={editor}
                value={post.content}
                onChange={(newContent) => contentFieldChanaged(newContent)}
              />
            </div>
            {/* file filed */}
            <div className="mt-3">
              <Label for="image">Select Cover image</Label>
              <Input id="image" name="image" type="file" onChange={handleFileChange} />
            </div>

            <div className="my-3">
              <Label for="category">Post Category</Label>
              <Input
                type="select"
                id="category"
                placeholder="Enter here"
                className="rounded-0"
                name="categoryId"
                onChange={fieldChanged}
                defaultValue={0}
              >
                <option disabled value={0}>
                  --Select category--
                </option>

                {categories.map((category) => (
                  <option value={category.categoryId} key={category.categoryId}>
                    {category.categoryTitle}
                  </option>
                ))}
              </Input>
            </div>

            <Container className="text-center">
              <Button type="submit" className="rounded-0" color="success">
                Update Post
              </Button>
              <Button type="reset" className="rounded-0 ms-2" color="secondary" >
                Reset Content
                
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default UpdatePost;
