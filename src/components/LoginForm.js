// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "./styles.css";
import { MyRadiobutton } from './MyRadiobutton'

const LoginForm = () => (
    <section className="login">
      <h1>Any place in your app!</h1>
      <Formik
        initialValues={{ email: '', password: '', gender: "Male" }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />

            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />

            <fieldset>
              <legend>
                Please choose
              </legend>
              <Field
                component={MyRadiobutton}
                name="gender"
                id="Male"
                label="Male"
              />
              <Field
                component={MyRadiobutton}
                name="gender"
                id="Female"
                label="Female"
              />
              <Field
                component={MyRadiobutton}
                name="gender"
                id="Other"
                label="Other"
              />
            </fieldset>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </section>
);

export default LoginForm;

/*
    FORMIK docs 
    https://formik.org/docs/overview

*/