import React, {useMemo, useState} from 'react';
import {generalRequest} from '../../../../../API/Utility';
import {routes} from '../../../../../API/APIRoutes';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
} from '../../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import commonTranslator from '../../../../../translator/Common';
import {trueFalseValues} from '../../../../../services/Utility';
import {styles} from '../../../../../styles/Common/Styles';
import {dispatchTeachTagReportContext, teachTagReportContext} from './Context';

function Create(props) {
  const teachReportTagMode = useMemo(() => {
    return [
      {item: 'گزارش مشکل توسط دانش آموز', id: 'user'},
      {item: 'گزارش مشکل توسط دبیر', id: 'teacher'},
    ];
  }, []);

  const useGlobalState = () => [
    React.useContext(teachTagReportContext),
    React.useContext(dispatchTeachTagReportContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [title, setTitle] = useState();
  const [priority, setPriority] = useState();
  const [visibility, setVisibility] = useState();
  const [mode, setMode] = useState();

  const createData = React.useCallback(() => {
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.createTeachTagsReport,
        'post',
        {
          label: title,
          priority: priority,
          visibility: visibility,
          mode: mode,
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
        mode: mode,
        reportsCount: 0,
        unseenReportsCount: 0,
      });

      dispatch({tags: tmp});
      props.setMode('list');
    });
  }, [props, title, priority, mode, visibility, dispatch, state.tags]);

  const editData = React.useCallback(() => {
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.editTeachReportTag + state.selectedTag.id,
        'put',
        {
          label: title,
          priority: priority,
          visibility: visibility,
          mode: mode,
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
      state.selectedTag.mode = mode;

      dispatch({selectedTag: state.selectedTag, needUpdate: true});
      props.setMode('list');
    });
  }, [props, title, priority, visibility, mode, dispatch, state.selectedTag]);

  React.useEffect(() => {
    if (props.isInEditMode && state.selectedTag !== undefined) {
      setTitle(state.selectedTag.label);
      setPriority(state.selectedTag.priority);
      setVisibility(state.selectedTag.visibility);
      setMode(state.selectedTag.mode);
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
          values={teachReportTagMode}
          value={
            mode === undefined
              ? {}
              : teachReportTagMode.filter(element => {
                  return element.id === mode;
                })[0]
          }
          setter={setMode}
          subText={'گزارش خرابی توسط کدامیک'}
          placeholder={'گزارش خرابی توسط کدامیک'}
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
