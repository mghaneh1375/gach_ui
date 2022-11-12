import React, {useState} from 'react';
import {CommonWebBox, MyView} from '../../../../../../styles/Common';
import translator from '../../Translator';
import Filter from './Filter';
import CommonDataTable from '../../../../../../styles/Common/CommonDataTable';
import columns, {columnsForUsers} from './TableStruture';
import {routes} from '../../../../../../API/APIRoutes';
import Ops from '../Ops';
import {dispatchSchoolContext, schoolContext} from '../Context';
import {filter} from '../Utility';
import {generalRequest} from '../../../../../../API/Utility';

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
    dispatch({selectedSchool: state.schools[idx]});
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
    <MyView>
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
          header={translator.addNewItem}
          addBtn={true}
          onAddClick={() => props.setMode('create')}>
          <MyView style={{gap: 15}}>
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
                props.isAdmin ? data => dispatch({data: data}) : undefined
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
