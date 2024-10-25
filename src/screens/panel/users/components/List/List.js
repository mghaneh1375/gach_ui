import React, {useState} from 'react';
import {useParams} from 'react-router';
import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';
import Pagination from '../../../../../components/web/Pagination/Pagination';
import {CommonWebBox, MyView, SimpleText} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import {levelsKeyVals} from '../../../ticket/components/KeyVals';
import Translator from '../../Translator';
import {dispatchUsersContext, usersContext} from '../Context';
import Ops from '../Ops';
import {filter} from '../Utility';
import Filter from './Filter';
import columns, {advisorColumns, allUsersColumns} from './TableStructure';

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
      props.setSelectedUser(selectedUser);
      setShowOpPopUp(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );

  const currLevel = useParams().level;
  const [branches, setBranches] = useState();
  const [grades, setGrades] = useState();
  const [clearFilters, setClearFilters] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalCount, setTotalCount] = useState();

  const fetchData = React.useCallback(() => {
    props.setLoading(true);
    Promise.all([
      generalRequest(routes.fetchBranches, 'get', undefined, 'data'),
      generalRequest(routes.fetchGrades, 'get', undefined, 'data'),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] == null || res[1] == null) {
        props.navigate('/');
        return;
      }
      setGrades(res[0]);
      setBranches(res[1]);
      dispatch({fetched: currLevel});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currLevel, pageIndex]);

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MyView>
      {showOpPopUp && (
        <Ops
          updateUser={props.updateUser}
          token={props.token}
          setLoading={props.setLoading}
          changeMode={changeMode}
          toggleShowPopUp={toggleShowOpPopUp}
        />
      )}
      <CommonWebBox
        addBtn={currLevel !== 'teacher'}
        backBtn={true}
        onAddClick={() => {
          if (currLevel !== 'teacher') props.setMode('create');
        }}
        onBackClick={() => setClearFilters(true)}
        header={
          Translator.list +
          levelsKeyVals.find(elem => elem.id === currLevel).item
        }>
        <MyView>
          {grades !== undefined && (
            <Filter
              clearFilters={clearFilters}
              setClearFilters={setClearFilters}
              grades={grades}
              branches={branches}
              token={props.token}
              setLoading={props.setLoading}
              currLevel={currLevel}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
              setTotalCount={setTotalCount}
            />
          )}

          {state.users !== undefined && (
            <>
              <SimpleText text={'تعداد کل رکوردها: ' + totalCount} />
              <CommonDataTable
                excel={false}
                columns={
                  currLevel === 'advisor'
                    ? advisorColumns
                    : currLevel !== 'all'
                    ? columns
                    : allUsersColumns
                }
                data={state.users}
                setData={data => dispatch({users: data})}
                removeUrl={routes.removeUsers}
                handleOp={handleOp}
                token={props.token}
                setLoading={props.setLoading}
                pagination={false}
              />
              <Pagination
                perPage={10}
                totalCount={totalCount}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
              />
            </>
          )}
        </MyView>
      </CommonWebBox>
    </MyView>
  );
}

export default List;
