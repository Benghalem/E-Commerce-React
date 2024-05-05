import { useEffect } from "react";
// act Auth Register 
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { actAuthRegister, resetUI } from "@store/auth/authSlice"
import { useNavigate } from "react-router-dom"
// react hook form 
import { useForm, SubmitHandler } from "react-hook-form"
// zed validation schema
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema, signUpType } from "@validations/signUpSchema"
// hook for email validation
import  useCheckEmailAvailabilty  from "@hooks/useCheckEmailAvailabilty"

const useRegister = () => {
      // navigate to register page
  const navigate = useNavigate()
  // dispatch auth register
  const dispatch = useAppDispatch()
  // handel use loading and error
  const {loading, error, accessToken} = useAppSelector((state) => state.auth)
  // register your input
  const { 
    register, 
    handleSubmit, 
    getFieldState,
    trigger,
    formState: { errors: formErrors }
  } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema)
  });
  // handle form submission 
  const submitForm: SubmitHandler<signUpType> = async (data) => {
    // dispatch auth register
    // we just need to pass firstName, lastName, email, password
    const {firstName, lastName, email, password} = data
    dispatch(actAuthRegister({firstName, lastName, email, password}))
    // navigate to login
    .unwrap()
    .then(() => {
      navigate('/login?message=account_created successfully')
    })
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
  // reset ui error message  login and register null
  useEffect(() => {
    return () => {
      dispatch(resetUI())
    }
  },[dispatch])
  return {
    loading, error, accessToken, formErrors,
    register, 
    handleSubmit, 
    emailAvailabiltyStatus,
    emailOnBlurHandler,
    submitForm
  }
}

export default useRegister