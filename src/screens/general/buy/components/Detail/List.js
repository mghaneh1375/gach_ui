import React, {useState} from 'react';
import Quizzes from '../../../../../components/web/Quizzes';
import {
  getDevice,
  getWidthHeight,
  showError,
} from '../../../../../services/Utility';
import {
  BigBoldBlueText,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import {packagesContext} from '../Context';
import commonTranslator from '../../../../../translator/Common';
import OffCode from '../OffCode';

import SuccessTransaction from '../../../../../components/web/SuccessTransaction/SuccessTransaction';
import BuyBasket from '../BuyBasket';
import {styles} from '../../../../../styles/Common/Styles';

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
    props.user === null ? 0 : props.user.user.money,
  );
  const [usedFromWallet, setUsedFromWallet] = useState(0);
  const [showSuccessTransaction, setShowSuccessTransaction] = useState(false);

  const calc = (ids, accountOff) => {
    let off = 0;
    let totalPrice = 0;
    let totalQuizzes = 0;
    setWantedQuizzes(ids);

    ids.forEach(elem => {
      let quiz = props.package.quizzesDoc.find(itr => itr.id === elem);
      if (quiz === undefined) return;
      totalQuizzes++;
      totalPrice += quiz.price;
    });

    let allOffs = [];

    if (
      props.package.offPercent > 0 &&
      props.package.minSelect <= totalQuizzes &&
      totalPrice > 0
    ) {
      off += (totalPrice * props.package.offPercent) / 100;
      allOffs.push(props.package.offPercent + ' درصد بابت بسته آزمونی');
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
    } else setUsedFromWallet(0);

    setOffs(allOffs);
    setOff(Math.min(off, totalPrice));
    setPrice(totalPrice === 0 ? 10 : totalPrice);
    setShouldPay(shouldPayTmp > 0 ? shouldPayTmp : 10);
  };

  React.useEffect(() => {
    setQuizzes(
      props.package.quizzesDoc.map(elem => {
        elem.isSelected = false;
        return elem;
      }),
    );
  }, [props.package]);

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

  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;
  const w = getWidthHeight()[0];

  return (
    <MyView>
      {showOffCodePane && (
        <OffCode
          token={props.token}
          for={'gach_exam'}
          setLoading={props.setLoading}
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

      {quizzes !== undefined && !showSuccessTransaction && (
        <MyView
          style={
            isInPhone
              ? {
                  padding: 10,
                  width: w,
                  alignSelf: 'start',
                  minHeight: '100vh',
                  marginBottom: 60,
                }
              : {padding: 10, alignSelf: 'start', minHeight: '100vh'}
          }>
          <BigBoldBlueText
            style={{
              ...styles.BlueBold,
              ...styles.textCenter,
              ...styles.fontSize20,
            }}
            text={'لیست خرید آزمون ها'}
          />
          <Quizzes
            fullWidth={
              props.user === null ||
              props.user === undefined ||
              !state.isRightMenuVisible
            }
            setSelectedQuizzes={ids => calc(ids, userOff)}
            quizzes={quizzes}>
            <BuyBasket
              packageId={props.package.id}
              price={price}
              shouldPay={shouldPay}
              wantedQuizzes={wantedQuizzes}
              off={off}
              userOff={userOff}
              setLoading={props.setLoading}
              token={props.token}
              user={props.user}
              setShowInfo={props.setShowInfo}
              usedFromWallet={usedFromWallet}
              toggleShowOffCodePane={toggleShowOffCodePane}
              setShowSuccessTransaction={setShowSuccessTransaction}
            />
          </Quizzes>
        </MyView>
      )}
    </MyView>
  );
}

export default List;
