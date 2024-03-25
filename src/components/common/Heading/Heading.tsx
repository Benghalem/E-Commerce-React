import { memo  } from "react";

const Heading = memo( 
  ({ title }: { title: string }) => {
  console.log("heading")
    return (
      <h2 className="mb-3" style={{ fontSize: "26px" }}>
        {title}
      </h2>
    );
  });
  
  export default Heading;