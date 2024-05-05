import { useEffect } from "react";
// description: Login Page
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { actAuthLogin, resetUI } from "@store/auth/authSlice"
//  search params message
import { useSearchParams, useNavigate } from "react-router-dom";
// hook for email validation
import { useForm, SubmitHandler } from "react-hook-form"
// zed validation schema
import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema, signInType } from "@validations/signInSchema"
// import components

const useLogin = () => {
    // dispatch auth login
  const dispatch = useAppDispatch()
  // navigate to login page
  const navigate = useNavigate()
  // get search params 
  const [searchParams, setSearchParams] = useSearchParams()
// handel auth login error message
  const {error, loading, accessToken } = useAppSelector((state) => state.auth)
  // register your input
  const {
    register, 
    handleSubmit, 
    formState: { errors: formErrors } 
  } = useForm<signInType>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema)
  })
   // handle form submission 
  const submitForm: SubmitHandler<signInType> =async (data) => {
    // remove search params message when form submitted login
    if(searchParams.get("message")){ 
      setSearchParams("")
    }
    // dispatch auth login
    dispatch(actAuthLogin(data)) 
    .unwrap()
    .then(() => 
      // navigate to login
      navigate('/'))
  }
  // reset ui error message  login and register null
  useEffect(() => {
    return () => {
      dispatch(resetUI())
    }
  },[dispatch])

  return {
    error, loading, accessToken, formErrors, searchParams,
    register, 
    handleSubmit,  
    submitForm,

  }
}

export default useLogin