import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validate, validationSchema } from './validations';
import "./styles.css";

const SignupForm = () => {
  return (
    <section className="login">
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '' }}
        validationSchema={ validationSchema }
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" type="text" />
          <ErrorMessage name="firstName" />

          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" type="text" />
          <ErrorMessage name="lastName" />

          <label htmlFor="email">Email Address</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />

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