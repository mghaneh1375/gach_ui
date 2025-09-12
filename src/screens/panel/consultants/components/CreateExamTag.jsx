import React, {useState} from 'react';
import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
import {CommonButton, CommonWebBox} from '@/styles';
import JustBottomBorderTextInput from '@/styles/common/JustBottomBorderTextInput.jsx';
import {courseContext, dispatchCourseContext} from './Context.jsx';
function CreateExamTag(props) {
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
        routes.createExamTag,
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
      const tmp = state.tags;
      tmp.push({
        id: res[0],
        label: title,
      });
      dispatch({
        tags: tmp,
      });
      props.setMode('list');
    });
  }, [props, title, dispatch, state.tags]);
  return (
    <CommonWebBox backBtn={true} onBackClick={() => props.setMode('list')}>
      <JustBottomBorderTextInput
        isHalf={true}
        placehoder={'عنوان آزمون'}
        subText={'عنوان آزمون'}
        value={title}
        onChangeText={e => setTitle(e)}
      />
      <CommonButton title={'ثبت'} onPress={() => createData()} />
    </CommonWebBox>
  );
}
export default CreateExamTag;
