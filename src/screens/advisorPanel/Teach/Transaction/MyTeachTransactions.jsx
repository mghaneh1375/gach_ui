import React, {useMemo, useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import commonTranslator from '../../../../translator/Common';
import Translate from './Translate';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import columns from './TableStructure';
import JustBottomBorderDatePicker from '../../../../styles/Common/JustBottomBorderDatePicker';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {useEffectOnce} from 'usehooks-ts';
import {styles} from '../../../../styles/Common/Styles';
import {formatPrice, showSuccess} from '../../../../services/Utility';
import {FontIcon, SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {
  faArrowDown,
  faArrowUp,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

function MyTeachTransactions(props) {
  const navigate = props.navigate;
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [data, setData] = useState();
  const [showHistory, setShowHistory] = useState(false);
  const [settlementHistory, setSettlementHistory] = useState();
  const [canRequestSettlement, setCanRequestSettlement] = useState(false);
  const [filter, setFilter] = useState({
    settlementStatus: 'notSettlements',
  });
  const [settledFilter, setSettledFilter] = useState({
    status: 'all',
  });
  const [needCanRequestSettlement, setNeedCanRequestSettlement] =
    useState(true);

  const [settlementStatusValues, settlementValues, settlementColumns] =
    useMemo(() => {
      return [
        [
          {id: 'all', item: commonTranslator.all},
          {id: 'paid', item: Translate.paid},
          {id: 'wait_for_pay', item: Translate.waitForPay},
          {id: 'pending', item: Translate.pending},
          {id: 'reject', item: Translate.reject},
        ],
        [
          {id: 'all', item: commonTranslator.all},
          {id: 'notSettlements', item: Translate.notSettlements},
          {id: 'settlements', item: Translate.settlements},
        ],
        [
          {
            name: commonTranslator.op,
            cell: (row, index, column, id) => {
              if (row.status !== 'pending') return <></>;
              return (
                <SimpleFontIcon
                  kind={'med'}
                  key={index}
                  onPress={async () => {
                    dispatch({loading: true});
                    const res = await generalRequest(
                      routes.cancelTeachSettlementRequest,
                      'delete',
                      undefined,
                      undefined,
                      state.token,
                    );
                    dispatch({loading: false});
                    if (res != null) {
                      setSettlementHistory(
                        settlementHistory.filter(e => e.id !== row.id),
                      );
                      showSuccess();
                    }
                  }}
                  icon={faTrash}
                />
              );
            },
            grow: 1,
          },
          {
            name: commonTranslator.createdAt,
            selector: row => row.createdAt,
            grow: 1,
          },
          {
            name: commonTranslator.answerAt,
            selector: row => row.answerAt,
            grow: 1,
          },
          {
            name: commonTranslator.status,
            selector: row =>
              row.status === 'pending'
                ? 'در حال بررسی'
                : row.status === 'paid'
                ? 'پرداخت شده'
                : row.status === 'reject'
                ? 'رد شده'
                : row.status === 'wait_for_pay'
                ? 'در انتظار پرداخت'
                : 'نامشخص',
            grow: 1,
          },
          {
            name: commonTranslator.amount,
            selector: row => row.amount,
            grow: 1,
          },
          {
            name: Translate.paidAt,
            selector: row => (row.paidAt === '' ? 'پرداخت نشده' : row.paidAt),
            grow: 1,
          },
          {
            name: commonTranslator.desc,
            selector: row => row.desc,
            grow: 3,
          },
        ],
      ];
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settlementHistory]);

  const fetchData = React.useCallback(() => {
    dispatch({loading: true});
    const params = new URLSearchParams();
    params.append('needCanRequestSettlement', needCanRequestSettlement);

    if (filter.settlementStatus !== 'all')
      params.append(
        'justSettlements',
        filter.settlementStatus === 'settlements',
      );

    if (filter.from && filter.from !== null) params.append('from', filter.from);
    if (filter.to && filter.to !== null) params.append('to', filter.to);

    Promise.all([
      generalRequest(
        routes.getMyTeachTransactions + '?' + params.toString(),
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({loading: false});
      if (res[0] == null) {
        navigate('/');
        return;
      }
      setCanRequestSettlement(res[0].canRequestSettlement);
      setNeedCanRequestSettlement(false);
      setData(res[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const fetchHistory = React.useCallback(() => {
    dispatch({loading: true});
    const param = new URLSearchParams();
    if (settledFilter.status !== 'all')
      param.append('status', settledFilter.status);
    if (settledFilter.from !== undefined)
      param.append('createdFrom', settledFilter.from);
    if (settledFilter.to !== undefined)
      param.append('createdTo', settledFilter.to);
    if (settledFilter.answerFrom !== undefined)
      param.append('answerFrom', settledFilter.answerFrom);
    if (settledFilter.answerTo !== undefined)
      param.append('answerTo', settledFilter.answerTo);
    Promise.all([
      generalRequest(
        routes.getMyTeachSettledRequests + '?' + param.toString(),
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({loading: false});
      if (res[0] != null) setSettlementHistory(res[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settledFilter]);

  useEffectOnce(() => {
    fetchData();
  }, []);

  return (
    <>
      {canRequestSettlement && (
        <CommonWebBox>
          <SimpleText
            style={{
              cursor: 'pointer',
              color: 'red',
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
            onPress={async () => {
              dispatch({loading: true});
              const res = await generalRequest(
                routes.teachSettlementRequest,
                'post',
                undefined,
                undefined,
                state.token,
              );
              dispatch({loading: false});
              if (res != null) {
                setSettlementHistory(undefined);
                setNeedCanRequestSettlement(false);
                showSuccess();
              }
            }}
            text={
              Translate.requestSettlement +
              ' - مبلغ قابل تسویه: ' +
              data.settlementAmount
            }
          />
        </CommonWebBox>
      )}
      <CommonWebBox
        header={Translate.settlementHistory}
        btn={
          <FontIcon
            onPress={async () => {
              if (showHistory) {
                setShowHistory(false);
                return;
              }
              if (settlementHistory === undefined) fetchHistory();
              setShowHistory(true);
            }}
            theme="rect"
            kind="normal"
            back={'orange'}
            icon={showHistory ? faArrowDown : faArrowUp}
          />
        }>
        {showHistory && (
          <>
            <PhoneView style={{gap: '20px'}}>
              <JustBottomBorderSelect
                placeholder={Translate.settlementValues}
                subText={Translate.settlementValues}
                setter={e =>
                  setSettledFilter(prevValues => ({
                    ...prevValues,
                    status: e,
                  }))
                }
                values={settlementStatusValues}
                value={settlementStatusValues.find(
                  elem => elem.id === settledFilter.status,
                )}
              />
              <JustBottomBorderDatePicker
                value={settledFilter.from}
                setter={e =>
                  setSettledFilter(prevValues => ({
                    ...prevValues,
                    from: e,
                  }))
                }
                placeholder={Translate.from}
                subText={Translate.from}
              />
              <JustBottomBorderDatePicker
                value={settledFilter.to}
                setter={e =>
                  setSettledFilter(prevValues => ({
                    ...prevValues,
                    to: e,
                  }))
                }
                placeholder={Translate.to}
                subText={Translate.to}
              />
              <JustBottomBorderDatePicker
                value={settledFilter.answerFrom}
                setter={e =>
                  setSettledFilter(prevValues => ({
                    ...prevValues,
                    answerFrom: e,
                  }))
                }
                placeholder={Translate.answerFrom}
                subText={Translate.answerFrom}
              />
              <JustBottomBorderDatePicker
                value={settledFilter.answerTo}
                setter={e =>
                  setSettledFilter(prevValues => ({
                    ...prevValues,
                    answerTo: e,
                  }))
                }
                placeholder={Translate.answerTo}
                subText={Translate.answerTo}
              />
            </PhoneView>
            <CommonButton
              onPress={async () => fetchHistory()}
              title={commonTranslator.confirm}
            />
            <CommonDataTable
              excel={false}
              columns={settlementColumns}
              data={settlementHistory}
            />
          </>
        )}
      </CommonWebBox>
      <CommonWebBox header={Translate.transactions}>
        <PhoneView style={{gap: '20px'}}>
          <JustBottomBorderSelect
            placeholder={Translate.settlementValues}
            subText={Translate.settlementValues}
            setter={e =>
              setFilter(prevValues => ({
                ...prevValues,
                settlementStatus: e,
              }))
            }
            values={settlementValues}
            value={settlementValues.find(
              elem => elem.id === filter.settlementStatus,
            )}
          />
          <JustBottomBorderDatePicker
            value={filter.from}
            setter={e =>
              setFilter(prevValues => ({
                ...prevValues,
                from: e,
              }))
            }
            placeholder={Translate.from}
            subText={Translate.from}
          />
          <JustBottomBorderDatePicker
            value={filter.to}
            setter={e =>
              setFilter(prevValues => ({
                ...prevValues,
                to: e,
              }))
            }
            placeholder={Translate.to}
            subText={Translate.to}
          />
        </PhoneView>
        <CommonButton
          title={commonTranslator.confirm}
          onPress={async () => fetchData()}
        />
        {data && (
          <>
            <MyView
              style={{marginTop: '10px', gap: '10px', alignItems: 'center'}}>
              <SimpleText
                stlye={styles.textCenter}
                text={Translate.totalPrice + formatPrice(data.totalPrice)}
              />
              <SimpleText
                stlye={styles.textCenter}
                text={Translate.totalSettled + formatPrice(data.totalSettled)}
              />
            </MyView>
            <CommonDataTable excel={false} data={data.data} columns={columns} />
          </>
        )}
      </CommonWebBox>
    </>
  );
}

export default MyTeachTransactions;
