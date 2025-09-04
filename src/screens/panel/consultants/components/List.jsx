import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import {courseContext, dispatchCourseContext} from './Context';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import commonTranslator from '../../../../translator/Common';

function List(props) {
  const useGlobalState = () => [
    React.useContext(courseContext),
    React.useContext(dispatchCourseContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [showOp, setShowOp] = useState(false);

  const columns = [
    {
      name: 'عنوان',
      selector: row => row.label,
      grow: 2,
      center: true,
    },
    {
      name: 'آیا نیاز به عدد دارد؟',
      selector: row => (row.numberLabel === undefined ? 'خیر' : 'بله'),
      grow: 1,
      center: true,
    },
    {
      name: 'عنوان عدد',
      selector: row => row.numberLabel,
      grow: 3,
      center: true,
    },
  ];

  const fetchData = React.useCallback(() => {
    props.setLoading(true);

    Promise.all([
      generalRequest(routes.getAllTags, 'get', undefined, 'data', props.token),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] === null) {
        props.navigate('/');
        return;
      }

      dispatch({tags: res[0]});
    });
  }, [props, dispatch]);

  useEffectOnce(() => {
    if (state.tags !== undefined) return;
    fetchData();
  }, [state.tags, fetchData]);

  const handleOp = idx => {
    dispatch({selectedTag: state.tags[idx]});
    setShowOp(true);
  };

  return (
    <CommonWebBox
      header={' جلسات مشاوره '}
      addBtn={true}
      onAddClick={() => props.setMode('create')}>
      {showOp && (
        <LargePopUp toggleShowPopUp={() => setShowOp(false)}>
          <PhoneView>
            <CommonButton
              onPress={() => props.setMode('edit')}
              theme={'transparent'}
              title={commonTranslator.edit}
            />
          </PhoneView>
        </LargePopUp>
      )}
      {state.tags && (
        <CommonDataTable
          removeUrl={routes.removeTag}
          columns={columns}
          data={state.tags}
          handleOp={handleOp}
          token={props.token}
          setLoading={props.setLoading}
        />
      )}
    </CommonWebBox>
  );
}

export default List;
