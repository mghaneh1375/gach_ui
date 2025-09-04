import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {teachTagReportContext, dispatchTeachTagReportContext} from './Context';
import columns from './TableStructure';
import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
} from '../../../../../styles/Common';
import commonTranslator from '../../../../../translator/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';

function List(props) {
  const useGlobalState = () => [
    React.useContext(teachTagReportContext),
    React.useContext(dispatchTeachTagReportContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [showOpPopUp, setShowOpPopUp] = useState(false);

  const fetchData = React.useCallback(() => {
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.getTeachTagsReport,
        'get',
        undefined,
        'data',
        props.token,
      ),
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

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };

  const handleOp = idx => {
    dispatch({selectedTag: state.tags[idx]});
    toggleShowOpPopUp();
  };

  return (
    <>
      {showOpPopUp && (
        <LargePopUp
          title={commonTranslator.opMenu}
          toggleShowPopUp={toggleShowOpPopUp}>
          <PhoneView>
            <CommonButton
              dir={'rtl'}
              theme={'transparent'}
              onPress={() => props.setMode('report')}
              title={commonTranslator.report}
            />
            <CommonButton
              dir={'rtl'}
              theme={'transparent'}
              onPress={() => props.setMode('edit')}
              title={commonTranslator.edit}
            />
          </PhoneView>
        </LargePopUp>
      )}
      {!showOpPopUp && (
        <CommonWebBox
          header={' تگ‌های گزارش مشکل برای تدریس '}
          addBtn={true}
          onAddClick={() => props.setMode('create')}>
          {state.tags !== undefined && (
            <CommonDataTable
              handleOp={handleOp}
              removeUrl={routes.removeTeachTagsReport}
              columns={columns}
              data={state.tags}
              setData={newData => dispatch({tags: newData})}
              token={props.token}
              setLoading={props.setLoading}
            />
          )}
        </CommonWebBox>
      )}
    </>
  );
}

export default List;
