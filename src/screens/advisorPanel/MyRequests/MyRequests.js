import {faCheck, faInfo, faRemove} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {showSuccess} from '../../../services/Utility';
import {CommonButton, CommonWebBox, PhoneView} from '../../../styles/Common';
import CommonDataTable from '../../../styles/Common/CommonDataTable';
import {FontIcon} from '../../../styles/Common/FontIcon';
import JustBottomBorderSelect from '../../../styles/Common/JustBottomBorderSelect';
import {LargePopUp} from '../../../styles/Common/PopUp';
import {styles} from '../../../styles/Common/Styles';
import commonTranslator from '../../../translator/Common';
import FinancePlan from '../../general/Advisors/FinancePlan';
import Translate from './Translate';

function MyRequests(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [filter, setFilter] = useState('inProgress');
  const [mode, setMode] = useState();
  const [selectedRequest, setSelectedRequest] = useState();

  const fetchData = React.useCallback(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.myStudentRequests,
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({loading: false});

      if (res[0] === null) {
        navigate('/');
        return;
      }

      setData(res[0]);
    });
  }, [dispatch, state.token, navigate]);

  useEffectOnce(() => {
    fetchData();
  });

  React.useEffect(() => {
    console.log(filter);
    if (data === undefined) return;

    setFilteredData(
      data.filter(e => {
        if (filter === 'all') return true;
        if (
          filter === 'finished' &&
          (e.status === 'pending' ||
            (e.status === 'accept' && e.paid === undefined))
        )
          return false;

        if (
          filter === 'inProgress' &&
          (e.status === 'reject' ||
            (e.status === 'accept' && e.paid !== undefined))
        )
          return false;

        return true;
      }),
    );
  }, [filter, data]);

  const columns = [
    {
      name: 'عملیات',
      cell: row => {
        if (row.status !== 'pending') return <></>;

        return (
          <PhoneView style={{...styles.gap10}}>
            <FontIcon
              icon={faInfo}
              kind={'normal'}
              back={'yellow'}
              theme={'square'}
              onPress={() => setSelectedRequest(row)}
            />
            {row.status === 'pending' && (
              <>
                <FontIcon
                  icon={faRemove}
                  kind={'normal'}
                  theme={'square'}
                  onPress={async () => {
                    dispatch({loading: true});
                    let res = await generalRequest(
                      routes.answerStudentRequest + row.id + '/no',
                      'post',
                      undefined,
                      undefined,
                      state.token,
                    );
                    dispatch({loading: false});

                    if (res != null) {
                      let tmp = data.map(elem => {
                        if (elem.id !== row.id) return elem;
                        elem.status = 'reject';
                        return elem;
                      });
                      setData(tmp);
                      showSuccess();
                    }
                  }}
                />
                <FontIcon
                  icon={faCheck}
                  kind={'normal'}
                  back={'blue'}
                  theme={'square'}
                  onPress={async () => {
                    dispatch({loading: true});
                    let res = await generalRequest(
                      routes.answerStudentRequest + row.id + '/yes',
                      'post',
                      undefined,
                      undefined,
                      state.token,
                    );
                    dispatch({loading: false});

                    if (res != null) {
                      let tmp = data.map(elem => {
                        if (elem.id !== row.id) return elem;
                        elem.status = 'accept';
                        return elem;
                      });
                      setData(tmp);
                      showSuccess();
                    }
                  }}
                />
              </>
            )}
          </PhoneView>
        );
      },
      minWidth: '200px',
      maxWidth: '200px',
      center: true,
    },
    {
      name: Translate.student,
      selector: row => row.name,
      grow: 1,
    },
    {
      name: Translate.title,
      selector: row => row.title,
      grow: 1,
    },
    {
      name: Translate.price,
      selector: row => row.price,
      grow: 1,
    },
    {
      name: commonTranslator.status,
      selector: row =>
        row.status === 'pending'
          ? Translate.pending
          : row.status === 'reject'
          ? Translate.rejected
          : row.paid !== undefined
          ? 'پرداخت شده'
          : Translate.accepted + ' و در انتظار پرداخت',
      grow: 1,
    },
    {
      name: commonTranslator.createdAt,
      selector: row => row.createdAt,
      grow: 1,
    },
    {
      name: Translate.answerAt,
      selector: row => row.answerAt,
      grow: 1,
      center: true,
    },
  ];

  const filterKeyVals = [
    {item: 'در جریان', id: 'inProgress'},
    {item: 'اتمام یافته', id: 'finished'},
    {item: 'همه', id: 'all'},
  ];

  return (
    <>
      {selectedRequest !== undefined && (
        <LargePopUp
          toggleShowPopUp={() => {
            if (mode !== undefined) setMode(undefined);
            else setSelectedRequest(undefined);
          }}>
          {selectedRequest !== undefined && mode === 'finance' && (
            <FinancePlan
              plan={{
                title: selectedRequest.title,
                videoCalls: selectedRequest.videoCalls,
                maxKarbarg: selectedRequest.maxKarbarg,
                maxExam: selectedRequest.maxExam,
                maxChat: selectedRequest.maxChat,
                price: selectedRequest.price,
              }}
            />
          )}
          {mode === undefined && (
            <PhoneView style={{...styles.gap15}}>
              <CommonButton
                onPress={() =>
                  window.open('/studentLifeStyle/' + selectedRequest.userId)
                }
                theme={'transparent'}
                title={'مشاهده برنامه روزانه'}
              />
              <CommonButton
                onPress={() => setMode('finance')}
                theme={'transparent'}
                title={'مشاهده پلن مالی'}
              />

              <CommonButton
                onPress={() =>
                  window.open(
                    'studentEducationalHistory/' + selectedRequest.userId,
                  )
                }
                theme={'transparent'}
                title={'مشاهده سوابق تحصیلی'}
              />
            </PhoneView>
          )}
        </LargePopUp>
      )}
      <CommonWebBox>
        <PhoneView>
          <JustBottomBorderSelect
            value={filterKeyVals.find(elem => elem.id === filter)}
            placeholder={'وضعیت درخواست'}
            subText={'وضعیت درخواست'}
            setter={setFilter}
            values={filterKeyVals}
          />
        </PhoneView>
        {filteredData !== undefined && (
          <CommonDataTable
            excel={false}
            pagination={false}
            columns={columns}
            data={filteredData}
          />
        )}
      </CommonWebBox>
    </>
  );
}

export default MyRequests;
