import { useState } from "react";
import { toast } from "react-toastify";
import {
  Label,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
  Button,
  CardFooter,
} from "reactstrap";
import Base from "../components/Base";
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import { Link, NavLink as ReactLink } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  //field will give value for respective change function

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };

  const handleReset = () => {
    setLoginDetail({
      username: "",
      password: "",
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetail);
    //validation  rmove spaces from 
    if (
      loginDetail.username.trim() == "" ||
      loginDetail.password.trim() == ""
    ) {
      toast.error("Username or Password  is required !!");
      return;
    }

    //submit the data to server to generate token
    loginUser(loginDetail)
      .then((data) => {
        console.log(data);

        //save the data to localstorage
        doLogin(data, () => {
          console.log("login detail is saved to localstorage");
          //redirect to user dashboard page
          navigate("/");
          location.reload();
        });

        toast.success("Login Success");
      })
      .catch((error) => {
        console.log(error);
        //400 bad reqest 404 details error.
        if (error.response.status == 400 || error.response.status == 404) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong  on sever !!");
        }
      });
  };

  return (
   
      <Container>
        <Row className="mt-4">
          <Col
            sm={{
              size: 6,
              offset: 0,
            }}
          >
            <Container className="mt-5">
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <Link style={{ textDecoration: "none" }} tag={ReactLink} to="/">
                <h1 className="text-warning">MyBlogs</h1>
              </Link>
              <p>
                <b>it helps you share your Knowledge,with the world.</b>
              </p>
            </Container>
          </Col>
          <Col
          //   sm={{
          //     size: 5,
          //     offset: 7,
          //   }}
          >
            <Container className="mt-5 col-11">
              <br></br>
              <br></br>
              <Card className="shadow p-3 mb-5 bg-white rounded">
                <CardBody>
                  <Form onSubmit={handleFormSubmit}>
                    {/* Email field */}
                    <br></br>

                    <FormGroup>
                      <Input
                        type="text"
                        id="email"
                        placeholder="Email address"
                        value={loginDetail.username}
                        onChange={(e) => handleChange(e, "username")}
                      />
                    </FormGroup>

                    {/* password field */}

                    <FormGroup>
                      <Input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={loginDetail.password}
                        onChange={(e) => handleChange(e, "password")}
                      />
                    </FormGroup>

                    <Container className="text-center">
                      <Button color="success">Login</Button>
                      <Button
                        onClick={handleReset}
                        className="ms-2"
                        color="secondary"
                      >
                        Reset
                      </Button>
                      <br></br>
                    </Container>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Container className="text-center">
                    <p>Don't have accout yet?</p>
                    <Link
                      style={{ textDecoration: "none" }}
                      tag={ReactLink}
                      to="/signup"
                    >
                      <Button color="warning">Create New Account</Button>
                    </Link>
                    <h6>&nbsp;</h6>
                  </Container>
                </CardFooter>
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>
   // </Base>
  );
};

export default Login;
