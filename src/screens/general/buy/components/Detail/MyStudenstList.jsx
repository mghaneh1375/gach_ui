import React from 'react';
import CommonDataTable from '../../../../../styles/common/CommonDataTable';
import {LargePopUp} from '../../../../../styles/common/PopUp';
import {getAllStudent} from '../../../../schoolPanel/manageStudents/utility';
import {dispatchPackagesContext, packagesContext} from '../Context';
import columns from '../../../../schoolPanel/manageStudents/list/tableStructure';
import commonTranslator from '@/translator/common';
function StudentList(props) {
  const useGlobalState = () => [
    React.useContext(packagesContext),
    React.useContext(dispatchPackagesContext),
  ];
  const [state, dispatch] = useGlobalState();
  const fetchStudents = React.useCallback(() => {
    Promise.all([getAllStudent(props.token)]).then(res => {
      if (res[0] === null) {
        dispatch({
          myStudents: [],
        });
        return;
      }
      dispatch({
        myStudents: res[0],
      });
    });
  }, [dispatch, props.token]);
  React.useEffect(() => {
    if (state.myStudents === undefined) fetchStudents();
  }, [state.myStudents, fetchStudents]);
  return (
    <LargePopUp
      toggleShowPopUp={props.toggleShowPopUp}
      removeCancel={true}
      title={'افزودن دانش آموز/دانش آموزان به آزمون'}>
      {state.myStudents !== undefined && (
        <CommonDataTable
          groupOps={[
            {
              key: 'select',
              showAsButton: true,
              label: commonTranslator.select,
              warning: 'آیا از انتخاب دانش آموزان انتخاب شده اطمینان دارید؟',
              afterFunc: arr => {
                if (state.selectedStudents !== undefined) {
                  const tmp = [];
                  arr.forEach(elem => {
                    if (
                      state.selectedStudents.find(e => e.id === elem.id) ===
                      undefined
                    )
                      tmp.push(elem);
                  });
                  const tmp2 = [];
                  state.selectedStudents.forEach(elem => {
                    tmp2.push(elem);
                  });
                  tmp.forEach(e => {
                    tmp2.push(e);
                  });
                  dispatch({
                    selectedStudents: tmp2,
                  });
                } else {
                  dispatch({
                    selectedStudents: arr,
                  });
                }
                props.toggleShowPopUp();
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
