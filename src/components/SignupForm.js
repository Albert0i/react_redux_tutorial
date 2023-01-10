import React from 'react';
import { Formik, Form } from 'formik';
import { validate, validationSchema } from './validations';
import { MyTextInput } from './MyTextInput';
import { MyCheckbox } from './MyCheckbox';
import { MySelect } from './MySelect';
import "./styles.css";

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