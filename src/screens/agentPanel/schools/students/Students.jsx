import React, {useState} from 'react';
import {CommonWebBox} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import commonTranslator from '../../../../translator/Common';
import columns from '../../../schoolPanel/ManageStudents/list/TableStructure';
import {getAllStudent} from '../../../schoolPanel/ManageStudents/Utility';

function Students(props) {
  const [isWorking, setIsWorking] = useState();
  const [data, setData] = useState();

  const fetchData = React.useCallback(() => {
    if (isWorking || data !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([getAllStudent(props.token, props.wantedUser.id)]).then(res => {
      props.setLoading(false);
      if (res[0] === null) {
        props.navigate('/');
        return;
      }
      setData(res[0]);
      setIsWorking(false);
    });
  }, [props, data, isWorking]);

  React.useEffect(() => {
    if (props.wantedUser !== undefined) fetchData();
  }, [props.wantedUser, fetchData]);

  return (
    <CommonWebBox
      header={commonTranslator.view + ' ' + commonTranslator.students}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      {data !== undefined && <CommonDataTable data={data} columns={columns} />}
    </CommonWebBox>
  );
}

export default Students;
