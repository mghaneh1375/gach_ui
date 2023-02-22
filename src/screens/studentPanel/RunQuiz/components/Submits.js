import {dispatchDoQuizContext, doQuizContext} from './Context';
import React, {useState} from 'react';
import {CommonButton, CommonWebBox} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import {getDevice} from '../../../../services/Utility';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {faDownload} from '@fortawesome/free-solid-svg-icons';
import {SimpleFontIcon} from '../../../../styles/Common/FontIcon';

let timerVar;

function Submits(props) {
  const useGlobalState = () => [
    React.useContext(doQuizContext),
    React.useContext(dispatchDoQuizContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [data, setData] = useState();
  const [showAddBtn, setShowAddBtn] = useState(true);

  React.useEffect(() => {
    if (
      state.stdAnswerSheets !== undefined &&
      (state.stdAnswerSheets.length >= 5 ||
        state.stdAnswerSheets.find(e => e.status === 'pending') !== undefined)
    )
      setShowAddBtn(false);
    else setShowAddBtn(true);
  }, [state.stdAnswerSheets]);

  React.useEffect(() => {
    if (state.stdAnswerSheets !== undefined) setData(state.stdAnswerSheets);
  }, [state.stdAnswerSheets]);

  React.useEffect(() => {
    if (state.stdAnswerSheets !== undefined) timer();
  }, [state.stdAnswerSheets, timer]);

  const columns = [
    {
      name: 'زمان ثبت',
      selector: row => row.createdAt,
      grow: 3,
      minWidth: '120px',
    },
    {
      name: 'وضعیت',
      selector: row =>
        row.status === 'pending'
          ? 'در حال بررسی'
          : row.status === 'rejected'
          ? 'رد شده'
          : 'تایید شده',
      grow: 3,
      minWidth: '120px',
    },
    {
      name: 'توضیحات',
      selector: row =>
        row.status === 'accepted' && row.main !== undefined
          ? 'این فایل برای تصحیح استفاده می شود'
          : row.msg,
      grow: 3,
      minWidth: '120px',
    },
    {
      name: 'عملیات',
      cell: (row, index, column, id) => {
        if (
          row.status !== 'accepted' ||
          row.stdAns === undefined ||
          row.stdAns === ''
        )
          return <></>;
        return (
          <a
            style={{
              alignSelf: 'center',
            }}
            target={'_blank'}
            download={true}
            href={row.stdAns}>
            <SimpleFontIcon kind={'med'} icon={faDownload} />
          </a>
        );
      },
      minWidth: '100px',
      maxWidth: '100px',
      center: true,
    },
  ];

  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;

  const timer = React.useCallback(() => {
    let tmp = state.stdAnswerSheets.find(elem => {
      return elem.status === 'pending';
    });

    if (tmp === undefined) return;

    timerVar = setTimeout(() => {
      props.setLoading(true);
      Promise.all([
        generalRequest(
          routes.getMySubmits +
            state.quizInfo.generalMode +
            '/' +
            state.quizInfo.id,
          'get',
          undefined,
          'data',
          state.token,
        ),
      ]).then(res => {
        props.setLoading(false);
        if (res[0] == null) {
          clearTimeout(timerVar);
          return;
        }
        dispatch({stdAnswerSheets: res[0]});
        let tmp = res[0].find(elem => {
          return elem.status === 'pending';
        });

        if (tmp === undefined) {
          clearTimeout(timerVar);
          return;
        }

        timer();
      });
    }, [10000]);
  }, [
    props,
    dispatch,
    state.stdAnswerSheets,
    state.quizInfo.generalMode,
    state.quizInfo.id,
    state.token,
  ]);

  return (
    <CommonWebBox>
      {showAddBtn && (
        <CommonButton
          padding={isInPhone ? '5px 5px' : undefined}
          textStyle={
            isInPhone ? {fontSize: 14, paddingLeft: 20, paddingRight: 20} : {}
          }
          title={'ارسال پاسخ'}
          onPress={() => {
            dispatch({openFileSelectorFlag: true});
          }}
        />
      )}

      {data !== undefined && (
        <CommonDataTable
          data={data}
          columns={columns}
          pagination={false}
          excel={false}
        />
      )}
    </CommonWebBox>
  );
}

export default Submits;
