import React from 'react';
import { Formik, Form, useField } from 'formik';
import { validate, validationSchema } from './validations';
import "./styles.css";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div>      
      <input type="checkbox" {...field} {...props} />
      {children}      
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const SignupForm = () => {
  return (
    <section className="login">
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          acceptedTerms: false, // added for our checkbox
          jobType: '', // added for our select
        }}
        validationSchema={ validationSchema }
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>          
          <MyTextInput
             label="First Name"
             name="firstName"
             type="text"
             placeholder="Jane"
          />
 
          <MyTextInput
             label="Last Name"
             name="lastName"
             type="text"
             placeholder="Doe"
          />
 
          <MyTextInput
             label="Email Address"
             name="email"
             type="email"
             placeholder="jane@formik.com"
          />
 
          <MySelect label="Job Type" name="jobType">
             <option value="">Select a job type</option>
             <option value="designer">Designer</option>
             <option value="development">Developer</option>
             <option value="product">Product Manager</option>
             <option value="other">Other</option>
          </MySelect>
 
          <MyCheckbox name="acceptedTerms">
             I accept the terms and conditions
          </MyCheckbox>
 
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </section>
  );
};

export default SignupForm;

/*
    FORMIK Tutorial
    https://formik.org/docs/tutorial

    npm | yup 
    https://formik.org/docs/tutorial
*/