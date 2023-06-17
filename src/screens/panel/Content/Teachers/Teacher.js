import {faCheck, faEdit} from '@fortawesome/free-solid-svg-icons';
import {PhoneView} from '../../../../styles/Common';
import {FontIcon} from '../../../../styles/Common/FontIcon';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {showSuccess} from '../../../../services/Utility';
import React, {useState} from 'react';

function Teacher(props) {
  const [name, setName] = useState(props.name);

  return (
    <PhoneView>
      <JustBottomBorderTextInput value={name} onChangeText={e => setName(e)} />
      <FontIcon
        icon={faEdit}
        theme={'orangeRed'}
        kind={'normal'}
        onPress={async () => {
          props.setLoading(true);
          let res = await generalRequest(
            routes.changeTeacherName,
            'post',
            {
              oldName: props.name,
              newName: name,
            },
            undefined,
            props.token,
          );
          props.setLoading(false);
          if (res != null) showSuccess();
        }}
      />
    </PhoneView>
  );
}

export default Teacher;
