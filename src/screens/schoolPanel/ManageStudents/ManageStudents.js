import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import List from './list/List';
import Create from './create/Create';
import {
  removeItems,
  editItem,
  addItem,
  isUserAdvisor,
} from '../../../services/Utility';
import {MyView, SimpleText} from '../../../styles/Common';
import {getAllStudent} from './Utility';
import ChangePassByAdmin from '../../panel/users/components/ChangePassByAdmin';
import {AdvicePanelProvider} from './Advisor/components/Context';
import Panel from './Advisor/Panel';

function ManageStudents(props) {
  const queryString = require('query-string');
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [mode, setMode] = useState('list');
  const [selectedStudent, setSelectedStudent] = useState();
  const [state, dispatch] = useGlobalState();

  const [data, setData] = useState();
  const setLoading = status => {
    dispatch({loading: status});
  };
  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([getAllStudent(props.token)]).then(res => {
      dispatch({loading: false});
      if (res[0] === null) {
        navigate('/');
        return;
      }
      setData(res[0]);
      setMode('list');
    });
  }, [navigate, props.token, dispatch]);

  const [isAdvisor, setIsAdvisor] = useState(false);

  React.useEffect(() => {
    if (state.user === undefined) return;
    setIsAdvisor(isUserAdvisor(state.user));
  }, [state.user]);

  return (
    <MyView>
      {mode === 'list' && (
        <List
          setMode={setMode}
          setLoading={setLoading}
          data={data}
          isAdvisor={isAdvisor}
          setData={setData}
          token={props.token}
          remove={ids => removeItems(data, setData, ids)}
          setSelectedStudent={setSelectedStudent}
          edit={ids => editItem(data, setData, ids)}
        />
      )}
      {mode === 'create' && (
        <Create
          data={data}
          setMode={setMode}
          setLoading={setLoading}
          token={props.token}
          addItem={i => addItem(data, setData, i)}
        />
      )}
      {mode === 'changePass' && selectedStudent !== undefined && (
        <ChangePassByAdmin
          wantedUserId={selectedStudent.id}
          setMode={setMode}
          setLoading={setLoading}
          token={props.token}
        />
      )}
      <AdvicePanelProvider>
        {mode === 'advisorPanel' && (
          <Panel
            wantedUserId={selectedStudent.id}
            setMode={setMode}
            setLoading={setLoading}
            token={props.token}
          />
        )}
      </AdvicePanelProvider>
    </MyView>
  );
}

export default ManageStudents;
