import React, {useState} from 'react';
import {MyView} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import {getAllStudent} from '../../../../schoolPanel/ManageStudents/Utility';
import {dispatchPackagesContext, packagesContext} from '../Context';
import columns from './../../../../schoolPanel/ManageStudents/list/TableStructure';
import commonTranslator from '../../../../../translator/Common';
import {routes} from '../../../../../API/APIRoutes';

function StudentList(props) {
  const useGlobalState = () => [
    React.useContext(packagesContext),
    React.useContext(dispatchPackagesContext),
  ];
  const [state, dispatch] = useGlobalState();

  const fetchStudents = React.useCallback(() => {
    Promise.all([getAllStudent(props.token)]).then(res => {
      if (res[0] === null) {
        dispatch({myStudents: []});
        return;
      }
      dispatch({myStudents: res[0]});
    });
  }, [dispatch, props.token]);

  React.useEffect(() => {
    if (state.myStudents === undefined) fetchStudents();
  }, [state.myStudents, fetchStudents]);

  return (
    <LargePopUp>
      {state.myStudents !== undefined && (
        <CommonDataTable
          groupOps={[
            {
              key: 'selectAll',
              label: commonTranslator.select,
              afterFunc: res => {
                console.log(res);
                props.setSelectedStudents(res);
              },
            },
          ]}
          excel={false}
          columns={columns}
          pagination={false}
          data={state.myStudents}
        />
      )}
    </LargePopUp>
  );
}

export default StudentList;
