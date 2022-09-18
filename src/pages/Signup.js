import { useEffect } from "react";
import { useState } from "react";
import { signUp } from "../services/user-service";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { Link, NavLink as ReactLink, useNavigate } from "react-router-dom";
import Base from "../components/Base";
const Signup = () => {
  const navigate=useNavigate()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  // handle change
  const handleChange = (event, property) => {
    //dynamic setting the values
    setData({ ...data, [property]: event.target.value });
  };

  //reseting the form
  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };

  //submit the form
  const submitForm = (event) => {
    event.preventDefault();
    
    // if(error.isError){
    //   toast.error("Form data is invalid , correct all details then submit. ");
    //   setError({...error,isError:false})
    //   return;
    // }

    console.log(data);
    //data validate

    //call server api for sending data
    signUp(data)
      .then((resp) => {
        console.log(resp);
        console.log("success log");
        toast.success("registered successfully !! Welcome " + resp.name+"\n Please login to continue");
        setData({
          name: "",
          email: "",
          password: "",
          about: "",
        });
        navigate("/user/dashboard")
      })
      .catch((error) => {
        console.log(error);
        console.log("Error log");
        //handle errors in proper way
        setError({
          errors: error,
          isError: true,
        });
      });
  };

  return (
    
    <Container>
      <Row>
        <Col sm={{ size: 6, offset: 3 }}>
          <Container className="text-center mt-4 mb-4">
            <Link style={{ textDecoration: "none" }} tag={ReactLink} to="/">
              <h1 className="text-warning text-center">
                <b>MyBlogs</b>
              </h1>
            </Link>
          </Container>
          <Card className="shadow p-3 mb-5 bg-white rounded">
            <CardHeader className="text-center">
              <h5>
                <b>Create a new account</b>
              </h5>
              It's quick and easy.
            </CardHeader>

            <CardBody>
              {/* creating registerbody */}
              <Form onSubmit={submitForm}>
                {/* namefild */}
                <FormGroup>
                  <Input
                    type="text"
                    placeholder="Name"
                    id="name"
                    onChange={(e) => handleChange(e, "name")}
                    value={data.name}
                    invalid={error.errors?.response?.data?.name ? true : false}
                  />

                  <FormFeedback>
                    {error.errors?.response?.data?.name}
                  </FormFeedback>
                </FormGroup>

                {/* Emailfild */}
                <FormGroup>
                  <Input
                    type="email"
                    placeholder="Email address"
                    id="email"
                    onChange={(e) => handleChange(e, "email")}
                    value={data.email}
                    invalid={error.errors?.response?.data?.email ? true : false}
                  />
                  <FormFeedback>
                    {error.errors?.response?.data?.email}
                  </FormFeedback>
                </FormGroup>

                {/* Passwordfild */}
                <FormGroup>
                  <Input
                    type="password"
                    placeholder="New Password"
                    id="password"
                    onChange={(e) => handleChange(e, "password")}
                    value={data.password}
                    invalid={
                      error.errors?.response?.data?.password ? true : false
                    }
                  />

                  <FormFeedback>
                    {error.errors?.response?.data?.password}
                  </FormFeedback> 
                </FormGroup>

                {/* about field */}
                <FormGroup>
                  <Label for="about">Write something about yourself</Label>
                  <Input
                    type="textarea"
                    placeholder="Enter here"
                    id="about"
                    style={{ height: "100px" }}
                    onChange={(e) => handleChange(e, "about")}
                      value={data.about}

                      //eror handlling
                      invalid={
                        error.errors?.response?.data?.about ? true : false
                      }
                  />

                  //display errors on form
                  <FormFeedback>
                      {error.errors?.response?.data?.about}
                    </FormFeedback>
                </FormGroup>
                <Container className="text-center">
                  <Button color="success">Register</Button>
                  <Button
                    onClick={resetData}
                    color="secondary"
                    type="reset"
                    className="ms-2"
                  >
                    Reset
                  </Button>
                </Container>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    //</Base>
  );
};

export default Signup;
