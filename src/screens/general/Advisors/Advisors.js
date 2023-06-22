import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {addItem, removeItems, showSuccess} from '../../../services/Utility';
import {PhoneView} from '../../../styles/Common';
import {LargePopUp} from '../../../styles/Common/PopUp';
import {styles} from '../../../styles/Common/Styles';
import Card from './Card';
import FinancePlan from './FinancePlan';
import {setCacheItem} from '../../../API/User';
import OffCode from '../buy/components/OffCode';

function Advisors(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [data, setData] = useState();
  const [myAdvisor, setMyAdvisor] = useState();
  const [openRequests, setOpenRequests] = useState();
  const [fetchedPlans, setFetchedPlans] = useState([]);
  const [advisorPlans, setAdvisorPlans] = useState();

  const [refId, setRefId] = useState();

  React.useEffect(() => {
    if (refId === undefined) return;
    ref.current.submit();
  }, [refId]);

  const ref = React.useRef();

  const goToPay = async (token, data, advisorId) => {
    return await generalRequest(
      routes.payAdvisorPrice + advisorId,
      'post',
      data,
      ['action', 'refId'],
      token,
    );
  };

  const [showSuccessTransaction, setShowSuccessTransaction] = useState(false);
  const [showOffCodePane, setShowOffCodePane] = useState();
  const [selectedAdvisor, setSelectedAdvisor] = useState();
  const [userOff, setUserOff] = useState();

  const goToPayLocal = async advisorId => {
    let data = {};

    // if (userOff !== undefined && userOff.code !== undefined)
    //   data.off = userOff.code;

    dispatch({loading: true});

    let res = await goToPay(state.token, data, advisorId);

    dispatch({loading: false});

    if (res !== null) {
      if (res.action === 'success') {
        let user = props.user;
        user.user.money = res.refId;
        await setCacheItem('user', JSON.stringify(user));
        setShowSuccessTransaction(true);
      } else if (res.action === 'pay') {
        setRefId(res.refId);
      }
    }
  };

  const fetchData = React.useCallback(() => {
    dispatch({loading: true});
    Promise.all(
      state.token !== undefined && state.token !== null
        ? [
            generalRequest(
              routes.getAllAdvisors,
              'get',
              undefined,
              'data',
              undefined,
            ),
            generalRequest(
              routes.getMyAdvisor,
              'get',
              undefined,
              'data',
              state.token,
            ),
            generalRequest(
              routes.hasOpenRequest,
              'get',
              undefined,
              'data',
              state.token,
            ),
          ]
        : [
            generalRequest(
              routes.getAllAdvisors,
              'get',
              undefined,
              'data',
              undefined,
            ),
          ],
    ).then(res => {
      dispatch({loading: false});

      if (res[0] === null) {
        props.navigate('/');
        return;
      }

      if (state.token !== undefined && state.token !== null) {
        if (res[1] == null || res[2] == null) {
          props.navigate('/');
          return;
        }

        setMyAdvisor(res[1].id !== undefined ? res[1] : undefined);

        setOpenRequests(res[2]);
      }

      setData(res[0]);
    });
  }, [dispatch, state.token, props]);

  useEffectOnce(() => {
    fetchData();
  });

  const setOffCodeResult = (amount, type, code) => {
    setUserOff({type: type, amount: amount, code: code});

    let openReq = openRequests.find(e => e.advisorId === selectedAdvisor);
    let offAmount = type === 'percent' ? openReq.price * amount : amount;
    openReq.shouldPay = Math.max(
      0,
      openReq.price - offAmount - state.user.user.money,
    );
  };

  return (
    <>
      {showOffCodePane && (
        <OffCode
          token={state.token}
          for={'counseling'}
          setLoading={new_status => dispatch({loading: new_status})}
          setResult={setOffCodeResult}
          toggleShowPopUp={() => setShowOffCodePane(false)}
        />
      )}
      {refId !== undefined && (
        <form
          ref={ref}
          action="https://bpm.shaparak.ir/pgwchannel/startpay.mellat"
          method="post">
          <input type={'hidden'} value={refId} name="RefId" />
        </form>
      )}
      {advisorPlans !== undefined && (
        <LargePopUp
          title={'پلن های موجود'}
          toggleShowPopUp={() => setAdvisorPlans(undefined)}>
          {advisorPlans.plans.map((elem, index) => {
            return (
              <FinancePlan
                onSelect={async () => {
                  dispatch({loading: true});
                  let res = await generalRequest(
                    routes.sendAdvisorAcceptanceRequest +
                      advisorPlans.advisorId +
                      '/' +
                      elem.id,
                    'post',
                    undefined,
                    'data',
                    state.token,
                  );
                  dispatch({loading: false});
                  if (res !== null) {
                    addItem(openRequests, setOpenRequests, res);

                    showSuccess(
                      'درخواست شما با موفقیت ثبت گردید و پس از بررسی مشاور نتیجه به اطلاع شما خواهد رسید',
                    );
                    setAdvisorPlans(undefined);
                  }
                }}
                key={index}
                plan={elem}
              />
            );
          })}
        </LargePopUp>
      )}
      <PhoneView
        style={{...styles.gap60, ...styles.margin30, ...styles.marginRight60}}>
        {data !== undefined &&
          data.map((elem, index) => {
            let openReq = openRequests.find(e => e.advisorId === elem.id);
            let shouldPay =
              openReq !== undefined && openReq.shouldPay !== undefined
                ? openReq.shouldPay
                : undefined;

            if (shouldPay !== undefined) {
              return (
                <Card
                  isMyAdvisor={
                    myAdvisor !== undefined ? elem.id === myAdvisor.id : false
                  }
                  hasOpenRequest={true}
                  shouldPay={shouldPay}
                  price={openReq.price}
                  key={index}
                  data={elem}
                  onOffClick={() => {
                    setSelectedAdvisor(elem.id);
                    setShowOffCodePane(true);
                  }}
                  onPay={() => {
                    goToPayLocal(elem.id);
                  }}
                  onCancel={async () => {
                    dispatch({loading: true});
                    let res = await generalRequest(
                      routes.cancelAdvisorRequest + openReq.id,
                      'delete',
                      undefined,
                      undefined,
                      state.token,
                    );
                    dispatch({loading: false});
                    if (res !== null) {
                      showSuccess();
                      let tmp = data.map(e => {
                        if (e.id === elem.id) {
                          e.answer = 'cancel';
                          return e;
                        }
                        return e;
                      });
                      removeItems(openRequests, setOpenRequests, [openReq.id]);
                      setData(tmp);
                    }
                  }}
                />
              );
            }

            if (openReq !== undefined) {
              return (
                <Card
                  isMyAdvisor={
                    myAdvisor !== undefined ? elem.id === myAdvisor.id : false
                  }
                  onCancel={async () => {
                    dispatch({loading: true});
                    let res = await generalRequest(
                      routes.cancelAdvisorRequest + openReq.id,
                      'delete',
                      undefined,
                      undefined,
                      state.token,
                    );
                    dispatch({loading: false});
                    if (res !== null) {
                      showSuccess();
                      let tmp = data.map(e => {
                        if (e.id === elem.id) {
                          e.answer = 'cancel';
                          return e;
                        }
                        return e;
                      });
                      removeItems(openRequests, setOpenRequests, [openReq.id]);
                      setData(tmp);
                    }
                  }}
                  hasOpenRequest={true}
                  key={index}
                  data={elem}
                />
              );
            }

            return (
              <Card
                isMyAdvisor={
                  myAdvisor !== undefined ? elem.id === myAdvisor.id : false
                }
                hasOpenRequest={openReq}
                key={index}
                data={elem}
                onSelect={async () => {
                  let plans = fetchedPlans.find(e => e.advisorId === elem.id);
                  if (plans === undefined) {
                    dispatch({loading: true});
                    let res = await generalRequest(
                      routes.getMyFinancePlans + elem.id,
                      'get',
                      undefined,
                      'data',
                      state.token,
                    );

                    dispatch({loading: false});
                    if (res == null) return;
                    let tmp = [];
                    fetchedPlans.forEach(e => {
                      tmp.push(e);
                    });

                    plans = {
                      advisorId: elem.id,
                      plans: res,
                    };
                    tmp.push(plans);
                    setFetchedPlans(tmp);
                  }

                  setAdvisorPlans(plans);
                }}
              />
            );
          })}
      </PhoneView>
    </>
  );
}

export default Advisors;
