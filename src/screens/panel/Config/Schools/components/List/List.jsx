import React, {useState} from 'react';
import {CommonWebBox, MyView} from '@/styles';
import translator from '../../translator';
import Filter from './Filter.jsx';
import CommonDataTable from '../../../../../../styles/common/CommonDataTable.jsx';
import columns, {columnsForUsers} from './tableStruture';
import {routes} from '@/api/apiRoutes';
import Ops from '../Ops.jsx';
import {dispatchSchoolContext, schoolContext} from '../Context.jsx';
import {filter} from '../utility';
import {generalRequest} from '../../../../../../api/utility';
function List(props) {
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const useGlobalState = () => [
    React.useContext(schoolContext),
    React.useContext(dispatchSchoolContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);
  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };
  const handleOp = idx => {
    dispatch({
      selectedSchool: state.schools[idx],
    });
    toggleShowOpPopUp();
  };
  const fetchData = React.useCallback(() => {
    if (isWorking) return;
    setIsWorking(true);
    props.setLoading(true);
    Promise.all([
      filter(props.token, undefined, undefined, undefined, undefined),
      generalRequest(routes.fetchState, 'get', undefined, 'data'),
      generalRequest(routes.fetchSchoolsDigest, 'get', undefined, 'data'),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] === null || res[1] === null || res[2] === null) {
        props.navigate('/');
        return;
      }
      dispatch({
        schools: res[0],
        data: res[0],
        allSchools: res[2],
        states: res[1],
      });
    });
  }, [props, dispatch, isWorking]);
  React.useEffect(() => {
    if (state.schools !== undefined) return;
    fetchData();
  }, [state.schools, fetchData]);
  return (
    <MyView
      style={
        props.showBottomNav
          ? {
              marginBottom: 100,
            }
          : {}
      }>
      {showOpPopUp && props.isAdmin && (
        <Ops
          toggleShowPopUp={toggleShowOpPopUp}
          token={props.token}
          setLoading={props.setLoading}
          setMode={props.setMode}
        />
      )}
      {state.data !== undefined && (
        <CommonWebBox
          header={props.isAdmin ? translator.addNewItem : translator.list}
          addBtn={props.isAdmin}
          onAddClick={() => props.setMode('create')}>
          <MyView
            style={{
              gap: 15,
            }}>
            <Filter
              token={props.token}
              setLoading={props.setLoading}
              isAdmin={props.isAdmin}
            />
            <CommonDataTable
              columns={props.isAdmin ? columns : columnsForUsers}
              data={state.data}
              excel={props.isAdmin}
              setData={
                props.isAdmin
                  ? data =>
                      dispatch({
                        data: data,
                      })
                  : undefined
              }
              handleOp={props.isAdmin ? handleOp : undefined}
              removeUrl={props.isAdmin ? routes.removeSchools : undefined}
              token={props.token}
              setLoading={props.setLoading}
            />
          </MyView>
        </CommonWebBox>
      )}
    </MyView>
  );
}
export default List;
