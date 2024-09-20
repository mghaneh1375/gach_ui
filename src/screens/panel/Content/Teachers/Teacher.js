import {faCheck, faEdit} from '@fortawesome/free-solid-svg-icons';
import {PhoneView} from '../../../../styles/Common';
import {FontIcon} from '../../../../styles/Common/FontIcon';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {showSuccess} from '../../../../services/Utility';
import React, {useState} from 'react';
import {styles} from '../../../../styles/Common/Styles';

function Teacher(props) {
  const [name, setName] = useState(props.name);
  const [nid, setNid] = useState(props.nid);

  return (
    <PhoneView style={{...styles.gap10}}>
      <JustBottomBorderTextInput value={name} onChangeText={e => setName(e)} />
      <JustBottomBorderTextInput
        placeholder={'کدملی دبیر در سایت آیریسک (اختیاری)'}
        subText={'کدملی دبیر در سایت آیریسک (اختیاری)'}
        value={nid}
        onChangeText={e => setNid(e)}
      />
      <FontIcon
        icon={faEdit}
        theme={'orangeRed'}
        kind={'normal'}
        onPress={async () => {
          props.setLoading(true);
          const data = {
            oldName: props.name,
            newName: name,
          };
          if (nid !== undefined && nid !== null && nid.length > 0)
            data.NID = nid;
          const res = await generalRequest(
            routes.changeTeacherName,
            'post',
            data,
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
