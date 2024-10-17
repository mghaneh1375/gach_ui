import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import adviceColumns, {teachColumns} from './columns';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import {generalRequest} from '../../../../../API/Utility';
import {routes} from '../../../../../API/APIRoutes';
import {dispatchUsersContext, usersContext} from '../Context';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import {showError, showSuccess} from '../../../../../services/Utility';
import JustBottomBorderDatePicker from '../../../../../styles/Common/JustBottomBorderDatePicker';

function Transactions(props) {
  const useGlobalState = () => [
    React.useContext(usersContext),
    React.useContext(dispatchUsersContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [adviceTransactions, setAdviceTransactions] = useState();
  const [teachTransactions, setTeachTransactions] = useState();
  const [showOp, setShowOp] = useState(false);
  const [amount, setAmount] = useState();
  const [desc, setDesc] = useState();
  const [selectedRow, setSelectedRow] = useState();
  const [filter, setFilter] = useState({
    transactionMode: 'all',
    settlementStatus: 'all',
  });

  const [transactionsMode, settlementsStatus] = useMemo(() => {
    return [
      [
        {item: 'همه', id: 'all'},
        {item: 'تدریس', id: 'teach'},
        {item: 'مشاوره', id: 'advice'},
      ],
      [
        {item: 'همه', id: 'all'},
        {item: 'تسویه شده', id: 'settled'},
        {item: 'تسویه نشده', id: 'notSettled'},
      ],
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchData = useCallback(() => {
    const params = new URLSearchParams();
    if (filter.settlementStatus !== 'all')
      params.append('settlementStatus', filter.settlementStatus === 'settled');
    if (filter.transactionMode !== 'all')
      params.append('transactionMode', filter.transactionMode);
    if (filter.from) params.append('from', filter.from);
    if (filter.to) params.append('to', filter.to);
    if (filter.fromSettled) params.append('fromSettled', filter.fromSettled);
    if (filter.toSettled) params.append('toSettled', filter.toSettled);

    Promise.all([
      generalRequest(
        routes.getAdvisorTransactions +
          state.selectedUser.id +
          '?' +
          params.toString(),
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      if (res[0] == null) {
        props.setMode('list');
        return;
      }
      setAdviceTransactions(res[0].filter(e => e.mode === 'advice'));
      setTeachTransactions(res[0].filter(e => e.mode === 'teach'));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOp = (idx, selectedRow) => {
    if (selectedRow.settledAt !== 'تسویه نشده') {
      showError('این رکورد قبلا تسویه شده است');
      return;
    }
    setSelectedRow(selectedRow);
    setShowOp(true);
  };

  return (
    <CommonWebBox
      header={'تراکنش ها'}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <PhoneView style={{gap: '10px'}}>
        <JustBottomBorderSelect
          values={settlementsStatus}
          setter={new_status => {
            setFilter(prevValues => ({
              ...prevValues,
              settlementStatus: new_status,
            }));
          }}
          value={settlementsStatus.find(e => e.id === filter.settlementStatus)}
          placeholder={'وضعیت تسویه'}
          subText={'وضعیت تسویه'}
        />
        <JustBottomBorderSelect
          values={transactionsMode}
          setter={new_status => {
            setFilter(prevValues => ({
              ...prevValues,
              transactionMode: new_status,
            }));
          }}
          value={transactionsMode.find(e => e.id === filter.transactionMode)}
          placeholder={'بخش'}
          subText={'بخش'}
        />
        <JustBottomBorderDatePicker
          value={filter.from}
          setter={e =>
            setFilter(prevValues => ({
              ...prevValues,
              from: e,
            }))
          }
          placeholder={'از'}
          subText={'از'}
        />
        <JustBottomBorderDatePicker
          value={filter.to}
          setter={e =>
            setFilter(prevValues => ({
              ...prevValues,
              to: e,
            }))
          }
          placeholder={'تا'}
          subText={'تا'}
        />
        <JustBottomBorderDatePicker
          value={filter.fromSettled}
          setter={e =>
            setFilter(prevValues => ({
              ...prevValues,
              fromSettled: e,
            }))
          }
          placeholder={'از تسویه'}
          subText={'از تسویه'}
        />
        <JustBottomBorderDatePicker
          value={filter.toSettled}
          setter={e =>
            setFilter(prevValues => ({
              ...prevValues,
              toSettled: e,
            }))
          }
          placeholder={'تا تسویه'}
          subText={'تا تسویه'}
        />
      </PhoneView>
      <CommonButton title={'جست و جو'} onPress={() => fetchData()} />
      <CommonDataTable
        handleOp={handleOp}
        columns={adviceColumns}
        data={adviceTransactions}
      />
      <CommonDataTable
        handleOp={handleOp}
        columns={teachColumns}
        data={teachTransactions}
      />
      {showOp && (
        <LargePopUp
          toggleShowPopUp={() => {
            setSelectedRow(undefined);
            setShowOp(false);
          }}
          btns={
            <CommonButton
              theme={'dark'}
              title={'تایید'}
              onPress={async () => {
                if (amount === undefined) {
                  showError('لطفا مقدار تسویه را وارد نمایید');
                  return;
                }
                const data = {
                  section: selectedRow.mode === 'advice' ? 'advice' : 'class',
                  amount: amount,
                };
                if (desc !== undefined) data.desc = desc;
                const res = await generalRequest(
                  routes.createSettlementRequest +
                    state.selectedUser.id +
                    '/' +
                    selectedRow.id,
                  'post',
                  data,
                  undefined,
                  props.token,
                );
                if (res !== null) {
                  showSuccess();
                  setSelectedRow(undefined);
                  setShowOp(false);
                }
              }}
            />
          }
          title={'تسویه'}>
          <PhoneView>
            <JustBottomBorderTextInput
              subText={'مقدار تسویه'}
              placeholder={'مقدار تسویه'}
              justNum={true}
              value={amount}
              onChangeText={e => setAmount(e)}
            />
          </PhoneView>
          <PhoneView>
            <JustBottomBorderTextInput
              subText={'توضیحات  (اختیاری)'}
              placeholder={'توضیحات  (اختیاری)'}
              multiline={true}
              value={desc}
              onChangeText={e => setDesc(e)}
            />
          </PhoneView>
        </LargePopUp>
      )}
    </CommonWebBox>
  );
}

export default Transactions;
