import {faCheck, faSearch} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {showError} from '../../../services/Utility';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import JustBottomBorderTextInput from '../../../styles/Common/JustBottomBorderTextInput';
import {styles} from '../../../styles/Common/Styles';
import vars from '../../../styles/root';
import MakeQuizBox from './MakeQuizBox';
import Translate from './Translate';
import {dispatchStateContext} from '../../../App';
import {fetchAllFlags, finalized} from './Utility';
import {SimpleFontIcon} from '../../../styles/Common/FontIcon';
import Basket from '../../../components/web/Basket';
import SuccessTransaction from '../../../components/web/SuccessTransaction/SuccessTransaction';
import commonTranslator from '../../../translator/Common';
import BuyBasket from './BuyBasket';
import OffCode from '../../general/buy/components/OffCode';
import {LoadingCommonWebBox} from '../../../components/LoadingCommonWebBox';
import Search from './Search';

function MakeQuiz(props) {
  const useGlobalState = () => [React.useContext(dispatchStateContext)];
  const [dispatch] = useGlobalState();
  const [flags, setFlags] = useState();
  const [boxes, setBoxes] = useState([]);

  const [total, setTotal] = useState(0);
  const [showSuccessTransaction, setShowSuccessTransaction] = useState(false);
  const [name, setName] = useState();

  const [off, setOff] = useState(0);
  const [shouldPay, setShouldPay] = useState(0);
  const [showOffCodePane, setShowOffCodePane] = useState(false);
  const [offs, setOffs] = useState([]);
  const [userMoney, setUserMoney] = useState(
    props.user === null ? 0 : props.user.user.money,
  );
  const [userOff, setUserOff] = useState();
  const [usedFromWallet, setUsedFromWallet] = useState(0);

  const [id, setId] = useState();
  const [price, setPrice] = useState();
  const [mode, setMode] = useState('choose');
  const [transactionId, setTransactionId] = useState();
  const [showSearch, setShowSearch] = useState(false);
  const navigate = props.navigate;

  const calc = (accountOff, totalPrice) => {
    let off = 0;

    let allOffs = [];

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
    setPrice(totalPrice);
    setShouldPay(shouldPayTmp > 0 ? shouldPayTmp : 0);
  };

  const calcPrice = async () => {
    if (name === undefined || name === '' || boxes.length === 0) {
      showError(commonTranslator.pleaseFillAllFields);
      return;
    }
    setLoading(true);
    let res = await finalized(props.token, boxes, name);
    setLoading(false);
    if (res !== null) {
      if (res.off !== undefined) setUserOff(res.off);
      setPrice(res.price);
      setId(res.id);
      calc(res.off, res.price);
    }
  };

  const setOffCodeResult = (amount, type, code) => {
    setUserOff({type: type, amount: amount, code: code});
    calc({type: type, amount: amount, code: code}, price);
  };

  React.useEffect(() => {
    if (id === undefined) return;
    setMode('pay');
  }, [id]);

  const setLoading = status => {
    dispatch({loading: status});
  };

  React.useEffect(() => {
    let tmp = 0;
    boxes.forEach(elem => {
      tmp += parseInt(elem.count);
    });
    setTotal(tmp);
  }, [boxes]);

  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([fetchAllFlags(props.token)]).then(res => {
      dispatch({loading: false});
      if (res[0] === null) {
        navigate('/');
        return;
      }
      setFlags(res[0]);
    });
  }, [navigate, props.token, dispatch]);

  return (
    <MyView style={{...styles.marginBottom20}}>
      {showSearch && (
        <Search
          setSelected={items => {
            let tmp = [];
            boxes.forEach(elem => {
              tmp.push(elem);
            });
            items.forEach(elem => {
              tmp.push(elem);
            });
            setBoxes(tmp);
          }}
          flags={flags}
          toggleShowPopUp={() => setShowSearch(false)}
        />
      )}
      {showOffCodePane && (
        <OffCode
          token={props.token}
          for={'bank_exam'}
          setLoading={setLoading}
          setResult={setOffCodeResult}
          toggleShowPopUp={() => {
            setShowOffCodePane(!showOffCodePane);
          }}
        />
      )}
      {showSuccessTransaction && (
        <SuccessTransaction
          navigate={props.navigate}
          transactionId={transactionId}
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
                onPress={() => props.navigate('/myCustomQuizzes')}
                style={{
                  ...styles.BlueBold,
                  ...styles.FontWeight600,
                  ...styles.fontSize13,
                  ...styles.marginLeft5,
                  ...styles.cursor_pointer,
                }}
                text={commonTranslator.myCustomQuizess}
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
        <MyView>
          <CommonWebBox header={Translate.makeQuiz} />
          <CommonWebBox rowId={1} header={Translate.nameTitle}>
            {mode !== 'choose' && (
              <LoadingCommonWebBox>
                <SimpleFontIcon
                  style={{color: 'green'}}
                  parentStyle={{
                    border: '2px solid green',
                    width: 60,
                    height: 60,
                    padding: 10,
                    borderRadius: '50%',
                  }}
                  icon={faCheck}
                />
              </LoadingCommonWebBox>
            )}
            <MyView>
              <JustBottomBorderTextInput
                placeholder={Translate.name}
                subText={Translate.nameHelp}
                value={name}
                onChangeText={e => setName(e)}
              />
            </MyView>
          </CommonWebBox>
          <CommonWebBox rowId={2} header={Translate.chooseAndAdd}>
            {mode !== 'choose' && (
              <LoadingCommonWebBox>
                <SimpleFontIcon
                  style={{color: 'green'}}
                  parentStyle={{
                    border: '2px solid green',
                    width: 60,
                    height: 60,
                    padding: 10,
                    borderRadius: '50%',
                  }}
                  icon={faCheck}
                />
              </LoadingCommonWebBox>
            )}
            <MyView>
              <PhoneView style={{...styles.gap15}}>
                {flags !== undefined && (
                  <CommonButton
                    icon={faSearch}
                    title={Translate.searchQuestion}
                    onPress={() => setShowSearch(true)}
                  />
                )}
              </PhoneView>
            </MyView>
          </CommonWebBox>
          {boxes.length > 0 && (
            <CommonWebBox
              rowId={3}
              header={Translate.sortQuiz}
              style={{...styles.marginBottom20}}>
              {mode !== 'choose' && (
                <LoadingCommonWebBox>
                  <SimpleFontIcon
                    style={{color: 'green'}}
                    parentStyle={{
                      border: '2px solid green',
                      width: 60,
                      height: 60,
                      padding: 10,
                      borderRadius: '50%',
                    }}
                    icon={faCheck}
                  />
                </LoadingCommonWebBox>
              )}
              <MyView style={{...styles.padding20, ...styles.gap10}}>
                {boxes.map((elem, index) => {
                  return (
                    <MakeQuizBox
                      key={index}
                      index={index + 1}
                      onRemove={idx => {
                        let tmp = [];
                        boxes.forEach((elem, index) => {
                          if (index !== idx) tmp.push(elem);
                          else setTotal(total - elem.count);
                        });
                        setBoxes(tmp);
                      }}
                      // width={290}
                      theme={vars.ORANGE}
                      header={elem.desc}
                      count={elem.count}
                      level={elem.level}
                    />
                  );
                })}
              </MyView>
            </CommonWebBox>
          )}
          {mode !== 'choose' && (
            <Basket backBtnTitle="انصراف" onBackClick={() => setMode('choose')}>
              <BuyBasket
                id={id}
                price={price}
                shouldPay={shouldPay}
                off={off}
                userOff={userOff}
                setLoading={setLoading}
                token={props.token}
                user={props.user}
                usedFromWallet={usedFromWallet}
                setTransactionId={setTransactionId}
                toggleShowOffCodePane={() => {
                  setShowOffCodePane(!showOffCodePane);
                }}
                setShowSuccessTransaction={setShowSuccessTransaction}
              />
            </Basket>
          )}
          {mode === 'choose' && (
            <Basket label={total === 0 ? undefined : total + ' سوال'}>
              <CommonButton
                onPress={() => calcPrice()}
                title={'نهایی سازی خرید'}
              />
            </Basket>
          )}
        </MyView>
      )}
    </MyView>
  );
}

export default MakeQuiz;
