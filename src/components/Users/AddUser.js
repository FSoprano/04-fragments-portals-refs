import React, { useState, useRef } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';
import Wrapper from '../Helpers/Wrapper';

const AddUser = (props) => {
  const nameInputRef = useRef();
  // This gives us an object with a 'current' property. The 'current'
  // property holds the value of the HTML element that the ref is connected 
  // with.
  const ageInputRef = useRef();
  // useRef: What it does here: When a user enters something in the form,
  // the corresponding state (enteredUsername, enteredAge) is updated with 
  // every keystroke, even though it is required only on submitting the form.
  // useRef is supposed to prevent this.
  // Remember: React hooks can only be used inside function components.
  // Not necessary anymore if we use refs():
  // const [enteredUsername, setEnteredUsername] = useState('');
  // const [enteredAge, setEnteredAge] = useState('');

  // In general: If we just want to read values, ref()s are the better 
  // solution because it's superfluous to update states with every new 
  // keystroke.

  // Controlled vs. uncontrolled components:
  // If you use refs, the components that you bind the refs to are called 
  // 'uncontrolled' components because the state of the ref values is not 
  // controlled by React, even though a React feature is used.
  // The state approach used before would be "controlled components" because 
  // the state will always be monitored and updated by React.
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    console.log(nameInputRef);
    // This will output an object with a 'current' property set to 
    // input#username.
    // This allows us to also log this to the console:
    console.log(nameInputRef.current.value);
    // This will give us the entered name.
    // We can now refer to this value without changing the state with every keystroke:
    const enteredRefUsername = nameInputRef.current.value; // to replace enteredUsername
    const enteredRefAge = ageInputRef.current.value; // to replace enteredAge
    if (enteredRefUsername.trim().length === 0 || enteredRefAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    if (+enteredRefAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    props.onAddUser(enteredRefUsername, enteredRefAge);
    // This is not necessary anymore if we use refs();
    // setEnteredUsername('');
    // setEnteredAge('');
    // However, to get the resetting logic back:
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
    // This is something one should normally not do, manipulating the DOM,
    // that is.
  };
  // These handlers can go after we switch over to refs():
  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {/* Nothing changes here even though we now use a portal to place 
      the ErrorModal elsewhere in the DOM. See ErrorModal.js */}
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text" 
            ref={nameInputRef}
          />
          {/* The following input attributes are not needed anymore if 
            we use refs():
            value={enteredUsername}
            onChange={usernameChangeHandler}  */}
            {/* Connecting this form input element to 
            nameInputRef:  What ends up in nameInputRef is a real DOM node. */}
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            ref={ageInputRef}
          />
            {/* The following input attributes are not needed anymore if 
            we use refs():
            value={enteredAge}
            onChange={ageChangeHandler}  */}
            {/* Connecting this form input element to 
            ageInputRef: What ends up in ageInputRef is a real DOM node. */}
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
