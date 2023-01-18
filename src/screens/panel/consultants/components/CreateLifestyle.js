import React, {useState} from 'react';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {CommonButton, CommonWebBox} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {courseContext, dispatchCourseContext} from './Context';

function Create(props) {
  const useGlobalState = () => [
    React.useContext(courseContext),
    React.useContext(dispatchCourseContext),
  ];

  const [state, dispatch] = useGlobalState();

  const [title, setTitle] = useState();

  const createData = React.useCallback(() => {
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.createLifeTag,

        'post',
        {
          label: title,
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
      });

      dispatch({tags: tmp});
      props.setMode('list');
    });
  }, [props, title, dispatch, state.tags]);
  return (
    <CommonWebBox backBtn={true} onBackClick={() => props.setMode('list')}>
      <JustBottomBorderTextInput
        isHalf={true}
        placehoder={'عنوان جلسه'}
        subText={'عنوان جلسه'}
        value={title}
        onChangeText={e => setTitle(e)}
      />
      <CommonButton title={'ثبت'} onPress={() => createData()} />
    </CommonWebBox>
  );
}

export default Create;
