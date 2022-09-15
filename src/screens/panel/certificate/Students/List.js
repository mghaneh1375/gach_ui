import React, {useState} from 'react';
import {routes} from '../../../../API/APIRoutes';
import {CommonWebBox, MyView} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import {getCertificate} from '../Utility';
import Ops from './Ops';
import columns from './TableStructure';

function List(props) {
  const [isWorking, setIsWorking] = useState(false);
  const [data, setData] = useState();
  const [selectedStudent, setSelectedStudent] = useState();
  const [showOpPane, setShowOpPane] = useState(false);

  const toggleShowOpPopUp = () => {
    setShowOpPane(!showOpPane);
  };

  const handleOp = idx => {
    setSelectedStudent(data.users[idx]);
    toggleShowOpPopUp();
  };

  React.useEffect(() => {
    if (data !== undefined || isWorking) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      getCertificate(props.selectedCertificate.id, props.token),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] === null) {
        props.setMode('list');
        return;
      }
      setData(res[0]);
      setIsWorking(false);
    });
  }, [props, isWorking, data]);

  return (
    <MyView>
      {showOpPane && selectedStudent !== undefined && (
        <Ops
          params={data.params}
          user={selectedStudent}
          toggleShowPopUp={toggleShowOpPopUp}
          setLoading={props.setLoading}
          setData={setData}
          certId={data.id}
          token={props.token}
        />
      )}
      <CommonWebBox
        header={''}
        backBtn={true}
        onBackClick={() => props.setMode('list')}>
        {data !== undefined && (
          <CommonDataTable
            removeUrl={routes.removeStudentsFromCertificate}
            handleOp={handleOp}
            data={data.users}
            columns={columns}
          />
        )}
      </CommonWebBox>
    </MyView>
  );
}

export default List;
