import React, {useEffect, useMemo, useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
} from '../../../styles/Common';
import commonTranslator from '../../../translator/Common';
import Translate from '../../advisorPanel/Teach/Transaction/Translate';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import CommonDataTable from '../../../styles/Common/CommonDataTable';
import JustBottomBorderDatePicker from '../../../styles/Common/JustBottomBorderDatePicker';
import JustBottomBorderSelect from '../../../styles/Common/JustBottomBorderSelect';
import {LargePopUp} from '../../../styles/Common/PopUp';
import {showError, showSuccess} from '../../../services/Utility';
import JustBottomBorderTextInput from '../../../styles/Common/JustBottomBorderTextInput';

function SettlementRequests(props) {
  const navigate = props.navigate;
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [settlementHistory, setSettlementHistory] = useState();
  const [state, dispatch] = useGlobalState();
  const [showOp, setShowOp] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [newStatus, setNewStatus] = useState();
  const [desc, setDesc] = useState();
  const [settledFilter, setSettledFilter] = useState({
    status: 'all',
  });
  const [settlementStatusValues, settlementStatuses, columns] = useMemo(() => {
    return [
      [
        {id: 'all', item: commonTranslator.all},
        {id: 'paid', item: Translate.paid},
        {id: 'wait_for_pay', item: Translate.waitForPay},
        {id: 'pending', item: Translate.pending},
        {id: 'reject', item: Translate.reject},
      ],
      [
        {id: 'paid', item: Translate.paid},
        {id: 'wait_for_pay', item: Translate.waitForPay},
        {id: 'reject', item: Translate.reject},
      ],
      [
        {
          name: Translate.username,
          selector: row => row.username,
          grow: 1,
        },
        {
          name: Translate.section,
          selector: row => (row.section === 'class' ? 'تدریس' : 'نامشخص'),
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
  }, []);

  useEffect(() => {
    if (!showOp) {
      setSelectedRow(undefined);
      setDesc(undefined);
      setNewStatus(undefined);
    }
  }, [showOp]);

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
        routes.settlementRequests + '?' + param.toString(),
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
      setSettlementHistory(res[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settledFilter]);

  useEffectOnce(() => {
    fetchHistory();
  }, []);

  const handleOp = (idx, row) => {
    setSelectedRow(row);
    setShowOp(true);
  };

  return (
    <>
      <CommonWebBox>
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
          handleOp={handleOp}
          columns={columns}
          data={settlementHistory}
        />
        {showOp && (
          <LargePopUp
            title={Translate.changeStatus}
            toggleShowPopUp={() => setShowOp(false)}>
            <MyView style={{gap: '10px'}}>
              <PhoneView>
                <JustBottomBorderSelect
                  placeholder={Translate.newStatus}
                  subText={Translate.newStatus}
                  setter={setNewStatus}
                  value={
                    newStatus &&
                    settlementStatuses.find(elem => elem.id === newStatus)
                  }
                  values={settlementStatuses}
                />
              </PhoneView>
              <JustBottomBorderTextInput
                value={desc}
                onChangeText={e => setDesc(e)}
                multiline={3}
                placeholder={commonTranslator.desc}
                subText={commonTranslator.desc}
              />
            </MyView>
            <CommonButton
              title={commonTranslator.confrim}
              theme={'dark'}
              onPress={async () => {
                if (newStatus === undefined) {
                  showError(commonTranslator.pleaseFillAllFields);
                  return;
                }
                dispatch({loading: true});
                const data = {status: newStatus};
                if (desc) data.desc = desc;
                const res = await generalRequest(
                  routes.setSettlementRequestStatus + selectedRow.id,
                  'put',
                  data,
                  undefined,
                  state.token,
                );
                dispatch({loading: false});
                if (res != null) {
                  setSettlementHistory(
                    settlementHistory.map(e => {
                      if (e.id === selectedRow.id) {
                        e.status = newStatus;
                        if (desc) e.desc = desc;
                      }
                      return e;
                    }),
                  );
                  showSuccess(true);
                  setShowOp(false);
                }
              }}
            />
          </LargePopUp>
        )}
      </CommonWebBox>
    </>
  );
}

export default SettlementRequests;
