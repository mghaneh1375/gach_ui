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
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import Card from './Card';
import {fetchUser, setCacheItem} from '../../../API/User';
import OffCode from '../buy/components/OffCode';
import SuccessTransaction from '../../../components/web/SuccessTransaction/SuccessTransaction';
import commonTranslator from '../../../translator/Common';
import {faChevronDown, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import Filter from './Filter';
import Schedule from './Schedule';

function Teachers(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [data, setData] = useState();
  const [teacherSchedules, setTeacherSchedules] = useState();

  const [refId, setRefId] = useState();

  React.useEffect(() => {
    if (refId === undefined) return;
    ref.current.submit();
  }, [refId]);

  const ref = React.useRef();

  const goToPay = async (token, data, teacherId) => {
    return await generalRequest(
      routes.payTeacherPrice + teacherId,
      'post',
      data,
      ['action', 'refId'],
      token,
    );
  };

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
  const [userMoney, setUserMoney] = useState(state.user.user.money);

  const goToPayLocal = async teacherId => {
    let data = {};

    if (userOff !== undefined && userOff.code !== undefined)
      data.off = userOff.code;

    dispatch({loading: true});

    let res = await goToPay(state.token, data, teacherId);

    dispatch({loading: false});

    if (res !== null) {
      if (res.action === 'success') {
        await setCacheItem('user', undefined);
        await fetchUser(state.token, user => {});
        setShowSuccessTransaction(true);
      } else if (res.action === 'pay') {
        setRefId(res.refId);
      }
    }
  };

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
      let tmpArr = [];
      res[3].forEach(element => {
        element.lessons?.forEach(itr => {
          tmpArr.push({
            id: itr.id,
            item: itr.name,
          });
        });
      });
      setLessons(tmpArr);

      setBranches(
        res[2].map(e => {
          return {
            id: e.id,
            item: e.name,
          };
        }),
      );
      setGrades(
        res[3].map(e => {
          return {
            id: e.id,
            item: e.name,
          };
        }),
      );
      setData(res[0].data);
      setSelectableItems(res[0].data);
    });
  }, [dispatch, state.token, props]);

  useEffectOnce(() => {
    fetchData();
  });

  const setOffCodeResult = (amount, type, code) => {
    // setUserOff({type: type, amount: amount, code: code});
    // let openReq = openRequests.find(e => e.teacherId === selectedTeacher);
    // let offAmountTmp =
    //   type === 'percent' ? (openReq.price * amount) / 100 : amount;
    // setOffAmount(offAmountTmp);
    // openReq.shouldPay = Math.max(0, openReq.price - offAmountTmp - userMoney);
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

      {!showSuccessTransaction && (
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
              {showFilter && maxAge !== undefined && minAge !== undefined && (
                <Filter
                  minAge={minAge}
                  maxAge={maxAge}
                  grades={grades}
                  branches={branches}
                  lessons={lessons}
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
          }

          <PhoneView
            style={{
              ...styles.gap15,
              ...styles.margin15,
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

          {teacherSchedules !== undefined && (
            <MyView
              style={{
                ...styles.gap15,
                ...styles.margin15,
              }}>
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
                        dispatch({loading: true});
                        let res = await generalRequest(
                          routes.sendTeacherAcceptanceRequest +
                            teacherSchedules.teacherId +
                            '/' +
                            elem.id,
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
