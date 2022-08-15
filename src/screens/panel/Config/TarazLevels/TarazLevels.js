import React, {useState} from 'react';
import Create from './components/Create';
import List from './components/List';

function TarazLevels(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  const [levels, setLevels] = useState();
  const [selectedLevel, setSelectedLevel] = useState();
  const [mode, setMode] = useState('');

  return (
    <MyView>
      {mode === 'list' && (
        <List
          schools={schools}
          setMode={setMode}
          setData={setSchools}
          setLoading={setLoading}
          token={props.token}
          states={states}
          setSelectedSchool={setSelectedSchool}
          selectedSchool={selectedSchool}
          removeSchools={removedIds => {
            removeItems(schools, setSchools, removedIds);
          }}
        />
      )}
      {mode === 'create' && (
        <Create
          setMode={setMode}
          addSchool={item => {
            addItem(schools, setSchools, item);
          }}
          setLoading={setLoading}
          token={props.token}
        />
      )}
      {mode === 'update' && (
        <Create
          setMode={setMode}
          editSchool={item => {
            editItem(schools, setSchools, item);
          }}
          setLoading={setLoading}
          selectedSchool={selectedSchool}
          token={props.token}
        />
      )}
    </MyView>
  );
}

export default TarazLevels;
