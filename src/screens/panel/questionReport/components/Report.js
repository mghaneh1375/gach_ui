import React, {useState} from 'react';
import {CommonWebBox} from '../../../../styles/Common';
import {questionReportContext, dispatchQuestionReportContext} from './Context';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import {reportColumns} from './TableStructure';
import commonTranslator from '../../../../translator/Common';
import translator from '../Translate';

function Report(props) {
  const useGlobalState = () => [
    React.useContext(questionReportContext),
    React.useContext(dispatchQuestionReportContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [data, setData] = useState();

  React.useEffect(() => {
    if (state.selectedTag.reports !== undefined)
      setData(state.selectedTag.reports);
  }, [state.selectedTag.reports]);

  const fetchData = React.useCallback(() => {
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.getQuestionReportReports + state.selectedTag.id,
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

      state.selectedTag.reports = res[0];
      dispatch({selectedTag: state.selectedTag, needUpdate: true});
    });
  }, [props, state.selectedTag, dispatch]);

  useEffectOnce(() => {
    if (state.selectedTag.reports !== undefined) return;
    fetchData();
  }, [state.tags, fetchData]);

  return (
    <CommonWebBox
      header={commonTranslator.report}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      {data !== undefined && (
        <CommonDataTable
          groupOps={[
            {
              key: 'seenAll',
              label: translator.seen,
              url: routes.getQuestionReportSeen + state.selectedTag.id,
              method: 'put',
              warning: translator.sure,
              afterFunc: res => {
                state.selectedTag.reports = state.selectedTag.reports.map(
                  elem => {
                    if (res.doneIds.indexOf(elem.id) === -1) return elem;
                    elem.seen = true;
                    return elem;
                  },
                );
                state.selectedTag.unseenReportsCount -= res.doneIds.length;
                dispatch({selectedTag: state.selectedTag, needUpdate: true});
              },
            },
          ]}
          token={props.token}
          columns={reportColumns}
          data={data}
          setLoading={props.setLoading}
        />
      )}
    </CommonWebBox>
  );
}

export default Report;
