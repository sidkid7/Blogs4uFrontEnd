import Base from "../components/Base";
import { getCurrentUserDetail} from "../auth";
import { useEffect, useState } from "react";

const About = () => {

    const [user, setUser] = useState(undefined);

    useEffect(() => {
        setUser(getCurrentUserDetail());
        console.log(user)
      }, []);

    return (
        <Base>        
            <h1>AboutUs Page</h1> 
            
        </Base>
    );
  };
  
  export default About;
  