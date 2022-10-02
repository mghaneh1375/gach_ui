import {faPlus} from '@fortawesome/free-solid-svg-icons';
import React, {useState, useRef} from 'react';
import {changeText, p2e, showError} from '../../../services/Utility';
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
import SymbolsFace from './SymbolsFace';
import Translate from './Translate';
import {dispatchStateContext} from '../../../App';
import {checkExistance, fetchAllFlags, finalized, goToPay} from './Utility';
import {FontIcon} from '../../../styles/Common/FontIcon';
import Basket from '../../../components/web/Basket';
import SuccessTransaction from '../../../components/web/SuccessTransaction/SuccessTransaction';
import commonTranslator from '../../../translator/Common';
import BuyBasket from './BuyBasket';
import OffCode from '../../general/buy/components/OffCode';

function MakeQuiz(props) {
  const useGlobalState = () => [React.useContext(dispatchStateContext)];
  const [dispatch] = useGlobalState();
  const [flags, setFlags] = useState();
  const [boxes, setBoxes] = useState([]);
  const [level, setLevel] = useState();
  const [wantedFlag, setWantedFlag] = useState();
  const [total, setTotal] = useState(0);
  const [showSuccessTransaction, setShowSuccessTransaction] = useState(false);
  const [refId, setRefId] = useState();
  const [name, setName] = useState('test');
  const [count, setCount] = useState(50);

  const [off, setOff] = useState(0);
  const [shouldPay, setShouldPay] = useState(0);
  const [showOffCodePane, setShowOffCodePane] = useState(false);
  const [offs, setOffs] = useState([]);
  const [userMoney, setUserMoney] = useState(
    props.user === undefined ? 0 : props.user.user.money,
  );
  const [userOff, setUserOff] = useState();
  const [usedFromWallet, setUsedFromWallet] = useState(0);

  const ref = useRef();
  const [id, setId] = useState();
  const [price, setPrice] = useState();
  const [mode, setMode] = useState('choose');
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

  React.useEffect(() => {
    if (refId === undefined) return;

    setTimeout(() => {
      ref.current.submit();
    }, 1000);
  }, [refId]);

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
    <MyView>
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
          link={
            <SimpleText
              onPress={() => props.navigate('/myQuizzes')}
              style={{color: vars.DARK_BLUE}}
              text={'برای مشاهده آزمون های من اینجا را کلیک کنید.'}
            />
          }
        />
      )}
      {!showSuccessTransaction && (
        <MyView>
          <CommonWebBox header={Translate.makeQuiz} />
          <CommonWebBox rowId={1} header={Translate.chooseAndAdd}>
            <MyView>
              <JustBottomBorderTextInput
                placeholder={'نام'}
                subText={'لطفا یک نام برای آزمون خود انتخاب کنید'}
                value={name}
                onChangeText={e => setName(e)}
              />
              <PhoneView style={{...styles.gap15}}>
                {flags !== undefined && (
                  <JustBottomBorderTextInput
                    placeholder={'رشته'}
                    subText={'رشته'}
                    value={wantedFlag !== undefined ? wantedFlag.name : ''}
                    resultPane={true}
                    setSelectedItem={item => {
                      setWantedFlag(item);
                    }}
                    values={flags}
                  />
                )}
                <JustBottomBorderTextInput
                  text={Translate.count}
                  onChangeText={text => changeText(p2e(text), setCount)}
                  placeholder={Translate.count}
                  subText={
                    wantedFlag !== undefined
                      ? 'تعداد سوالات موجود در سامانه ' + wantedFlag.limit
                      : Translate.count
                  }
                  value={count}
                  justNum={true}
                />

                <PhoneView>
                  <SimpleText
                    text={Translate.difficulty}
                    style={{...styles.alignSelfCenter}}
                  />
                  <SymbolsFace level={level} setLevel={setLevel} />
                </PhoneView>

                <FontIcon
                  onPress={async () => {
                    setLoading(true);
                    let res = await checkExistance(
                      props.token,
                      wantedFlag.section,
                      wantedFlag.section === 'tag'
                        ? wantedFlag.name
                        : wantedFlag.id,
                      count,
                      level,
                    );
                    setLoading(false);
                    if (res) {
                      let tmp = [];
                      boxes.forEach(elem => tmp.push(elem));
                      let obj = wantedFlag;
                      obj.level = level;
                      obj.count = count;
                      tmp.push(obj);
                      setWantedFlag(undefined);
                      setCount('');
                      setLevel(undefined);
                      setBoxes(tmp);
                      setTotal(total + count);
                    }
                  }}
                  back={'yellow'}
                  kind={'normal'}
                  theme={'rect'}
                  icon={faPlus}
                  parentStyle={{marginTop: 10}}
                />
              </PhoneView>
            </MyView>
          </CommonWebBox>
          {boxes.length > 0 && (
            <CommonWebBox rowId={2} header={Translate.sortQuiz}>
              <PhoneView>
                {boxes.map((elem, index) => {
                  return (
                    <MakeQuizBox
                      key={index}
                      index={index + 1}
                      onRemove={idx => {
                        let tmp = [];
                        boxes.forEach((elem, index) => {
                          if (index !== idx) tmp.push(elem);
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
              </PhoneView>
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

      {refId !== undefined && (
        <form
          ref={ref}
          action="https://bpm.shaparak.ir/pgwchannel/startpay.mellat"
          method="post"
          target="_blank">
          <input type={'hidden'} value={refId} name="RefId" />
        </form>
      )}
    </MyView>
  );
}

export default MakeQuiz;
