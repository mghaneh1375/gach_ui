import React, {useMemo, useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {Translator} from '../Translate';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import columns from './components/TableStructure';
import {useEffectOnce} from 'usehooks-ts';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {showSuccess} from '../../../../services/Utility';
import Basket from '../../../../components/web/Basket';
import BuySchedule from '../../../general/Teachers/BuySchedule';
import OffCode from '../../../general/buy/components/OffCode';
import SuccessTransaction from '../../../../components/web/SuccessTransaction/SuccessTransaction';
import {styles} from '../../../../styles/Common/Styles';
import commonTranslator from '../../../../translator/Common';

function MyScheduleRequests(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [requests, setRequests] = useState();
  const [selectedRequest, setSelectedRequest] = useState();
  const [showOp, setShowOp] = useState(false);
  const [activeLinks, setActiveLinks] = useState();
  const [showBasket, setShowBasket] = useState(false);
  const [showSuccessTransaction, setShowSuccessTransaction] = useState(false);
  const [showOffCodePane, setShowOffCodePane] = useState(false);
  const userMoney = useMemo(
    () => state.user.user.money,
    [state.user.user.money],
  );
  const [usedFromWallet, setUsedFromWallet] = useState();
  const [userOff, setUserOff] = useState();
  const [offAmount, setOffAmount] = useState(0);

  const fetchData = React.useCallback(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.myScheduleRequests,
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({loading: false});
      if (res[0] === null) {
        props.navigate('/');
        return;
      }
      setRequests(res[0]);
      setActiveLinks(
        res[0].filter(
          e => e.status === 'accept' || e.status === 'waitForPaySemiPrivate',
        ),
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffectOnce(() => {
    fetchData();
  }, []);

  const handleOp = (idx, row) => {
    setSelectedRequest(row);
    setShowOp(true);
  };

  const setOffCodeResult = (amount, type, code) => {
    setUserOff({type: type, amount: amount, code: code});
    let offAmountTmp =
      type === 'percent' ? (selectedRequest.price * amount) / 100 : amount;

    setOffAmount(Math.min(offAmountTmp, selectedRequest.price));
    let shouldPayTmp = selectedRequest.price - offAmountTmp;

    if (shouldPayTmp > 0) {
      setUsedFromWallet(Math.min(userMoney, shouldPayTmp));
      shouldPayTmp -= userMoney;
    } else setUsedFromWallet(0);

    selectedRequest.shouldPay = Math.max(0, shouldPayTmp);
  };

  return (
    <>
      {showSuccessTransaction && (
        <SuccessTransaction
          navigate={props.navigate}
          link={
            <PhoneView>
              <SimpleText
                style={{
                  ...styles.dark_blue_color,
                  ...styles.fontSize13,
                  ...styles.marginLeft5,
                }}
                text={commonTranslator.forView}
              />
              <SimpleText
                style={{
                  ...styles.dark_blue_color,
                  ...styles.fontSize13,
                }}
                text={commonTranslator.clickHere}
              />
            </PhoneView>
          }
        />
      )}

      {showOffCodePane && (
        <OffCode
          token={state.token}
          for={'classes'}
          setLoading={new_status => dispatch({loading: new_status})}
          setResult={setOffCodeResult}
          toggleShowPopUp={() => setShowOffCodePane(false)}
        />
      )}
      {!showOp && (
        <>
          {activeLinks && activeLinks.length > 0 && (
            <CommonWebBox header={Translator.activeLink}>
              {activeLinks.map((e, index) => {
                return (
                  <SimpleText
                    style={{
                      cursor: 'pointer',
                      color: '#0000EE',
                      textDecoration: 'underline',
                    }}
                    key={index}
                    onPress={() => {
                      e.shouldPay = Math.max(
                        0,
                        e.price - e.prePaid - userMoney,
                      );
                      setUsedFromWallet(Math.min(userMoney, e.price));
                      setShowBasket(true);
                      setSelectedRequest(e);
                    }}
                    text={
                      'پرداخت هزینه جلسه ' +
                      e.startAt +
                      ' - مدرس: ' +
                      e.teacher +
                      ' - مهلت پرداخت: ' +
                      e.expireAt
                    }
                  />
                );
              })}
            </CommonWebBox>
          )}

          <CommonWebBox header={Translator.myRequests}>
            {requests && (
              <CommonDataTable
                handleOp={handleOp}
                data={requests}
                columns={columns}
                excel={false}
              />
            )}
          </CommonWebBox>
          {showBasket && (
            <Basket
              backBtnTitle="انصراف"
              onBackClick={() => {
                setSelectedRequest(undefined);
                setShowBasket(false);
              }}>
              <BuySchedule
                id={selectedRequest.id}
                price={selectedRequest.price}
                shouldPay={selectedRequest.shouldPay}
                prePaid={selectedRequest.prePaid}
                canUseOff={true}
                off={offAmount}
                userOff={userOff}
                setLoading={new_status => dispatch({status: new_status})}
                token={state.token}
                user={state.user}
                usedFromWallet={usedFromWallet}
                toggleShowOffCodePane={() =>
                  setShowOffCodePane(!showOffCodePane)
                }
                setShowSuccessTransaction={setShowSuccessTransaction}
              />
            </Basket>
          )}
        </>
      )}
      {showOp && (
        <CommonWebBox
          backBtn={true}
          onBackClick={() => {
            setShowOp(false);
            setSelectedRequest(undefined);
          }}
          header={Translator.reqDetail}>
          <PhoneView style={{gap: '10px'}}>
            {(selectedRequest.status === 'pending' ||
              selectedRequest.status === 'accept') && (
              <CommonButton
                onPress={async () => {
                  dispatch({loading: true});
                  const res = await generalRequest(
                    routes.cancelTeachRequest + selectedRequest.id,
                    'put',
                    undefined,
                    undefined,
                    state.token,
                  );
                  dispatch({loading: false});
                  if (res !== null) {
                    showSuccess();
                    setRequests(
                      requests.map(e => {
                        if (e.id !== selectedRequest.id) return e;
                        e.status = 'cancel';
                        return e;
                      }),
                    );
                    setShowOp(false);
                    setSelectedRequest(undefined);
                  }
                }}
                theme={'transparent'}
                title={Translator.cancelReq}
              />
            )}
          </PhoneView>
        </CommonWebBox>
      )}
    </>
  );
}

export default MyScheduleRequests;
