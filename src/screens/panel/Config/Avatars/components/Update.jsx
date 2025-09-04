import {useState} from 'react';
import {routes} from '@/api/apiRoutes';
import UploadFile from '@/components/web/UploadFile.jsx';
import {showSuccess} from '@/services/utility';
import commonTranslator from '@/translator/common';
function Update(props) {
  const [showPopUp, setShowPopUp] = useState(true);
  const toggleShowPopUp = () => {
    if (showPopUp) props.setMode('list');
    setShowPopUp(!showPopUp);
  };
  const afterUpdate = res => {
    if (res !== null) {
      props.updateAvatar(props.avatar.id, res);
      showSuccess(commonTranslator.success);
      props.setMode('list');
    }
  };
  if (showPopUp)
    return (
      <UploadFile
        accept={['image/*']}
        url={routes.editAvatar + props.avatar.id}
        expectedRes={'file'}
        token={props.token}
        setResult={afterUpdate}
        multi={false}
        maxFileSize={1}
        toggleShow={toggleShowPopUp}
      />
    );
  return <></>;
}
export default Update;
