import React, {useCallback, useEffect, useState} from 'react';
import {globalStateContext, dispatchStateContext} from '@/App.jsx';
import List from './list/List.jsx';
import Create from './create/Create.jsx';
import {
  removeItems,
  editItem,
  addItem,
  isUserAdvisor,
} from '@/services/utility.js';
import {MyView} from '@/styles';
import {getAllStudent} from './utility';
import ChangePassByAdmin from '../../panel/users/components/ChangePassByAdmin.jsx';
import {AdvicePanelProvider} from './advisor/components/Context.jsx';
import Panel from './advisor/Panel.jsx';
import {useNavigate, useParams} from 'react-router';

function ManageStudents() {
  const navigate = useNavigate();
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const params = useParams();
  const [mode, setMode] = useState(params?.studentId ? 'advisorPanel' : 'list');
  const [selectedStudent, setSelectedStudent] = useState();
  const [state, dispatch] = useGlobalState();
  const [data, setData] = useState();
  const [wantedUserId, setWantedUserId] = useState();

  useEffect(() => {
    if (params?.studentId) setWantedUserId(params.studentId);
  }, [params?.studentId]);

  const setLoading = status => {
    dispatch({
      loading: status,
    });
  };

  const fetchAllStudents = useCallback(() => {
    dispatch({
      loading: true,
    });
    Promise.all([getAllStudent(state.token)]).then(res => {
      dispatch({
        loading: false,
      });
      if (res[0] === null) {
        navigate('/');
        return;
      }
      setData(res[0]);
      setMode('list');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.token]);

  React.useEffect(() => {
    if (params?.studentId) return;
    fetchAllStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.studentId]);

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
          token={state.token}
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
          token={state.token}
          addItem={i => addItem(data, setData, i)}
        />
      )}
      {mode === 'changePass' && selectedStudent !== undefined && (
        <ChangePassByAdmin
          wantedUserId={selectedStudent.id}
          setMode={setMode}
          setLoading={setLoading}
          token={state.token}
        />
      )}
      <AdvicePanelProvider>
        {mode === 'advisorPanel' && (wantedUserId || selectedStudent?.id) && (
          <Panel
            wantedUserId={wantedUserId ? wantedUserId : selectedStudent?.id}
            setMode={setMode}
            setLoading={setLoading}
            token={state.token}
            isInPhone={state.isInPhone}
          />
        )}
      </AdvicePanelProvider>
    </MyView>
  );
}
export default ManageStudents;
