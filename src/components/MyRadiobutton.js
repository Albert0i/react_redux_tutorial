export const MyRadiobutton = ({
    field: { name, value, onChange, onBlur },
    id,
    label,
    ...props
  }) => {
    return (
      <div>
        <input
          name={name}
          id={id}
          type="radio"
          value={id} // could be something else for output?
          checked={id === value}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />
          {label}
      </div>
    );
  };

  /*
     How to create Radio buttons with Formik?
     https://stackoverflow.com/questions/61658020/how-to-create-radio-buttons-with-formik
  */