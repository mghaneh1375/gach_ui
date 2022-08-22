import React, {useState} from 'react';
import Quizzes from '../../../../../components/web/Quizzes';
import {formatPrice} from '../../../../../services/Utility';
import {
  BigBoldBlueText,
  CommonButton,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import {dispatchPackagesContext, packagesContext} from '../Context';
import Translate from './../../Translate';
import {styles} from '../../../../../styles/Common/Styles';
import OffCode from '../OffCode';
function List(props) {
  const [price, setPrice] = useState(0);
  const [off, setOff] = useState(0);
  const [shouldPay, setShouldPay] = useState(0);
  const [shouldPayAfterOff, setShouldPayAfterOff] = useState();
  const [quizzes, setQuizzes] = useState();
  const [showOffCodePane, setShowOffCodePane] = useState(false);

  const useGlobalState = () => [
    React.useContext(packagesContext),
    React.useContext(dispatchPackagesContext),
  ];
  const [state, dispatch] = useGlobalState();

  const calc = selectedQuizzes => {
    let offPercent = 0;
    let totalPrice = 0;
    let totalQuizzes = 0;

    selectedQuizzes.forEach(elem => {
      let quiz = state.package.quizzesDoc.find(itr => itr.id === elem);
      if (quiz === undefined) return;
      totalQuizzes++;
      totalPrice += quiz.price;
    });

    if (state.package.minSelect <= totalQuizzes && totalPrice > 0)
      offPercent = state.package.offPercent;

    setOff(offPercent);
    setPrice(totalPrice);
    setShouldPay(totalPrice * ((100.0 - offPercent) / 100.0));
  };

  React.useEffect(() => {
    setQuizzes(
      state.package.quizzesDoc.map(elem => {
        elem.isSelected = false;
        return elem;
      }),
    );
  }, [state.package]);

  const toggleShowOffCodePane = () => {
    setShowOffCodePane(!showOffCodePane);
  };

  const setOffCodeResult = (amount, type) => {
    let p =
      type === 'value'
        ? shouldPay - amount
        : shouldPay * ((100.0 - amount) / 100.0);
    if (p < 0) p = 0;

    setShouldPayAfterOff(p);
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
      {quizzes !== undefined && !showOffCodePane && (
        <MyView style={{padding: 10, alignSelf: 'start'}}>
          <BigBoldBlueText text={'sa'} />
          <Quizzes
            fullWidth={props.isRightMenuVisible ? false : true}
            setSelectedQuizzes={calc}
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

                    {off > 0 && (
                      <PhoneView style={styles.alignItemsCenter}>
                        <SimpleText
                          text={off}
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
                  </PhoneView>
                  <PhoneView>
                    <SimpleText
                      style={{
                        ...styles.dark_blue_color,
                        ...styles.textDecorRed,
                      }}
                      text={formatPrice(price) + ' تومان '}
                    />
                    {(shouldPay !== price ||
                      shouldPayAfterOff !== undefined) && (
                      <SimpleText
                        style={{...{marginRight: 15}, ...styles.red}}
                        text={
                          shouldPayAfterOff !== undefined
                            ? formatPrice(shouldPayAfterOff) + ' تومان '
                            : formatPrice(shouldPay) + ' تومان '
                        }
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
                    title={Translate.goToPay}
                    //   onPress={async () => {
                    //     props.setLoading(true);
                    //     let res = await removeQuizzesFromPackage(
                    //       props.package.id,
                    //       selectedQuizzes,
                    //       props.token,
                    //     );
                    //     props.setLoading(false);
                    //     if (res !== null) {
                    //       showSuccess(commonTranslator.success);
                    //       dispatch({quizzes: res});
                    //       props.package.quizzesDoc = res;
                    //       props.package.quizzes = res.length;
                    //       props.setPackage(props.package);
                    //       setSelectedQuizzes([]);
                    //     }
                    //   }}
                  />
                  <SimpleText
                    style={{
                      ...styles.yellow_color,
                      ...styles.fontSize13,
                      ...styles.cursor_pointer,
                    }}
                    text={Translate.enterOff}
                    onPress={() => toggleShowOffCodePane()}
                  />
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
