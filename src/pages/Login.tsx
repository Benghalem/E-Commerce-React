
import { Navigate } from "react-router-dom";
//LINK - Login Hook
import  useLogin  from "@hooks/useLogin"
// import components
import { Heading } from '@components/common';
import {Button, Form, Row, Col, Alert, Spinner} from 'react-bootstrap/';
import { Input } from "@components/forms";
const Login = () => {
  // import data from useLogin
  const { register, handleSubmit,error , submitForm, searchParams, accessToken, formErrors,loading } = useLogin();  

  // protect login page  if user already logged in
  if(accessToken ){
    return <Navigate to="/"/>
  }
  return (
    <>
    <Heading title="User Register" />
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        {/*  search params message   */}
        { searchParams.get("message") === "login_required" && (
        <Alert variant="success">
          Your need to login to  view this content
        </Alert> )
        } 
        {/*  search params message  */}
        { searchParams.get("message") === "account_created successfully" && (
        <Alert variant="success">
          Your account has been created successfully
        </Alert> )
        } 
        <Form onSubmit={handleSubmit(submitForm)}>
          {/* register your input email */}
          <Input label="Email Address" name="email" register={register} errors={formErrors.email?.message}/>
          {/* register your input password */}
          <Input label="Password" name="password" type="password" register={register} errors ={formErrors.password?.message}/>
          {/* submit button */}
          <Button variant="info"  type="submit"  style={{ color: "white" }} >
            {/* loading spinner when pending status */}
            { loading === "pending" ?  (
              <>
                <Spinner animation="border" size="sm" /> Loading... 
              </>
              ) : ( 
                "Submit"
              )
            }
          </Button>
          {/* error message */}
          {error && <p className="text-danger" style={{ color: "#0DC3545", marginTop: "10px"}}>{error}</p>}
        </Form>
      </Col> 
    </Row>
  
  </>
  )
}

export default Login