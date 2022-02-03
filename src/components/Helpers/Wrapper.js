const Wrapper = props => {
    // This is to avoid too many nested <div>s that might occur as 
    // a result of fullfilling JSX conditions (return just one JSX 
    // element; no adjacent elements without a wrapper.)

    // Using React.Fragment has the same effect! So this is just an 
    // illustrative example.
    return props.children;
}

export default Wrapper;