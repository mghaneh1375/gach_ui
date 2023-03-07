import React, {useState} from 'react';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {questionReportContext, dispatchQuestionReportContext} from './Context';
import commonTranslator from '../../../../translator/Common';
import {styles} from '../../../../styles/Common/Styles';

function Create(props) {
  const useGlobalState = () => [
    React.useContext(questionReportContext),
    React.useContext(dispatchQuestionReportContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [title, setTitle] = useState();
  const [priority, setPriority] = useState();

  const createData = React.useCallback(() => {
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.addQuestionReportTag,
        'post',
        {
          label: title,
          priority: priority,
        },
        'id',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] === null) {
        props.navigate('/');
        return;
      }

      let tmp = state.tags;
      tmp.push({
        id: res[0],
        label: title,
        priority: priority,
      });

      dispatch({tags: tmp});
      props.setMode('list');
    });
  }, [props, title, priority, dispatch, state.tags]);
  return (
    <CommonWebBox
      header={commonTranslator.add}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <PhoneView style={{...styles.gap10}}>
        <JustBottomBorderTextInput
          placehoder={commonTranslator.title}
          subText={commonTranslator.title}
          value={title}
          onChangeText={e => setTitle(e)}
        />
        <JustBottomBorderTextInput
          placehoder={commonTranslator.priority}
          subText={commonTranslator.priority}
          justNum={true}
          value={priority}
          onChangeText={e => setPriority(e)}
        />
      </PhoneView>
      <CommonButton
        title={commonTranslator.confirm}
        onPress={() => createData()}
      />
    </CommonWebBox>
  );
}

export default Create;
