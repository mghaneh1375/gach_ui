import React, {useState} from 'react';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {questionReportContext, dispatchQuestionReportContext} from './Context';
import commonTranslator from '../../../../translator/Common';
import {styles} from '../../../../styles/Common/Styles';
import {trueFalseValues} from '../../../../services/Utility';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import translator from '../Translate';

function Create(props) {
  const useGlobalState = () => [
    React.useContext(questionReportContext),
    React.useContext(dispatchQuestionReportContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [title, setTitle] = useState();
  const [priority, setPriority] = useState();
  const [visibility, setVisibility] = useState();
  const [canHasDesc, setCanHasDesc] = useState();

  const createData = React.useCallback(() => {
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.addQuestionReportTag,
        'post',
        {
          label: title,
          priority: priority,
          visibility: visibility,
          canHasDesc: canHasDesc,
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
        visibility: visibility,
        canHasDesc: canHasDesc,
      });

      dispatch({tags: tmp});
      props.setMode('list');
    });
  }, [props, title, priority, visibility, canHasDesc, dispatch, state.tags]);

  const editData = React.useCallback(() => {
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.editQuestionReportTag + state.selectedTag.id,
        'post',
        {
          label: title,
          priority: priority,
          visibility: visibility,
          canHasDesc: canHasDesc,
        },
        undefined,
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] === null) {
        props.navigate('/');
        return;
      }

      state.selectedTag.label = title;
      state.selectedTag.priority = priority;
      state.selectedTag.visibility = visibility;
      state.selectedTag.canHasDesc = canHasDesc;

      dispatch({selectedTag: state.selectedTag, needUpdate: true});
      props.setMode('list');
    });
  }, [
    props,
    title,
    priority,
    visibility,
    canHasDesc,
    dispatch,
    state.selectedTag,
  ]);

  React.useEffect(() => {
    if (props.isInEditMode && state.selectedTag !== undefined) {
      setTitle(state.selectedTag.label);
      setPriority(state.selectedTag.priority);
      setVisibility(state.selectedTag.visibility);
      setCanHasDesc(state.selectedTag.canHasDesc);
    }
  }, [props.isInEditMode, state.selectedTag]);

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
        <JustBottomBorderSelect
          values={trueFalseValues}
          value={
            visibility === undefined
              ? {}
              : trueFalseValues.filter(element => {
                  return element.id === visibility;
                })[0]
          }
          setter={setVisibility}
          subText={commonTranslator.visibility}
          placeholder={commonTranslator.visibility}
        />
        <JustBottomBorderSelect
          values={trueFalseValues}
          value={
            canHasDesc === undefined
              ? {}
              : trueFalseValues.filter(element => {
                  return element.id === canHasDesc;
                })[0]
          }
          setter={setCanHasDesc}
          subText={translator.canHasDesc}
          placeholder={translator.canHasDesc}
        />
      </PhoneView>
      <CommonButton
        title={commonTranslator.confirm}
        onPress={() => (props.isInEditMode ? editData() : createData())}
      />
    </CommonWebBox>
  );
}

export default Create;
