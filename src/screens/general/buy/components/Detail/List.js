import React, {useState} from 'react';
import Quizzes from '../../../../../components/web/Quizzes';
import {formatPrice, showError} from '../../../../../services/Utility';
import {
  BigBoldBlueText,
  CommonButton,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import {packagesContext} from '../Context';
import Translate from './../../Translate';
import commonTranslator from '../../../../../tranlates/Common';
import {styles} from '../../../../../styles/Common/Styles';
import OffCode from '../OffCode';
import {goToPay} from '../Utility';
import {setCacheItem} from '../../../../../API/User';
import SuccessTransaction from '../../../../../components/web/SuccessTransaction/SuccessTransaction';

function List(props) {
  const [price, setPrice] = useState(0);
  const [off, setOff] = useState(0);
  const [shouldPay, setShouldPay] = useState(0);
  const [quizzes, setQuizzes] = useState();
  const [showOffCodePane, setShowOffCodePane] = useState(false);
  const [offs, setOffs] = useState([]);

  const [userOff, setUserOff] = useState();

  const useGlobalState = () => [React.useContext(packagesContext)];
  const [state] = useGlobalState();
  const [wantedQuizzes, setWantedQuizzes] = useState();
  const [userMoney, setUserMoney] = useState(
    props.user === undefined ? 0 : props.user.user.money,
  );
  const [usedFromWallet, setUsedFromWallet] = useState(0);
  const [showSuccessTransaction, setShowSuccessTransaction] = useState(false);

  const calc = (ids, accountOff) => {
    let off = 0;
    let totalPrice = 0;
    let totalQuizzes = 0;
    setWantedQuizzes(ids);

    ids.forEach(elem => {
      let quiz = state.package.quizzesDoc.find(itr => itr.id === elem);
      if (quiz === undefined) return;
      totalQuizzes++;
      totalPrice += quiz.price;
    });

    let allOffs = [];

    if (state.package.minSelect <= totalQuizzes && totalPrice > 0) {
      off += (totalPrice * state.package.offPercent) / 100;
      allOffs.push(state.package.offPercent + ' درصد بابت بسته آزمونی');
    }

    let shouldPayTmp = totalPrice - off;

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
    }

    setOffs(allOffs);
    setOff(off);
    setPrice(totalPrice);
    setShouldPay(shouldPayTmp > 0 ? shouldPayTmp : 0);
  };

  React.useEffect(() => {
    setQuizzes(
      state.package.quizzesDoc.map(elem => {
        elem.isSelected = false;
        return elem;
      }),
    );
  }, [state.package]);

  React.useEffect(() => {
    setUserOff(state.off);
  }, [state.off]);

  const toggleShowOffCodePane = () => {
    if (
      !showOffCodePane &&
      (props.token === null || props.token === undefined || props.token === '')
    ) {
      showError(commonTranslator.shouldLogin);
      return;
    }
    setShowOffCodePane(!showOffCodePane);
  };

  const setOffCodeResult = (amount, type, code) => {
    setUserOff({type: type, amount: amount, code: code});
    calc(wantedQuizzes, {type: type, amount: amount, code: code});
  };

  const goToPayLocal = async () => {
    if (
      props.token === null ||
      props.token === undefined ||
      props.token === ''
    ) {
      showError(commonTranslator.shouldLogin);
      return;
    }

    let data = {
      ids: wantedQuizzes,
      packageId: state.package.id,
    };
    if (userOff !== undefined && userOff.code !== undefined)
      data.offcode = userOff.code;

    props.setLoading(true);
    let res = await goToPay(props.token, data);

    props.setLoading(false);
    if (res !== null) {
      if (res.action === 'success') {
        let user = props.user;
        user.user.money = res.url;
        await setCacheItem('user', JSON.stringify(user));
        setShowSuccessTransaction(true);
      }
    }
  };

  return (
    <MyView>
      {showOffCodePane && (
        <OffCode
          token={props.token}
          setLoading={props.setLoading}
          setResult={setOffCodeResult}
          toggleShowPopUp={toggleShowOffCodePane}
        />
      )}
      {showSuccessTransaction && (
        <SuccessTransaction
          back={() => {
            props.navigate('/myQuizzes');
          }}
        />
      )}
      {quizzes !== undefined && !showSuccessTransaction && (
        <MyView style={{padding: 10, alignSelf: 'start'}}>
          <BigBoldBlueText text={'sa'} />
          <Quizzes
            fullWidth={props.isRightMenuVisible ? false : true}
            setSelectedQuizzes={ids => calc(ids, userOff)}
            quizzes={quizzes}>
            <PhoneView
              style={{
                ...{alignSelf: 'flex-end', gap: 5},
                ...styles.alignItemsCenter,
              }}>
              {price > 0 && (
                <MyView>
                  <PhoneView>
                    <BigBoldBlueText
                      style={{marginTop: 5}}
                      text={Translate.amount}
                    />

                    {(off > 0 || usedFromWallet > 0) && (
                      <MyView>
                        {off > 0 && (
                          <PhoneView style={styles.alignItemsCenter}>
                            <SimpleText
                              text={formatPrice(off)}
                              style={{
                                ...{marginRight: 10},
                                ...styles.yellow_color,
                                ...styles.fontSize13,
                              }}
                            />
                            <SimpleText
                              style={{
                                ...{marginRight: 5},
                                ...styles.dark_blue_color,
                                ...styles.fontSize13,
                              }}
                              text={Translate.off}
                            />
                          </PhoneView>
                        )}
                        {usedFromWallet > 0 && (
                          <PhoneView style={styles.alignItemsCenter}>
                            <SimpleText
                              text={formatPrice(usedFromWallet)}
                              style={{
                                ...{marginRight: 10},
                                ...styles.yellow_color,
                                ...styles.fontSize13,
                              }}
                            />
                            <SimpleText
                              style={{
                                ...{marginRight: 5},
                                ...styles.dark_blue_color,
                                ...styles.fontSize13,
                              }}
                              text={Translate.wallet}
                            />
                          </PhoneView>
                        )}
                      </MyView>
                    )}
                  </PhoneView>
                  <PhoneView>
                    <SimpleText
                      style={
                        shouldPay !== price
                          ? {
                              ...styles.dark_blue_color,
                              ...styles.textDecorRed,
                            }
                          : {...styles.dark_blue_color}
                      }
                      text={formatPrice(price) + ' تومان '}
                    />
                    {shouldPay !== price && (
                      <SimpleText
                        style={{...{marginRight: 15}, ...styles.red}}
                        text={formatPrice(shouldPay) + ' تومان '}
                      />
                    )}
                  </PhoneView>
                </MyView>
              )}

              {price > 0 && (
                <MyView
                  style={{...{marginRight: 40}, ...styles.alignItemsCenter}}>
                  <CommonButton
                    theme={'dark'}
                    title={shouldPay > 0 ? Translate.goToPay : Translate.buy}
                    onPress={() => goToPayLocal()}
                  />
                  {shouldPay > 0 && (
                    <SimpleText
                      style={{
                        ...styles.yellow_color,
                        ...styles.fontSize13,
                        ...styles.cursor_pointer,
                      }}
                      text={Translate.enterOff}
                      onPress={() => toggleShowOffCodePane()}
                    />
                  )}
                </MyView>
              )}
            </PhoneView>
          </Quizzes>
        </MyView>
      )}
    </MyView>
  );
}

export default List;
