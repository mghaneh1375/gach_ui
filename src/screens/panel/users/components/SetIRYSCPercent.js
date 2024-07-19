import React, {useState} from 'react';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {useEffectOnce} from 'usehooks-ts';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import commonTranslator from '../../../../translator/Common';
import {showSuccess} from '../../../../services/Utility';

function SetIRYSCPercent(props) {
  const [advicePercent, setAdvicePercent] = useState();
  const [teachPercent, setTeachPercent] = useState();

  const fetchData = React.useCallback(() => {
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.getAdvisorIRYSCPercent + props.selectedUser.id,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] !== null) {
        setTeachPercent(res[0].iryscTeachPercent);
        setAdvicePercent(res[0].iryscAdvicePercent);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffectOnce(() => {
    fetchData();
  });

  return (
    <CommonWebBox
      backBtn={true}
      onBackClick={() => props.setMode('list')}
      header={'تعیین درصد آیریسک'}>
      <PhoneView style={{gap: '10px'}}>
        <JustBottomBorderTextInput
          value={advicePercent}
          onChangeText={e => setAdvicePercent(e)}
          placehoder="درصد آیریسک از مشاوره"
          subText="درصد آیریسک از مشاوره"
          justNum={true}
        />
        <JustBottomBorderTextInput
          value={teachPercent}
          onChangeText={e => setTeachPercent(e)}
          placehoder="درصد آیریسک از تدریس"
          subText="درصد آیریسک از تدریس"
          justNum={true}
        />
      </PhoneView>
      <CommonButton
        onPress={async () => {
          props.setLoading(true);
          let params = new URLSearchParams();
          params.append('teachPercent', teachPercent);
          params.append('advicePercent', advicePercent);
          let res = await generalRequest(
            routes.setAdvisorIRYSCPercent +
              props.selectedUser.id +
              '?' +
              params.toString(),
            'put',
            undefined,
            undefined,
            props.token,
          );
          props.setLoading(false);
          if (res != null) {
            showSuccess();
            props.setMode('list');
          }
        }}
        theme={'dark'}
        title={commonTranslator.confirm}
      />
    </CommonWebBox>
  );
}

export default SetIRYSCPercent;
