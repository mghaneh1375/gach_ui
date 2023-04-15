import React, {useState} from 'react';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {formatPrice} from '../../../../services/Utility';
import {CommonWebBox, SimpleText} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import translator from '../../../panel/quiz/Translator';
import {dispatchMyQuizzesContext, myQuizzesContext} from './Context';

function Recp(props) {
  const useGlobalState = () => [
    React.useContext(myQuizzesContext),
    React.useContext(dispatchMyQuizzesContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [data, setData] = useState();
  const [isWorking, setIsWorking] = useState(false);

  const fetchData = React.useCallback(() => {
    if (isWorking || state.selectedQuiz === undefined) return;

    if (state.selectedQuiz.recp !== undefined) {
      setData(state.selectedQuiz.recp);
      return;
    }
    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.getQuizRecpForSchool + state.selectedQuiz.id,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] === null) {
        props.setMode('list');
        return;
      }

      state.selectedQuiz.recp = res[0];
      setData(res[0]);

      dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
      setIsWorking(false);
    });
  }, [isWorking, dispatch, props, state.selectedQuiz]);

  React.useEffect(() => {
    if (state.selectedQuiz === undefined) return;

    if (state.selectedQuiz.recp !== undefined) {
      setData(state.selectedQuiz.recp);
      return;
    }
    fetchData();
  }, [state.selectedQuiz, fetchData]);

  const columns = [
    {
      name: 'نام حیطه',
      selector: row => row.subject,
      grow: 3,
      minWidth: '120px',
    },
    {
      name: 'تعداد سوال',
      selector: row => row.count,
      grow: 1,
      center: true,
    },
    {
      name: 'سطح سختی',
      selector: row => row.level,
      grow: 1,
      center: true,
    },
    {
      name: 'قیمت واحد (تومان)',
      selector: row => formatPrice(row.price),
      grow: 1,
      center: true,
    },
    {
      name: 'قیمت کل (تومان)',
      selector: row => formatPrice(row.totalPrice),
      grow: 1,
      center: true,
    },
  ];

  return (
    <>
      <CommonWebBox
        backBtn={true}
        onBackClick={() => props.setMode('list')}
        header={translator.recp}>
        <SimpleText
          text={
            state.selectedQuiz.status === 'init'
              ? 'وضعیت: در انتظار پرداخت'
              : 'وضعیت: پرداخت شده'
          }
        />
        {data !== undefined && (
          <CommonDataTable
            data={data}
            columns={columns}
            excel={false}
            pagination={false}
          />
        )}
      </CommonWebBox>
    </>
  );
}

export default Recp;
