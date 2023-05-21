import {
  CommonWebBox,
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
import {showError} from '../../../services/Utility';
import OffCode from './components/OffCode';
import SuccessTransaction from '../../../components/web/SuccessTransaction/SuccessTransaction';

function BuyOnlineStanding(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [quiz, setQuiz] = useState();
  const [price, setPrice] = useState(0);
  const [off, setOff] = useState(0);
  const [shouldPay, setShouldPay] = useState(0);
  const [desc, setDesc] = useState();
  const [userMoney, setUserMoney] = useState(
    state.user === null ? 0 : state.user.user.money,
  );
  const [showOffCodePane, setShowOffCodePane] = useState(false);
  const [offs, setOffs] = useState([]);

  const [userOff, setUserOff] = useState();
  const [usedFromWallet, setUsedFromWallet] = useState(0);
  const [showSuccessTransaction, setShowSuccessTransaction] = useState(false);

  const calc = accountOff => {
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

    setOffs(allOffs);
    setOff(Math.min(off, totalPrice));
    setPrice(totalPrice === 0 ? 10 : totalPrice);
    setShouldPay(shouldPayTmp > 0 ? shouldPayTmp : 10);
  };

  const params = useParams();

  React.useEffect(() => {
    setUserOff(state.off);
  }, [state.off]);

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
    setUserOff({type: type, amount: amount, code: code});
    calc({type: type, amount: amount, code: code});
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

      setOff(res[0].off);
      setDesc(res[0].items[0].description);
      let tmp = res[0].items[0];
      tmp.description = undefined;
      setQuiz(tmp);
    });
  }, [dispatch, params, props, state.token]);

  useEffectOnce(() => {
    fetchData();
  });

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
        <CommonWebBox>
          {quiz !== undefined && (
            <PhoneView>
              <Card quiz={quiz} />
              <SimpleText
                text={desc}
                style={{...styles.padding30, ...styles.fontSize17}}
              />
            </PhoneView>
          )}
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
        </CommonWebBox>
      )}
    </>
  );
}

export default BuyOnlineStanding;
