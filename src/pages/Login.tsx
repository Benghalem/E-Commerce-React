import { useForm, SubmitHandler } from "react-hook-form"
// zed validation schema
import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema, signInType } from "@validations/signInSchema"
// import components
import { Heading } from '@components/common';
import {Button, Form, Row, Col} from 'react-bootstrap/';
import { Input } from "@components/forms";
const Login = () => {
  // register your input
  const {
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<signInType>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema)
  })
   // handle form submission 
   const submitForm: SubmitHandler<signInType> = (data) => {
    console.log(data)
  }
  return (
    <>
    <Heading title="User Register" />
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <Form onSubmit={handleSubmit(submitForm)}>
          {/* register your input email */}
          <Input label="Email Address" name="email" register={register} errors={errors.email?.message}/>
          {/* register your input password */}
          <Input label="Password" name="password" type="password" register={register} errors ={errors.password?.message}/>
          {/* submit button */}
          <Button variant="info" type="submit" style={{ color: "white" }}>
            Submit
          </Button>
        </Form>
      </Col> 
    </Row>
  
  </>
  )
}

export default Login