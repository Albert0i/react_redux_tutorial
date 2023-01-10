import React from 'react';
import { useFormik } from 'formik';
import { validate, validationSchema } from './validations';
import "./styles.css";

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
       firstName: '',
       lastName: '',
       email: '',
    },

    //validate,
    validationSchema, 
    onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
    },
  });
  
  return (
    <section className="login">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
            {...formik.getFieldProps('firstName')}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="errmsg">{formik.errors.firstName}</div>
        ) : null}
  
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" type="text" {...formik.getFieldProps('lastName')} />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="errmsg">{formik.errors.lastName}</div>
        ) : null}
  
        <label htmlFor="email">Email Address</label>
        <input id="email" type="email" {...formik.getFieldProps('email')} />
        {formik.touched.email && formik.errors.email ? (
          <div className="errmsg">{formik.errors.email}</div>
        ) : null}
  
        <button type="submit">Submit</button>
      </form>
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