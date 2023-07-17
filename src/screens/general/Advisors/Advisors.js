import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {
  addItem,
  getDevice,
  removeItems,
  showSuccess,
} from '../../../services/Utility';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {LargePopUp} from '../../../styles/Common/PopUp';
import {styles} from '../../../styles/Common/Styles';
import Card from './Card';
import FinancePlan from './FinancePlan';
import {setCacheItem} from '../../../API/User';
import OffCode from '../buy/components/OffCode';
import SuccessTransaction from '../../../components/web/SuccessTransaction/SuccessTransaction';
import commonTranslator from '../../../translator/Common';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import Filter from './Filter';

function Advisors(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [data, setData] = useState();
  const [myAdvisors, setMyAdvisors] = useState();
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

  const [min, setMin] = useState(10000);
  const [max, setMax] = useState(2000000);

  const [minAge, setMinAge] = useState(23);
  const [maxAge, setMaxAge] = useState(49);
  const [tags, setTags] = useState();

  const goToPayLocal = async advisorId => {
    let data = {};

    if (userOff !== undefined && userOff.code !== undefined)
      data.off = userOff.code;

    dispatch({loading: true});

    let res = await goToPay(state.token, data, advisorId);

    dispatch({loading: false});

    if (res !== null) {
      if (res.action === 'success') {
        let user = state.user;
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
              routes.getMyAdvisors,
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
            generalRequest(
              routes.getDistinctAdvisorsTags,
              'get',
              undefined,
              'data',
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
            generalRequest(
              routes.getDistinctAdvisorsTags,
              'get',
              undefined,
              'data',
            ),
          ],
    ).then(res => {
      dispatch({loading: false});

      if (state.token !== undefined && state.token !== null) {
        if (res[1] == null || res[2] == null || res[3] == null) {
          props.navigate('/');
          return;
        }

        setMyAdvisors(res[1].length > 0 ? res[1] : undefined);
        let tmp = res[3].map(elem => {
          return {id: elem, item: elem};
        });
        tmp.push({id: 'all', item: 'همه'});

        setTags(tmp);

        setOpenRequests(res[2]);
      } else {
        if (res[0] === null || res[1] == null) {
          props.navigate('/');
          return;
        }
        let tmp = res[1].map(elem => {
          return {id: elem, item: elem};
        });
        tmp.push({id: 'all', item: 'همه'});

        setTags(tmp);
      }

      setMax(res[0].filters.maxPrice);
      setMin(res[0].filters.minPrice);
      setMinAge(res[0].filters.minAge);
      setMaxAge(res[0].filters.maxAge);

      setData(res[0].data);
      setSelectableItems(res[0].data);
    });
  }, [dispatch, state.token, props]);

  useEffectOnce(() => {
    fetchData();
  });

  const [offAmount, setOffAmount] = useState(0);

  const setOffCodeResult = (amount, type, code) => {
    setUserOff({type: type, amount: amount, code: code});

    let openReq = openRequests.find(e => e.advisorId === selectedAdvisor);
    let offAmountTmp =
      type === 'percent' ? (openReq.price * amount) / 100 : amount;
    setOffAmount(offAmountTmp);
    openReq.shouldPay = Math.max(
      0,
      openReq.price - offAmountTmp - state.user.user.money,
    );
  };

  const [selectableItems, setSelectableItems] = useState();
  const [clearFilter, setClearFilter] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;

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
                onPress={() => props.navigate('/myAdvisor')}
                style={{
                  ...styles.BlueBold,
                  ...styles.FontWeight600,
                  ...styles.fontSize13,
                  ...styles.marginLeft5,
                  ...styles.cursor_pointer,
                }}
                text={commonTranslator.myAdvisor}
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
          <PhoneView style={{...styles.gap15}}>
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
          </PhoneView>
        </LargePopUp>
      )}
      {!showSuccessTransaction && (
        <>
          {!isInPhone && (
            <CommonWebBox>
              <EqualTwoTextInputs>
                <PhoneView style={{...styles.alignSelfCenter, ...styles.gap10}}>
                  {state.allItems !== undefined && (
                    <SimpleText
                      style={{...styles.fontSize13, ...styles.dark_blue_color}}
                      text={
                        'نمایش ' +
                        selectableItems.length +
                        ' مورد از ' +
                        data.length +
                        ' مورد '
                      }
                    />
                  )}
                </PhoneView>
                <PhoneView style={{...styles.alignSelfCenter, ...styles.gap10}}>
                  <SimpleText
                    style={{
                      ...styles.alignSelfCenter,
                      ...styles.gap10,
                      ...styles.cursor_pointer,
                      ...styles.colorOrangeRed,
                    }}
                    onPress={() => setClearFilter(true)}
                    text={commonTranslator.clearFilters}
                  />
                  <CommonButton
                    iconDir={'left'}
                    textStyle={{...styles.fontSize17, ...styles.bold}}
                    icon={faChevronRight}
                    onPress={() => {
                      setShowFilter(!showFilter);
                    }}
                    title={commonTranslator.showFilters}
                  />
                </PhoneView>
              </EqualTwoTextInputs>
              {showFilter &&
                min !== undefined &&
                max !== undefined &&
                maxAge !== undefined &&
                minAge !== undefined && (
                  <Filter
                    min={min}
                    max={max}
                    minAge={minAge}
                    maxAge={maxAge}
                    tags={tags}
                    token={props.token}
                    setLoading={new_status => dispatch({loading: new_status})}
                    setClearFilter={setClearFilter}
                    clearFilter={clearFilter}
                    close={() => setShowFilter(false)}
                    setSelectableItems={items => setSelectableItems(items)}
                  />
                )}
            </CommonWebBox>
          )}

          <PhoneView
            style={{
              ...styles.gap60,
              ...styles.margin30,
              ...styles.marginRight60,
            }}>
            {selectableItems !== undefined &&
              selectableItems.map((elem, index) => {
                let openReq = openRequests.find(e => e.advisorId === elem.id);
                let shouldPay =
                  openReq !== undefined && openReq.shouldPay !== undefined
                    ? openReq.shouldPay
                    : undefined;

                let isMyAdvisor =
                  myAdvisors !== undefined
                    ? myAdvisors.find(eeee => eeee.id === elem.id) !== undefined
                    : false;

                if (shouldPay !== undefined) {
                  return (
                    <Card
                      isMyAdvisor={isMyAdvisor}
                      hasOpenRequest={true}
                      shouldPay={shouldPay}
                      userMoney={Math.min(
                        state.user.user.money,
                        Math.max(0, openReq.price - offAmount),
                      )}
                      offAmount={
                        offAmount > 0
                          ? Math.min(offAmount, openReq.price)
                          : undefined
                      }
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
                          removeItems(openRequests, setOpenRequests, [
                            openReq.id,
                          ]);
                          setData(tmp);
                        }
                      }}
                    />
                  );
                }

                if (openReq !== undefined) {
                  return (
                    <Card
                      isMyAdvisor={isMyAdvisor}
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
                          removeItems(openRequests, setOpenRequests, [
                            openReq.id,
                          ]);
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
                    isMyAdvisor={isMyAdvisor}
                    hasOpenRequest={openReq}
                    key={index}
                    data={elem}
                    onSelect={async () => {
                      let plans = fetchedPlans.find(
                        e => e.advisorId === elem.id,
                      );
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
      )}
    </>
  );
}

export default Advisors;
