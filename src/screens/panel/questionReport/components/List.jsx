import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility.js';
import {CommonButton, CommonWebBox, PhoneView} from '@/styles';
import CommonDataTable from '@/styles/common/CommonDataTable.jsx';
import {LargePopUp} from '@/styles/common/PopUp.jsx';
import {
  questionReportContext,
  dispatchQuestionReportContext,
} from './Context.jsx';
import columns from './tableStructure';
import commonTranslator from '@/translator/common.js';
function List(props) {
  const useGlobalState = () => [
    React.useContext(questionReportContext),
    React.useContext(dispatchQuestionReportContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const fetchData = React.useCallback(() => {
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.getQuestionReportTags,
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
      dispatch({
        tags: res[0],
      });
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
    dispatch({
      selectedTag: state.tags[idx],
    });
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
          header={' تگ‌های خرابی سوال '}
          addBtn={true}
          onAddClick={() => props.setMode('create')}>
          {state.tags !== undefined && (
            <CommonDataTable
              handleOp={handleOp}
              removeUrl={routes.removeQuestionReportTags}
              columns={columns}
              data={state.tags}
              setData={newData =>
                dispatch({
                  tags: newData,
                })
              }
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
