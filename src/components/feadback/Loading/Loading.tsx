import { TLoading } from "@costopTypes/share"


type LoadungProps = {
    status: TLoading;
    error : null | string;
    children: React.ReactNode
}
const Loading = ( {status, error, children} : LoadungProps) => {
    if(status === "pending") {
        return(
            <p>loading please wait</p>
        )
    }
    if(status === "failed"){
        return(
            <p>{error}</p>
        )
    }
    return (
    <>{children}</>
    )
}

export default Loading