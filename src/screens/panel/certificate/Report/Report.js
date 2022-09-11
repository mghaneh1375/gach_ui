import React, {useState} from 'react';
import {CommonWebBox, PhoneView} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';
import commonTranslator from '../../../../translator/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import certTranslator from '../Translator';
import {getCertificate} from '../Utility';
import columns from './TableStructure';
import {routes} from '../../../../API/APIRoutes';
import {Ops} from './Ops';

function Report(props) {
  const [cert, setCert] = useState();
  const [isWorking, setIsWorking] = useState(false);
  const [selectedId, setSelectedId] = useState();

  React.useEffect(() => {
    if (cert !== undefined || isWorking) {
      return;
    }
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

      setCert(res[0]);
      setIsWorking(false);
    });
  }, [props, cert, isWorking]);

  const [showOpPopUp, setShowOpPopUp] = useState(false);

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };
  const [selectedUser, setSelectedUser] = useState();

  const handleOp = idx => {
    setSelectedUser(props.data[idx]);
    // setSelectedId(props.data[idx].id);
    toggleShowOpPopUp();
  };

  return (
    <CommonWebBox
      header={'لیست'}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      {showOpPopUp && (
        <Ops
          id={selectedUser}
          Certificate={props.setSelectedCertificate}
          toggleShowPopUp={toggleShowOpPopUp}
          token={props.token}
          setLoading={props.setLoading}
          remove={props.remove}
          update={props.update}
          setMode={props.setMode}
        />
      )}
      {cert !== undefined && (
        <CommonDataTable
          handleOp={handleOp}
          columns={columns}
          removeUrl={routes.deleteAvatar}
          data={cert.users}
        />
      )}
    </CommonWebBox>
  );
}

export default Report;
