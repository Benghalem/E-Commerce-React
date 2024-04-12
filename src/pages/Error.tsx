//import Lottie from "lottie-react";
import { LottieHandler } from "@components/feadback";

//import notFound from "@assets/lottieFiles/notFound.json"

//import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom"
import { Link } from "react-router-dom"
import { Container } from "react-bootstrap"

const Error = () => {
  // old code
  /* const error = useRouteError();
  let errorStatus: number;
  let errorStatusText: string;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorStatusText = error.statusText;
  } else {
    errorStatus = 404;
    errorStatusText = "Page Not Found";
  } */

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center mt-5">
      <LottieHandler type="notFound" />
     {/*  <Lottie animationData={notFound} style={{ width: "600px" }} /> */}
      {/* <h1>{errorStatus}</h1>
      <p>{errorStatusText}</p> */}
      <Link to="/" replace={true}>
        How about going back to safety?
      </Link>
    </Container>
  );
}

export default Error