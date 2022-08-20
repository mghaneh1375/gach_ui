import React, {useState} from 'react';
import {useParams} from 'react-router';
import {CommonButton, PhoneView} from '../../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import commonTranslator from '../../../../../tranlates/Common';
import {filter} from '../Utility';

function Filter(props) {
  const [NID, setNID] = useState();
  const [phone, setPhone] = useState();

  const level = useParams().level;

  const filterLocal = async () => {
    props.setLoading(true);
    let res = await filter(props.token, level, NID, phone);
    props.setLoading(false);
    setNID(undefined);
    setPhone(undefined);
    if (res === null) return;
    props.setData(res);
  };

  return (
    <PhoneView style={{gap: 20}}>
      <JustBottomBorderTextInput
        value={NID}
        onChangeText={e => setNID(e)}
        justNum={true}
        placeholder={commonTranslator.NID}
      />
      <JustBottomBorderTextInput
        value={phone}
        onChangeText={e => setPhone(e)}
        justNum={true}
        placeholder={commonTranslator.phone}
      />
      <CommonButton
        onPress={() => filterLocal()}
        title={commonTranslator.search}
      />
    </PhoneView>
  );
}

export default Filter;
