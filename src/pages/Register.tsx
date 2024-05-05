import { Navigate } from "react-router-dom"
// import hooks useRegister
import useRegister from "@hooks/useRegister";
// import components
import { Heading } from '@components/common';
import {Button, Form, Row, Col, Spinner} from 'react-bootstrap/';
import { Input } from "@components/forms";



const Register = () => {
  // git data from useRegister
  const { loading, error, accessToken, formErrors,
          register, 
          handleSubmit, 
          emailAvailabiltyStatus,
          emailOnBlurHandler,
          submitForm } = useRegister()

   // protect register page  if user already logged in
   if(accessToken){
    return <Navigate to="/" />
  }

  return (
    <>
      <Heading title="User Registration" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
          {/* register your input first name */}
            <Input label="First Name" name="firstName" register={register} errors={formErrors.firstName?.message}/>

          {/* register your input last name */}
          <Input label="Lest Name" name="lastName" register={register} errors={formErrors.lastName?.message}/>

          {/* register your input email */}
          <Input 
            label="Email Address" 
            name="email" 
            register={register} 
            onBlur={emailOnBlurHandler}
            errors={formErrors.email?.message ? formErrors.email
              ?.message : emailAvailabiltyStatus ===  "notAvailable"
              ? " This email is already in use"
              : emailAvailabiltyStatus === "failed"? "Error from the server" : ""
            } 
            formText= {
              emailAvailabiltyStatus === "checking"
              ? "We're currently chacking the availability of this email address"
              : ""
            }
            /* email success */
            success = {
              emailAvailabiltyStatus === "available"
              ? " This email is available for use"
              : ""
            }
            /*  */
            disabled = {emailAvailabiltyStatus === "checking"? true : false}
          />

          {/* register your input password */}
          <Input label="Password" name="password" type="password" register={register} errors={formErrors.password?.message}/>

          {/* register your input confirm password */}
          <Input label="Confirm Password" name="confirmPassword" type="password" register={register} errors={formErrors.confirmPassword?.message}/>

          {/* submit button */}
            <Button 
                variant="info" 
                type="submit" 
                style={{ color: "white" }} 
                disabled= {
                  emailAvailabiltyStatus === "checking"
                    ? true 
                    : false || loading === "pending"
                }
            >
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

export default Register