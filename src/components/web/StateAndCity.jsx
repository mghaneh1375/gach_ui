import { useState } from "react";

function StateAndCity(props) {

    const [fetchedStates, setFetchedStates] = useState(false);
    const [states, setStates] = useState([]);

    const [state, setState] = useState(props.state);
    const [city, setCity] = useState(props.city);
  const [resetCity, setResetCity] = useState(false);

    return (  );
}

export default StateAndCity;