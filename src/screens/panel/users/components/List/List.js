import React, {useState} from 'react';
import {CommonWebBox, MyView} from '../../../../../styles/Common';
import Translator from '../../Translator';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import columns from './TableStructure';
import Ops from '../Ops';
import {levelsKeyVals} from '../../../ticket/components/KeyVals';
import {useParams} from 'react-router';
import Filter from './Filter';
import {usersContext, dispatchUsersContext} from '../Context';
import {filter} from '../Utility';
import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';

function List(props) {
  const useGlobalState = () => [
    React.useContext(usersContext),
    React.useContext(dispatchUsersContext),
  ];

  const [state, dispatch] = useGlobalState();

  const [showOpPopUp, setShowOpPopUp] = useState(false);

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };

  const changeMode = newMode => {
    props.setMode(newMode);
  };

  const handleOp = React.useCallback(
    (idx, selectedUser) => {
      dispatch({selectedUser: selectedUser});
      setShowOpPopUp(true);
    },
    [dispatch],
  );

  const currLevel = useParams().level;
  const [isWorking, setIsWorking] = useState(false);
  const [branches, setBranches] = useState();
  const [grades, setGrades] = useState();

  const fetchData = React.useCallback(() => {
    if ((state.fetched === currLevel && state.users !== undefined) || isWorking)
      return;

    setIsWorking(true);
    props.setLoading(true);
    Promise.all([
      filter(props.token, currLevel),
      generalRequest(routes.fetchGrades, 'get', undefined, 'data'),
      generalRequest(routes.fetchBranches, 'get', undefined, 'data'),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] == null || res[1] == null || res[2] == null) {
        props.navigate('/');
        return;
      }

      setGrades(res[1]);
      setBranches(res[2]);
      dispatch({users: res[0], fetched: currLevel});
      setIsWorking(false);
    });
  }, [props, currLevel, dispatch, isWorking, state.users, state.fetched]);

  React.useEffect(() => {
    if (state.fetched !== currLevel || state.users === undefined) fetchData();
  }, [state.users, currLevel, fetchData, state.fetched]);

  return (
    <MyView>
      {showOpPopUp && (
        <Ops
          user={props.selectedUser}
          updateUser={props.updateUser}
          token={props.token}
          setLoading={props.setLoading}
          changeMode={changeMode}
          toggleShowPopUp={toggleShowOpPopUp}
        />
      )}
      <CommonWebBox
        addBtn={true}
        onAddClick={() => props.setMode('create')}
        header={
          Translator.list +
          levelsKeyVals.find(elem => elem.id === currLevel).item
        }>
        <MyView>
          {grades !== undefined && (
            <Filter
              grades={grades}
              branches={branches}
              token={props.token}
              setLoading={props.setLoading}
            />
          )}

          {state.users !== undefined && (
            <CommonDataTable
              columns={columns}
              data={state.users}
              setData={data => dispatch({users: data})}
              handleOp={handleOp}
              token={props.token}
              setLoading={props.setLoading}
            />
          )}
        </MyView>
      </CommonWebBox>
    </MyView>
  );
}

export default List;
