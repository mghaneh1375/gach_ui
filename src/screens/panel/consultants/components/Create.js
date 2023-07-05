import React, {useState} from 'react';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {courseContext, dispatchCourseContext} from './Context';
import commonTranslator from '../../../../translator/Common';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {showError, trueFalseValues} from '../../../../services/Utility';

function Create(props) {
  const useGlobalState = () => [
    React.useContext(courseContext),
    React.useContext(dispatchCourseContext),
  ];

  const [state, dispatch] = useGlobalState();

  const [title, setTitle] = useState();
  const [needToNumber, setNeedToNumber] = useState(false);
  const [label, setLabel] = useState();

  React.useEffect(() => {
    if (!props.isInEditMode || state.selectedTag === undefined) return;

    setTitle(state.selectedTag.label);
    setNeedToNumber(state.selectedTag.numberLabel !== undefined);
    setLabel(state.selectedTag.numberLabel);
  }, [props.isInEditMode, state.selectedTag]);

  const createData = React.useCallback(() => {
    props.setLoading(true);

    let data = {
      label: title,
    };

    if (needToNumber) {
      if (label === undefined) {
        showError('لطفا عنوان عدد را وارد نمایید');
        return;
      }
      data.numberLabel = label;
    }

    Promise.all([
      generalRequest(
        props.isInEditMode
          ? routes.editTag + state.selectedTag.id
          : routes.createTag,
        'post',
        data,
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
      if (!props.isInEditMode) {
        tmp.push({
          id: res[0],
          label: title,
          numberLabel: needToNumber ? label : undefined,
        });
      } else {
        tmp = tmp.map(e => {
          if (e.id == state.selectedTag.id)
            return {
              id: e.id,
              label: title,
              numberLabel: needToNumber ? label : undefined,
            };

          return e;
        });
      }

      dispatch({tags: tmp});
      props.setMode('list');
    });
  }, [
    props,
    title,
    dispatch,
    state.tags,
    needToNumber,
    label,
    state.selectedTag,
  ]);

  return (
    <CommonWebBox
      header={props.isInEditMode ? 'ویرایش' : 'افزودن'}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <PhoneView style={{gap: 20}}>
        <JustBottomBorderTextInput
          placehoder={commonTranslator.title}
          subText={commonTranslator.title}
          value={title}
          onChangeText={e => setTitle(e)}
        />
        <JustBottomBorderSelect
          value={trueFalseValues.find(elem => elem.id === needToNumber)}
          setter={setNeedToNumber}
          placehoder={'آیا نیاز به تعریف عدد دارد'}
          subText={'آیا نیاز به تعریف عدد دارد'}
          values={trueFalseValues}
        />
        {needToNumber && (
          <JustBottomBorderTextInput
            placehoder={'عنوان عدد'}
            subText={'عنوان عدد'}
            value={label}
            onChangeText={e => setLabel(e)}
          />
        )}
      </PhoneView>
      <CommonButton
        title={commonTranslator.confirm}
        onPress={() => createData()}
      />
    </CommonWebBox>
  );
}

export default Create;
