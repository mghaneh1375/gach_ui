import {useState} from 'react';
import {routes} from '../../../../../API/APIRoutes';
import UploadFile from '../../../../../components/web/UploadFile';
import {showSuccess} from '../../../../../services/Utility';
import commonTranslator from '../../../../../translator/Common';

function Create(props) {
  const [showPopUp, setShowPopUp] = useState(true);
  const toggleShowPopUp = () => {
    if (showPopUp) props.setMode('list');

    setShowPopUp(!showPopUp);
  };

  const afterAdd = res => {
    if (res !== null) {
      props.addAvatar({isDefault: false, file: res.file, id: res.id});
      showSuccess(commonTranslator.success);
      props.setMode('list');
    }
  };

  if (showPopUp)
    return (
      <UploadFile
        accept={['image/*']}
        url={routes.addAvatar}
        expectedRes={['file', 'id']}
        token={props.token}
        setResult={afterAdd}
        multi={false}
        maxFileSize={1}
        toggleShow={toggleShowPopUp}
      />
    );

  return <></>;
}

export default Create;
