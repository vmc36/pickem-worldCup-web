import { Field, ErrorMessage } from 'formik'

function TextFieldError({children}) {
    return (
        <small className="text-red-700 mx-2" role="alert">
            {children}
        </small>
    )
}

export function TextField({label, id, ...props}) {
    return (
        <div>
            <label className="block mb-2 text-border font-bold" htmlFor={id}>
                {label}
            </label>
            <Field
                className="w-full rounded-2xl outline-none border border-border focus:border-primary p-3"
                id={id}
                {...props} />
            <ErrorMessage name={props.name} component={TextFieldError} />
        </div>
    )
}