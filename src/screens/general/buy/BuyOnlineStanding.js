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
import {
  faNums,
  getDevice,
  showError,
  showSuccess,
} from '../../../services/Utility';
import OffCode from './components/OffCode';
import SuccessTransaction from '../../../components/web/SuccessTransaction/SuccessTransaction';
import BuyBasket from './components/BuyBasket';
import Basket from '../../../components/web/Basket';
import JustBottomBorderTextInput from '../../../styles/Common/JustBottomBorderTextInput';
import {FontIcon, SimpleFontIcon} from '../../../styles/Common/FontIcon';
import {
  faCancel,
  faCheck,
  faMinus,
  faPlus,
  faRemove,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import {changeMode} from '../../panel/ticket/components/Show/Utility';
import OnlineStanding from '../OnlineStanding/OnlineStanding';
import Team from '../OnlineStanding/Team';
import QuizItemCard from '../../../components/web/QuizItemCard';

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
        setCanChange(tmp.canChange);
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

    tmp.push({phone: phone, NID: NID});
    setMembers(tmp);
    setPhone('');
    setNID('');
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
        <MyView style={{marginBottom: isInPhone ? 200 : 100}}>
          <OnlineStanding
            height={325}
            onBackClick={() => navigate('/buy')}
            quiz={quiz}
            desc={desc}
          />

          {quiz !== undefined &&
            (!editMode || amIOwner) &&
            members.length + 1 < quiz.perTeam && (
              <CommonWebBox>
                <PhoneView style={{...styles.gap15}}>
                  <SimpleText
                    style={{
                      ...styles.BlueBold,
                      ...styles.fontSize20,
                      ...styles.alignSelfCenter,
                    }}
                    text={'تیم شما'}
                  />
                  <SimpleText
                    style={{
                      ...styles.fontSize13,
                      ...styles.alignSelfCenter,
                      ...styles.marginRight25,
                    }}
                    text={'افزودن عضو جدید'}
                  />
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
                  <PhoneView
                    style={{...styles.alignItemsCenter, ...styles.gap15}}>
                    <FontIcon
                      kind={'normal'}
                      theme={'rect'}
                      back={'yellow'}
                      icon={faCheck}
                      onPress={() => addMember()}
                    />
                    <FontIcon
                      kind={'normal'}
                      theme={'rect'}
                      back={'orange'}
                      icon={faRemove}
                      onPress={() => {
                        setPhone('');
                        setNID('');
                      }}
                    />
                  </PhoneView>
                </PhoneView>
              </CommonWebBox>
            )}
          <CommonWebBox>
            {quiz !== undefined && editMode && !amIOwner && canChange && (
              <CommonButton
                onPress={async () => {
                  dispatch({loading: true});
                  let res = await generalRequest(
                    routes.leftTeamQuiz + quiz.id,
                    'delete',
                    undefined,
                    undefined,
                    state.token,
                  );

                  dispatch({loading: false});

                  if (res === null) return;

                  showSuccess();
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                }}
                title={'انصراف از گروه'}
              />
            )}
            {quiz !== undefined && (!editMode || amIOwner) && (
              <>
                <MyView style={{...styles.gap10}}>
                  <JustBottomBorderTextInput
                    placeholder={'نام تیم شما'}
                    subText={'نام تیم شما'}
                    value={teamName}
                    onChangeText={e => setTeamName(e)}
                  />

                  <PhoneView
                    style={{
                      ...styles.gap100,
                    }}>
                    <QuizItemCard
                      text={'عضو ارشد'}
                      val={
                        state.user.user.firstName +
                        ' ' +
                        state.user.user.lastName
                      }
                      icon={faUser}
                      textFontSize={14}
                      valFontSize={14}
                    />
                    {members != undefined &&
                      members.map((e, index) => {
                        return (
                          <EqualTwoTextInputs
                            key={index}
                            style={{
                              ...styles.marginTop10,
                              ...styles.gap15,
                              ...styles.alignItemsCenter,
                            }}>
                            <QuizItemCard
                              text={'عضو ' + faNums[index]}
                              val={e.NID}
                              icon={faUsers}
                              textFontSize={12}
                              valFontSize={12}
                            />

                            <SimpleFontIcon
                              kind={'normal'}
                              style={{color: 'red'}}
                              icon={faRemove}
                              onPress={() => removeMember(e.NID)}
                            />
                          </EqualTwoTextInputs>
                        );
                      })}
                  </PhoneView>
                </MyView>
              </>
            )}
            {quiz !== undefined && amIOwner && canChange && (
              <CommonButton
                title={commonTranslator.confirmChanges}
                theme={'dark'}
                onPress={async () => {
                  dispatch({loading: true});
                  let res = await generalRequest(
                    routes.updateOnlineQuizProfile + quiz.id,
                    'post',
                    {
                      members: members,
                      teamName: teamName,
                    },
                    undefined,
                    state.token,
                  );
                  dispatch({loading: false});
                  if (res != null) {
                    showSuccess();
                  }
                }}
              />
            )}
          </CommonWebBox>
          {quiz !== undefined &&
            quiz.teams !== undefined &&
            quiz.teams.length > 0 && <Team quiz={quiz} />}

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
        </MyView>
      )}
    </>
  );
}

export default BuyOnlineStanding;
