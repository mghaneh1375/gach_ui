import React, {useState} from 'react';
import Quizzes from '../../../../../components/web/Quizzes';
import {showError} from '../../../../../services/Utility';
import {BigBoldBlueText, MyView} from '../../../../../styles/Common';
import {packagesContext} from '../Context';
import commonTranslator from '../../../../../tranlates/Common';
import OffCode from '../OffCode';
import SuccessTransaction from '../../../../../components/web/SuccessTransaction';
import BuyBasket from '../BuyBasket';

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
    }

    setOffs(allOffs);
    setOff(off);
    setPrice(totalPrice);
    setShouldPay(shouldPayTmp > 0 ? shouldPayTmp : 0);
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
          back={() => {
            props.navigate('/myQuizzes');
          }}
        />
      )}
      {quizzes !== undefined && !showSuccessTransaction && (
        <MyView style={{padding: 10, alignSelf: 'start'}}>
          <BigBoldBlueText text={'لیست آزمون ها'} />
          <Quizzes
            fullWidth={props.isRightMenuVisible ? false : true}
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
