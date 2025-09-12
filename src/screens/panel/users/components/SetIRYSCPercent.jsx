import React, {useState} from 'react';
import {CommonButton, CommonWebBox, PhoneView} from '@/styles';
import JustBottomBorderTextInput from '@/styles/common/JustBottomBorderTextInput.jsx';
import {useEffectOnce} from 'usehooks-ts';
import {generalRequest} from '@/api/utility';
import {routes} from '@/api/apiRoutes';
import commonTranslator from '@/translator/common';
import {showSuccess} from '@/services/utility';
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
      <PhoneView
        style={{
          gap: '10px',
        }}>
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
          const params = new URLSearchParams();
          params.append('teachPercent', teachPercent);
          params.append('advicePercent', advicePercent);
          const res = await generalRequest(
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
