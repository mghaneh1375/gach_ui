import {
  faArrowLeft,
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useMemo, useState} from 'react';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import {dispatchStateContext, globalStateContext} from '../../../App';
import Basket from '../../../components/web/Basket';
import SuccessTransaction from '../../../components/web/SuccessTransaction/SuccessTransaction';
import {getDevice, showSuccess} from '../../../services/Utility';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {FontIcon} from '../../../styles/Common/FontIcon';
import {styles} from '../../../styles/Common/Styles';
import commonTranslator from '../../../translator/Common';
import OffCode from '../buy/components/OffCode';
import BuySchedule from './BuySchedule';
import Card from './Card';
import Filter from './Filter';
import Schedule from './Schedule';
import Comment from '../../../components/web/Comment/Comment';

function Teachers(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [data, setData] = useState();
  const [teacherSchedules, setTeacherSchedules] = useState();
  const [selectedTeachSchedule, setSelectedTeachSchedule] = useState();

  const [showSuccessTransaction, setShowSuccessTransaction] = useState(false);
  const [showOffCodePane, setShowOffCodePane] = useState();
  const [selectedTeacher, setSelectedTeacher] = useState();
  const [userOff, setUserOff] = useState();

  const [minAge, setMinAge] = useState(23);
  const [maxAge, setMaxAge] = useState(49);
  const [tags, setTags] = useState();
  const [grades, setGrades] = useState();
  const [branches, setBranches] = useState();
  const [lessons, setLessons] = useState();

  const [offAmount, setOffAmount] = useState(0);
  const userMoney = useMemo(
    () => state.user.user.money,
    [state.user.user.money],
  );
  const [usedFromWallet, setUsedFromWallet] = useState();

  const fetchData = React.useCallback(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.getAllTeachers,
        'get',
        undefined,
        'data',
        state.token === undefined ? null : state.token,
      ),
      generalRequest(routes.getDistinctTeacherTags, 'get', undefined, 'data'),
      generalRequest(routes.fetchGrades, 'get', undefined, 'data'),
      generalRequest(routes.fetchBranches, 'get', undefined, 'data'),
    ]).then(res => {
      dispatch({loading: false});

      if (res[0] == null || res[1] == null) {
        props.navigate('/');
        return;
      }

      let tmp = res[1].map(elem => {
        return {id: elem, item: elem};
      });
      tmp.push({id: 'all', item: 'همه'});

      setTags(tmp);

      setMinAge(res[0].filters.minAge);
      setMaxAge(res[0].filters.maxAge);
      let tmpArr = [{id: 'all', item: 'همه'}];
      res[3].forEach(element => {
        element.lessons?.forEach(itr => {
          tmpArr.push({
            id: itr.id,
            item: itr.name,
          });
        });
      });
      setLessons(tmpArr);

      setBranches([
        {id: 'all', item: 'همه'},
        ...res[2].map(e => {
          return {
            id: e.id,
            item: e.name,
          };
        }),
      ]);
      setGrades([
        {id: 'all', item: 'همه'},
        ...res[3].map(e => {
          return {
            id: e.id,
            item: e.name,
          };
        }),
      ]);
      setData(res[0].data);
      setSelectableItems(res[0].data);
    });
  }, [dispatch, state.token, props]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setOffCodeResult = (amount, type, code) => {
    setUserOff({type: type, amount: amount, code: code});
    let offAmountTmp =
      type === 'percent'
        ? (selectedTeachSchedule.price * amount) / 100
        : amount;

    setOffAmount(Math.min(offAmountTmp, selectedTeachSchedule.price));
    let shouldPayTmp = selectedTeachSchedule.price - offAmountTmp;

    if (shouldPayTmp > 0) {
      setUsedFromWallet(Math.min(userMoney, shouldPayTmp));
      shouldPayTmp -= userMoney;
    } else setUsedFromWallet(0);

    selectedTeachSchedule.shouldPay = Math.max(0, shouldPayTmp);
  };

  const [selectableItems, setSelectableItems] = useState();
  const [clearFilter, setClearFilter] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [selectedTeacherForComment, setSelectedTeacherForComment] = useState();

  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;

  useEffect(() => {
    if (clearFilter) setShowFilter(false);
  }, [clearFilter]);

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

      {selectedTeachSchedule?.shouldPay !== undefined && (
        <Basket
          backBtnTitle="انصراف"
          onBackClick={() => setSelectedTeachSchedule(undefined)}>
          <BuySchedule
            id={selectedTeachSchedule.id}
            price={
              selectedTeachSchedule.canUseOff
                ? selectedTeachSchedule.price
                : selectedTeachSchedule.prePayAmount
            }
            shouldPay={selectedTeachSchedule.shouldPay}
            canUseOff={selectedTeachSchedule.canUseOff}
            off={offAmount}
            userOff={userOff}
            setLoading={new_status => dispatch({status: new_status})}
            token={state.token}
            user={state.user}
            usedFromWallet={usedFromWallet}
            toggleShowOffCodePane={() => setShowOffCodePane(!showOffCodePane)}
            setShowSuccessTransaction={setShowSuccessTransaction}
          />
        </Basket>
      )}

      {!showSuccessTransaction && (
        <>
          {teacherSchedules === undefined && !showComments && (
            <>
              {
                <CommonWebBox>
                  <EqualTwoTextInputs>
                    <PhoneView
                      style={{
                        ...styles.alignSelfCenter,
                        ...styles.gap10,
                        ...styles.alignItemsCenter,
                      }}>
                      <SimpleText
                        style={{...styles.BlueBold, ...styles.fontSize17}}
                        text={'لیست دبیران'}
                      />
                      {selectableItems !== undefined && (
                        <SimpleText
                          style={{
                            ...styles.fontSize13,
                            ...styles.dark_blue_color,
                          }}
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
                    <PhoneView
                      style={{...styles.alignSelfCenter, ...styles.gap10}}>
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
                        icon={showFilter ? faChevronDown : faChevronRight}
                        onPress={() => {
                          setShowFilter(!showFilter);
                        }}
                        title={
                          showFilter
                            ? commonTranslator.lessFilters
                            : commonTranslator.showFilters
                        }
                      />
                    </PhoneView>
                  </EqualTwoTextInputs>
                  {showFilter &&
                    maxAge !== undefined &&
                    minAge !== undefined && (
                      <Filter
                        minAge={minAge}
                        maxAge={maxAge}
                        grades={grades}
                        branches={branches}
                        lessons={lessons}
                        tags={tags}
                        token={props.token}
                        setLoading={new_status =>
                          dispatch({loading: new_status})
                        }
                        setClearFilter={setClearFilter}
                        clearFilter={clearFilter}
                        close={() => setShowFilter(false)}
                        setSelectableItems={items => setSelectableItems(items)}
                      />
                    )}
                </CommonWebBox>
              }

              <PhoneView
                style={{
                  ...styles.gap15,
                  ...{margin: isInPhone ? 4 : 15},
                }}>
                {selectableItems !== undefined &&
                  selectableItems.map((elem, index) => {
                    if (
                      selectedTeacher !== undefined &&
                      elem.id !== selectedTeacher
                    )
                      return;

                    return (
                      <Card
                        navigate={props.navigate}
                        key={index}
                        data={elem}
                        selected={elem.id === selectedTeacher}
                        seeComments={() => {
                          setSelectedTeacherForComment(elem.id);
                          setShowComments(true);
                        }}
                        onSelect={async () => {
                          dispatch({loading: true});
                          const res = await generalRequest(
                            routes.getTeacherSchedules + elem.id,
                            'get',
                            undefined,
                            'data',
                            state.token,
                          );
                          dispatch({loading: false});
                          setTeacherSchedules(res);
                        }}
                        onBackClick={() => {
                          setTeacherSchedules(undefined);
                          setSelectedTeacher(undefined);
                        }}
                      />
                    );
                  })}
              </PhoneView>
            </>
          )}

          {showComments && (
            <Comment
              onBackClick={() => setShowComments(false)}
              defaultIsOpen={true}
              canWriteComment={false}
              refId={selectedTeacherForComment}
              section="teach"
              token={state.token}
              setLoading={status => dispatch({loading: status})}
            />
          )}

          {teacherSchedules !== undefined && (
            <MyView
              style={{
                ...styles.gap15,
                ...styles.margin15,
              }}>
              <PhoneView
                style={{flexDirection: 'row-reverse', padding: '10px'}}>
                <FontIcon
                  onPress={() => setTeacherSchedules(undefined)}
                  theme="rect"
                  kind="normal"
                  icon={faArrowLeft}
                />
              </PhoneView>
              <PhoneView
                style={
                  state.isInPhone
                    ? {...styles.justifyContentCenter}
                    : {...styles.gap15}
                }>
                {teacherSchedules.map((elem, index) => {
                  return (
                    <Schedule
                      onSelect={async () => {
                        if (elem.teachMode === 'semi_private') {
                          if (elem.shouldPrePay) {
                            elem.canUseOff = false;
                            elem.shouldPay = Math.max(
                              0,
                              elem.prePayAmount - userMoney,
                            );
                            setUsedFromWallet(
                              Math.min(userMoney, elem.prePayAmount),
                            );
                          } else {
                            elem.canUseOff = true;
                            elem.shouldPay = Math.max(
                              0,
                              elem.price - userMoney,
                            );
                            setUsedFromWallet(Math.min(userMoney, elem.price));
                          }

                          setSelectedTeachSchedule(elem);
                          return;
                        }
                        if (!elem.needRegistryConfirmation) {
                          elem.canUseOff = true;
                          elem.shouldPay = Math.max(0, elem.price - userMoney);
                          setUsedFromWallet(Math.min(userMoney, elem.price));
                          setSelectedTeachSchedule(elem);
                          return;
                        }

                        dispatch({loading: true});
                        let res = await generalRequest(
                          routes.sendTeachRequest + elem.id,
                          'post',
                          undefined,
                          'data',
                          state.token,
                        );
                        dispatch({loading: false});
                        if (res !== null) {
                          showSuccess(
                            'درخواست شما با موفقیت ثبت گردید و پس از بررسی دبیر نتیجه به اطلاع شما خواهد رسید',
                          );

                          setTeacherSchedules(undefined);
                          setSelectedTeacher(undefined);
                        }
                      }}
                      isInPhone={state.isInPhone}
                      key={index}
                      plan={elem}
                    />
                  );
                })}
              </PhoneView>
            </MyView>
          )}
        </>
      )}
    </>
  );
}

export default Teachers;
