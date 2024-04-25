import { useForm, SubmitHandler } from "react-hook-form"
// zed validation schema
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema, signUpType } from "@validations/signUpSchema"
// hook for email validation
import  useCheckEmailAvailabilty  from "@hooks/useCheckEmailAvailabilty"
// import components
import { Heading } from '@components/common';
import {Button, Form, Row, Col} from 'react-bootstrap/';
import { Input } from "@components/forms";
import React from "react";


const Register = () => {
  // register your input
  const { 
    register, 
    handleSubmit, 
    getFieldState,
    trigger,
    formState: { errors }
  } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema)
  });
  // handle form submission 
  const submitForm: SubmitHandler<signUpType> = (data) => {
    console.log(data)
  }
  // check email validation
  const {
    checkEmailAvailabilty, 
    emailAvailabiltyStatus, 
    enteredEmail, 
    resetCheckEmailAvailabilty
  } = useCheckEmailAvailabilty()

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email")
    const value = e.target.value
    const { isDirty, invalid } = getFieldState("email")
    // if isDirty and not invalid and enteredEmail is not equal to value
    if(isDirty && !invalid && enteredEmail !== value) {
      // checking
      checkEmailAvailabilty(value)    
    }
    // dont show me tow messag error
    if( isDirty && invalid && enteredEmail) {
      resetCheckEmailAvailabilty()
    }

  }

  return (
    <>
      <Heading title="User Registration" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
          {/* register your input first name */}
            <Input label="First Name" name="firstName" register={register} errors={errors.firstName?.message}/>

          {/* register your input last name */}
          <Input label="Lest Name" name="lastName" register={register} errors={errors.lastName?.message}/>

          {/* register your input email */}
          <Input 
            label="Email Address" 
            name="email" 
            register={register} 
            onBlur={emailOnBlurHandler}
            errors={errors.email?.message? errors.email
              ?.message: emailAvailabiltyStatus ===  "notAvailable"
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
          <Input label="Password" name="password" type="password" register={register} errors={errors.password?.message}/>

          {/* register your input confirm password */}
          <Input label="Confirm Password" name="confirmPassword" type="password" register={register} errors={errors.confirmPassword?.message}/>

          {/* submit button */}

            <Button variant="info" type="submit" style={{ color: "white" }} disabled= {emailAvailabiltyStatus === "checking"? true : false}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    
    </>
    
  )
}

export default Register