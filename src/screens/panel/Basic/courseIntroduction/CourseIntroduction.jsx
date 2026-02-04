import {globalStateContext, dispatchStateContext} from '@/App.jsx';
import {addItem, editItem} from '@/services/utility';
import {MyView} from '@/styles';
import React, {useState} from 'react';
import Translate from '../translate';
import Create from './create/Create.jsx';
import List from './list/List.jsx';
import {getCourseIntroduction} from '../utility';
function CourseIntroduction(props) {
  const [mode, setMode] = useState('list');
  const [selectedGrade, setSelectedGrade] = useState();
  const [data, setData] = useState();
  const navigate = props.navigate;
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const setLoading = status => {
    dispatch({
      loading: status,
    });
  };
  React.useEffect(() => {
    dispatch({
      loading: true,
    });
    Promise.all([getCourseIntroduction(state.token)]).then(res => {
      dispatch({
        loading: false,
      });
      if (res[0] == null) {
        navigate('/');
        return;
      }
      setData(res[0]);
      setMode('list');
    });
  }, [navigate, state.token, dispatch]);
  return (
    <MyView>
      {mode === 'list' && data && (
        <List
          data={data}
          setData={setData}
          setMode={setMode}
          setLoading={setLoading}
          setSelectedGrade={setSelectedGrade}
          token={state.token}
        />
      )}
      {mode === 'create' && (
        <Create
          name={Translate.name}
          token={state.token}
          setMode={setMode}
          afterFunc={newItem => addItem(data, setData, newItem)}
          setLoading={setLoading}
        />
      )}
      {mode === 'edit' && (
        <Create
          token={state.token}
          setMode={setMode}
          afterFunc={newItem => editItem(data, setData, newItem)}
          setLoading={setLoading}
          item={selectedGrade}
        />
      )}
    </MyView>
  );
}
export default CourseIntroduction;
