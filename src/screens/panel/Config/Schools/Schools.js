import React, {useState} from 'react';
import {globalStateContext, dispatchStateContext} from '../../../../App';
import List from './components/List/List';
import Create from './components/Create';
import {filter} from './components/Utility';
import {
  addItem,
  editItem,
  isUserAdmin,
  removeItems,
} from '../../../../services/Utility';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {MyView} from '../../../../styles/Common';
import vars from '../../../../styles/root';

function Schools(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  const [schools, setSchools] = useState();
  const [selectedSchool, setSelectedSchool] = useState();
  const [mode, setMode] = useState('');
  const [states, setStates] = useState();
  const [isAdmin, setIsAdmin] = useState(isUserAdmin(state.user));
  const [allSchools, setAllSchools] = useState();

  React.useEffect(() => {
    if (states !== undefined) return;
    dispatch({loading: true});
    Promise.all([
      filter(state.token, undefined, undefined, undefined, undefined),
      generalRequest(routes.fetchState, 'get', undefined, 'data'),
      generalRequest(routes.fetchSchoolsDigest, 'get', undefined, 'data'),
    ]).then(res => {
      dispatch({loading: false});
      if (res[0] === null) {
        navigate('/');
        return;
      }
      setSchools(res[0]);
      if (res[1] !== null) {
        setStates(res[1]);
        setMode('list');
      } else {
        navigate('/');
        return;
      }
    });
  }, [navigate, state.token, dispatch, states]);

  return (
    <MyView
      style={
        isAdmin
          ? {}
          : {width: vars.LEFT_SECTION_WIDTH, alignSelf: 'center', marginTop: 20}
      }>
      {!isAdmin && (
        <div
          style={{
            position: 'fixed',
            zIndex: -1,
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: 'url(./assets/images/back3.png)',
          }}></div>
      )}
      {mode === 'list' && (
        <List
          schools={schools}
          isAdmin={isAdmin}
          setMode={isAdmin ? setMode : {}}
          setData={setSchools}
          setLoading={setLoading}
          token={state.token}
          states={states}
          setSelectedSchool={isAdmin ? setSelectedSchool : {}}
          selectedSchool={selectedSchool}
          removeSchools={
            isAdmin
              ? removedIds => {
                  removeItems(schools, setSchools, removedIds);
                }
              : {}
          }
        />
      )}
      {mode === 'create' && isAdmin && (
        <Create
          setMode={setMode}
          addSchool={item => {
            addItem(schools, setSchools, item);
          }}
          setLoading={setLoading}
          token={props.token}
        />
      )}
      {mode === 'update' && isAdmin && (
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

export default Schools;
