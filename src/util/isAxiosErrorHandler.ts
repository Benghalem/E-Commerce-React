import { isAxiosError } from "axios";
const isAxiosErrorHandler = (error: unknown) => {
    if(isAxiosError(error)){
        return error.response?.data.message || error.message
    } else {
        return "An unexpected error occured"
    }
}

export default isAxiosErrorHandler