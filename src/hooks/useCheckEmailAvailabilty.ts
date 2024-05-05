import { useState } from "react";
import axios from "axios";

type TStatus = "idle" | "checking" | "available"| "notAvailable" | "failed"
const useCheckEmailAvailabilty = () => {
    const [emailAvailabiltyStatus, setEmailAvailabiltyStatus] = useState<TStatus>("idle")

    const [enteredEmail, setEnteredEmail] = useState<null | string>(null)

    const checkEmailAvailabilty = async (email: string) => {
        setEnteredEmail(email)
        setEmailAvailabiltyStatus("checking")
        try {
            const response = await axios.get(`http://localhost:5005/users?email=${email}`)
            // check if email is not in use
            if(!response.data.length) {
                setEmailAvailabiltyStatus("available")
            } else {
                setEmailAvailabiltyStatus("notAvailable")
            }
        } catch (error) {
            setEmailAvailabiltyStatus("failed")
        }
    }
    const resetCheckEmailAvailabilty = () => {
        setEmailAvailabiltyStatus("idle")
        setEnteredEmail(null)
    }
    return { 
        checkEmailAvailabilty, 
        emailAvailabiltyStatus, 
        enteredEmail,
        resetCheckEmailAvailabilty 
    }
}

export default useCheckEmailAvailabilty