import { Form  } from 'react-bootstrap/';
import { Path, FieldValues, UseFormRegister } from 'react-hook-form';


// type generic between input and output form values
type InputProps<TFieldValue extends FieldValues> = {
    label: string
    name: Path<TFieldValue>
    type?: string
    register: UseFormRegister<TFieldValue>
    errors?: string
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    formText?: string,
    success?: string,
    disabled?: boolean
}
const Input =<TFieldValue extends FieldValues> ({
    label,
    type= "text", 
    register,
    name, 
    errors,
    onBlur,
    formText,
    success,
    disabled
}: InputProps<TFieldValue>) => {
    // email on blur handler check email validation
    const emailOnBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        if(onBlur){
            onBlur(e)
            register(name).onBlur(e)
        } else {
            register(name).onBlur(e)
        }
    }
  return (
    <Form.Group className="mb-3" >
        <Form.Label>{label}</Form.Label>
        <Form.Control 
            type={type}  
            {...register(name)}
            onBlur={emailOnBlurHandler}
            isInvalid= {errors ? true : false}
            isValid= {success? true : false }
            disabled= {disabled}
    />
        {/* feedback message input error */}
        <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
        <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>
        {/* affich merssag about email if is courect */}
        { formText && <Form.Text muted> {formText}</Form.Text> }
    </Form.Group>
    )
}

export default Input