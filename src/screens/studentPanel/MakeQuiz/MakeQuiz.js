import {faPlus} from '@fortawesome/free-solid-svg-icons';
import React, {useState, useRef} from 'react';
import {changeText} from '../../../services/Utility';
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
import {setCacheItem} from '../../../API/User';
import SuccessTransaction from '../../../components/web/SuccessTransaction/SuccessTransaction';

function MakeQuiz(props) {
  const [count, setCount] = useState();

  const useGlobalState = () => [React.useContext(dispatchStateContext)];
  const [dispatch] = useGlobalState();
  const [flags, setFlags] = useState();
  const [boxes, setBoxes] = useState([]);
  const [level, setLevel] = useState();
  const [wantedFlag, setWantedFlag] = useState();
  const [total, setTotal] = useState(0);
  const [basketBtnText, setBasketBtnText] = useState('نهایی سازی خرید');
  const [showSuccessTransaction, setShowSuccessTransaction] = useState(false);
  const [refId, setRefId] = useState();
  const [name, setName] = useState();

  const ref = useRef();
  const [id, setId] = useState();

  React.useEffect(() => {
    if (refId === undefined) return;

    setTimeout(() => {
      ref.current.submit();
    }, 1000);
  }, [refId]);

  const calcPrice = async () => {
    setLoading(true);
    let res = await finalized(props.token, boxes, name);
    setLoading(false);
    if (res !== null) {
      setBasketBtnText(res.price);
      setId(res.id);
    }
  };

  React.useEffect(() => {
    if (id === undefined) return;
    setMode('pay');
  }, [id]);

  const goToPayLocal = async () => {
    setLoading(true);
    let res = await goToPay(props.token, id, undefined);
    setLoading(false);
    if (res.action === 'success') {
      let user = props.user;
      user.user.money = res.refId;
      await setCacheItem('user', JSON.stringify(user));
      setShowSuccessTransaction(true);
    } else if (res.action === 'pay') {
      setRefId(res.refId);
    }
  };

  const [mode, setMode] = useState('choose');
  const navigate = props.navigate;

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
                  onChangeText={text => changeText(text, setCount)}
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
                      setTotal(parseInt(total) + parseInt(count));
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
          <Basket label={total + ' سوال'}>
            <CommonButton
              onPress={() => (mode === 'choose' ? calcPrice() : goToPayLocal())}
              title={basketBtnText}
            />
          </Basket>
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
