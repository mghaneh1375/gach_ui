import React, {useMemo, useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {useEffectOnce} from 'usehooks-ts';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderDatePicker from '../../../../styles/Common/JustBottomBorderDatePicker';
import commonTranslator from '../../../../translator/Common';
import {formatPrice} from '../../../../services/Utility';
import Translate from '../../../advisorPanel/Teach/Transaction/Translate';
import {styles} from '../../../../styles/Common/Styles';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import columns from './TableStructure';

function Transactions(props) {
  const navigate = props.navigate;
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [data, setData] = useState();
  const [filter, setFilter] = useState({
    settlementStatus: 'all',
  });
  const [teachers, setTeachers] = useState();
  const settlementValues = useMemo(() => {
    return [
      {id: 'all', item: commonTranslator.all},
      {id: 'notSettlements', item: Translate.notSettlements},
      {id: 'settlements', item: Translate.settlements},
    ];
  }, []);

  useEffectOnce(() => {
    fetchData();
  }, []);

  const fetchData = React.useCallback(() => {
    dispatch({loading: true});
    const params = new URLSearchParams();

    if (filter.settlementStatus !== 'all')
      params.append(
        'justSettlements',
        filter.settlementStatus === 'settlements',
      );

    if (filter.from && filter.from !== null) params.append('from', filter.from);
    if (filter.to && filter.to !== null) params.append('to', filter.to);
    if (filter.teacherId) params.append('teacher_id', filter.teacherId);

    Promise.all(
      teachers === undefined
        ? [
            generalRequest(
              routes.getAllTeachTransactions + '?' + params.toString(),
              'get',
              undefined,
              'data',
              state.token,
            ),
            generalRequest(
              routes.getAllTeachersDigest,
              'get',
              undefined,
              'data',
              state.token,
            ),
          ]
        : [
            generalRequest(
              routes.getAllTeachTransactions + '?' + params.toString(),
              'get',
              undefined,
              'data',
              state.token,
            ),
          ],
    ).then(res => {
      dispatch({loading: false});
      if (res[0] == null || (teachers === undefined && res[1] == null)) {
        navigate('/');
        return;
      }
      setData(res[0]);
      if (teachers === undefined) {
        setTeachers([
          {
            id: 'all',
            item: commonTranslator.all,
          },
          ...res[1].map(e => {
            return {
              id: e.id,
              item: e.name,
            };
          }),
        ]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <CommonWebBox header={commonTranslator.allTeachTransactions}>
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
          value={
            filter.settlementStatus &&
            settlementValues.find(elem => elem.id === filter.settlementStatus)
          }
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
  );
}

export default Transactions;
