import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {useEffectOnce} from 'usehooks-ts';
import React, {useState} from 'react';
import {generalRequest} from '../../../API/Utility';
import {routes} from '../../../API/APIRoutes';
import {useParams} from 'react-router';
import Card from '../../panel/quiz/components/Card/Card';
import {styles} from '../../../styles/Common/Styles';
import commonTranslator from '../../../translator/Common';
import {getDevice, showError} from '../../../services/Utility';
import OffCode from './components/OffCode';
import SuccessTransaction from '../../../components/web/SuccessTransaction/SuccessTransaction';
import BuyBasket from './components/BuyBasket';
import Basket from '../../../components/web/Basket';
import JustBottomBorderTextInput from '../../../styles/Common/JustBottomBorderTextInput';
import {FontIcon} from '../../../styles/Common/FontIcon';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';

function BuyOnlineStanding(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [quiz, setQuiz] = useState();
  const [off, setOff] = useState(0);
  const [shouldPay, setShouldPay] = useState(0);
  const [desc, setDesc] = useState();
  const [amIOwner, setAmIOwner] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const userMoney = state.user === null ? 0 : state.user.user.money;
  const [showOffCodePane, setShowOffCodePane] = useState(false);

  const [usedFromWallet, setUsedFromWallet] = useState(0);
  const [showSuccessTransaction, setShowSuccessTransaction] = useState(false);
  const [accountOff, setAccountOff] = useState();
  const isInPhone = getDevice().indexOf('WebPort') !== -1;

  const calc = React.useCallback(() => {
    let off = 0;
    let totalPrice = quiz.price;

    let allOffs = [];

    let shouldPayTmp = totalPrice;

    if (shouldPayTmp > 0 && accountOff !== undefined) {
      if (accountOff.type === 'percent') {
        off += (shouldPayTmp * accountOff.amount) / 100.0;
        allOffs.push(accountOff.amount + ' درصد بابت کد تخفیف');
      } else {
        off += accountOff.amount;
        allOffs.push(accountOff.amount + ' تومان بابت کد تخفیف');
      }
    }

    shouldPayTmp = totalPrice - off;

    if (shouldPayTmp > 0) {
      setUsedFromWallet(Math.min(userMoney, shouldPayTmp));
      shouldPayTmp -= userMoney;
    } else setUsedFromWallet(0);

    setOff(Math.min(off, totalPrice));
    setShouldPay(shouldPayTmp > 0 ? shouldPayTmp : 10);
  }, [accountOff, quiz?.price, userMoney]);

  const params = useParams();

  React.useEffect(() => {
    if (quiz == undefined || quiz.price === undefined) return;

    calc();
  }, [quiz, accountOff, calc]);

  const toggleShowOffCodePane = () => {
    if (
      !showOffCodePane &&
      (state.token === null || state.token === undefined || state.token === '')
    ) {
      showError(commonTranslator.shouldLogin);
      return;
    }
    setShowOffCodePane(!showOffCodePane);
  };

  const setOffCodeResult = (amount, type, code) => {
    setAccountOff({type: type, amount: amount, code: code});
  };

  const fetchData = React.useCallback(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.fetchAllPackages + '?quizId=' + params.quizId,
        'get',
        undefined,
        'data',
        state.token == null ? undefined : state.token,
      ),
    ]).then(res => {
      dispatch({loading: false});

      if (res[0] === null) {
        props.navigate('/');
        return;
      }

      if (res[0].items === undefined) {
        setDesc(res[0].description);
        let tmp = res[0];
        tmp.description = undefined;
        let myTeam = tmp.teams.find(e => {
          console.log(e.team);
          return (
            e.id === state.user.user.id ||
            e.team.find(ee => {
              return ee.id === state.user.user.id;
            })
          );
        });
        setQuiz(tmp);
        setTeamName(myTeam.teamName);
        setMembers(
          myTeam.team.map(e => {
            return {
              NID: e.student.NID,
              phone: e.student.phone,
            };
          }),
        );
        setAmIOwner(tmp.canChange && state.user.user.id === myTeam.student.id);
        setCanChange(false);
        setEditMode(true);
      } else {
        setDesc(res[0].items[0].description);
        let tmp = res[0].items[0];
        tmp.description = undefined;
        setQuiz(tmp);
        setAccountOff(res[0].off);
      }
    });
  }, [dispatch, params, props, state.token, state.user]);

  useEffectOnce(() => {
    fetchData();
  });

  const [canChange, setCanChange] = useState(false);
  const [teamName, setTeamName] = useState();
  const [members, setMembers] = useState([]);
  const [createNewMember, setcreateNewMember] = useState(false);
  const [NID, setNID] = useState();
  const [phone, setPhone] = useState();

  const addMember = () => {
    if (
      phone === undefined ||
      NID.length === undefined ||
      phone.length === 0 ||
      NID.length === 0
    ) {
      showError(commonTranslator.pleaseFillAllFields);
      return;
    }

    if (NID.length !== 10 || phone.length !== 11) {
      showError('کدملی و یا شماره همراه وارد شده معتبر نمی باشد');
      return;
    }

    if (state.user.user.NID === NID) {
      showError('کدملی وارد شده مربوط به خودتان است و امکان وارد کردن آن نیست');
      return;
    }

    let tmp = [];
    let isValid = true;

    members.forEach(e => {
      if (e.NID === NID || e.phone === phone) {
        isValid = false;
        return;
      }
      tmp.push(e);
    });

    if (!isValid) {
      showError('کدملی و یا شماره همراه وارد شده تکراری است');
      return;
    }

    tmp.unshift({phone: phone, NID: NID});
    setMembers(tmp);
    setcreateNewMember(false);
    setPhone();
    setNID();
  };

  const removeMember = NID => {
    setMembers(
      members.filter(e => {
        return e.NID !== NID;
      }),
    );
  };

  return (
    <>
      {showOffCodePane && (
        <OffCode
          token={state.token}
          for={'gach_exam'}
          setLoading={status => {
            dispatch({loading: status});
          }}
          setResult={setOffCodeResult}
          toggleShowPopUp={toggleShowOffCodePane}
        />
      )}

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
                onPress={() => props.navigate('/myIRYSCQuizzes')}
                style={{
                  ...styles.BlueBold,
                  ...styles.FontWeight600,
                  ...styles.fontSize13,
                  ...styles.marginLeft5,
                  ...styles.cursor_pointer,
                }}
                text={commonTranslator.myGeneralQuizes}
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

      {!showSuccessTransaction && (
        <>
          <CommonWebBox style={{marginBottom: isInPhone ? 200 : 100}}>
            {quiz !== undefined && (
              <PhoneView>
                <Card quiz={quiz} />
                <SimpleText
                  text={desc}
                  style={{...styles.padding30, ...styles.fontSize17}}
                />
              </PhoneView>
            )}
            <PhoneView style={{...styles.gap15}}>
              {quiz !== undefined &&
                quiz.teams !== undefined &&
                quiz.teams.length > 0 &&
                quiz.teams.map((e, index) => {
                  return (
                    <MyView key={index}>
                      <SimpleText text={'گروه ' + e.teamName} />
                      <SimpleText text={'عضو ارشد: ' + e.student.name} />

                      {e.team !== undefined && e.team.length > 0 && (
                        <>
                          <SimpleText text={'سایر اعضای گروه'} />
                          {e.team.map((e2, index2) => {
                            return (
                              <SimpleText key={index2} text={e2.student.name} />
                            );
                          })}
                        </>
                      )}
                    </MyView>
                  );
                })}
            </PhoneView>
            {quiz !== undefined && editMode && !amIOwner && canChange && (
              <CommonButton title={'انصراف از گروه'} />
            )}
            {quiz !== undefined && (!editMode || amIOwner) && (
              <>
                <PhoneView style={{...styles.gap100}}>
                  <JustBottomBorderTextInput
                    placeholder={'نام تیم شما'}
                    subText={'نام تیم شما'}
                    value={teamName}
                    onChangeText={e => setTeamName(e)}
                  />

                  {quiz.perTeam > 1 && (
                    <MyView
                      style={{
                        width: isInPhone ? '100%' : 350,
                        justifyContent: 'center',
                      }}>
                      <EqualTwoTextInputs>
                        <SimpleText text={'اعضای تیم شما'} />
                        {!createNewMember &&
                          members.length + 1 < quiz.perTeam && (
                            <FontIcon
                              kind={'normal'}
                              theme={'rect'}
                              back={'yellow'}
                              icon={faPlus}
                              onPress={() => setcreateNewMember(true)}
                            />
                          )}
                      </EqualTwoTextInputs>

                      {createNewMember && (
                        <>
                          <JustBottomBorderTextInput
                            placeholder={'کد ملی عضو موردنظر'}
                            subText={'کد ملی عضو موردنظر'}
                            value={NID}
                            onChangeText={e => setNID(e)}
                            justNum={true}
                          />
                          <JustBottomBorderTextInput
                            placeholder={'شماره همراه عضو موردنظر'}
                            subText={'شماره همراه عضو موردنظر'}
                            value={phone}
                            onChangeText={e => setPhone(e)}
                            justNum={true}
                          />
                          <EqualTwoTextInputs>
                            <PhoneView></PhoneView>
                            <PhoneView
                              style={{...styles.gap10, ...styles.marginTop10}}>
                              <FontIcon
                                kind={'normal'}
                                theme={'rect'}
                                back={'orange'}
                                icon={faMinus}
                                onPress={() => setcreateNewMember(false)}
                              />
                              <FontIcon
                                kind={'normal'}
                                theme={'rect'}
                                back={'yellow'}
                                icon={faPlus}
                                onPress={() => addMember()}
                              />
                            </PhoneView>
                          </EqualTwoTextInputs>
                        </>
                      )}

                      {members != undefined &&
                        members.map((e, index) => {
                          return (
                            <EqualTwoTextInputs
                              key={index}
                              style={{
                                ...styles.marginTop10,
                                ...styles.alignItemsCenter,
                              }}>
                              <SimpleText text={'کدملی: ' + e.NID} />
                              <PhoneView
                                style={{
                                  ...styles.gap10,
                                  ...styles.alignItemsCenter,
                                }}>
                                <SimpleText text={'شماره همراه: ' + e.phone} />
                                <FontIcon
                                  kind={'normal'}
                                  theme={'rect'}
                                  back={'orange'}
                                  icon={faMinus}
                                  onPress={() => removeMember(e.NID)}
                                />
                              </PhoneView>
                            </EqualTwoTextInputs>
                          );
                        })}
                    </MyView>
                  )}
                </PhoneView>
              </>
            )}
          </CommonWebBox>
          {quiz !== undefined && quiz.price !== undefined && (
            <Basket
              disable={teamName === undefined || teamName.length < 3}
              disableText={'برای خرید نام تیم خود را وارد نمایید'}
              fullWidth={isInPhone}>
              <BuyBasket
                disable={teamName === undefined || teamName.length < 3}
                data={{teamName: teamName, members: members}}
                price={quiz.price}
                shouldPay={shouldPay}
                wantedQuizzes={[quiz.id]}
                off={off}
                payUrl={routes.buyOnlineQuiz + quiz.id}
                userOff={accountOff}
                setLoading={status => dispatch({loading: status})}
                token={state.token}
                user={state.user}
                usedFromWallet={usedFromWallet}
                toggleShowOffCodePane={toggleShowOffCodePane}
                setShowSuccessTransaction={setShowSuccessTransaction}
              />
            </Basket>
          )}
        </>
      )}
    </>
  );
}

export default BuyOnlineStanding;
