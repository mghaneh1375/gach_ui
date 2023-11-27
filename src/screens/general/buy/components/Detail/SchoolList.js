import React, {useState} from 'react';
import Quizzes from './Quizzes';
import {showError} from '../../../../../services/Utility';
import {
  BigBoldBlueText,
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import {dispatchPackagesContext, packagesContext} from '../Context';
import commonTranslator from '../../../../../translator/Common';
import OffCode from '../OffCode';

import SuccessTransaction from '../../../../../components/web/SuccessTransaction/SuccessTransaction';
import BuyBasket from '../BuyBasket';
import vars from '../../../../../styles/root';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import {FontIcon} from '../../../../../styles/Common/FontIcon';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import StudentList from './MyStudenstList';
import columns from './../../../../schoolPanel/ManageStudents/list/TableStructure';
import {styles} from '../../../../../styles/Common/Styles';

function SchoolList(props) {
  const [price, setPrice] = useState(0);
  const [off, setOff] = useState(0);
  const [shouldPay, setShouldPay] = useState(0);
  const [quizzes, setQuizzes] = useState();
  const [showOffCodePane, setShowOffCodePane] = useState(false);
  const [showStudenListPane, setShowStudenListPane] = useState(false);
  const [quizzesTotalPrice, setQuizzesTotalPrice] = useState(0);
  const [offs, setOffs] = useState([]);
  const [userOff, setUserOff] = useState();

  const useGlobalState = () => [
    React.useContext(packagesContext),
    React.useContext(dispatchPackagesContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [userMoney, setUserMoney] = useState(
    props.user === null ? 0 : props.user.user.money,
  );
  const [usedFromWallet, setUsedFromWallet] = useState(0);
  const [showSuccessTransaction, setShowSuccessTransaction] = useState(false);

  const calc = React.useCallback(() => {
    let off = 0;
    let totalPrice = 0;
    let totalQuizzes = 0;
    let quizzesTotalPriceTmp = 0;

    if (
      state.selectedStudents !== undefined &&
      state.selectedStudents.length > 0 &&
      state.wantedQuizzes !== undefined
    ) {
      state.wantedQuizzes.forEach(elem => {
        let quiz = props.package.quizzesDoc.find(itr => itr.id === elem);
        if (quiz === undefined) return;
        totalQuizzes++;
        quizzesTotalPriceTmp += quiz.price;
        totalPrice += quiz.price * state.selectedStudents.length;
      });
    }

    let allOffs = [];

    if (
      props.package.offPercent > 0 &&
      props.package.minSelect <= totalQuizzes &&
      totalPrice > 0
    ) {
      off += (totalPrice * props.package.offPercent) / 100;
      allOffs.push(props.package.offPercent + ' % بابت بسته آزمونی');
    }

    let shouldPayTmp = totalPrice - off;

    if (state.groupRegistrationOff > 0 && shouldPayTmp > 0) {
      off += (shouldPayTmp * state.groupRegistrationOff) / 100;
      allOffs.push(state.groupRegistrationOff + ' % بابت ثبت نام دست جمعی');
      shouldPayTmp = totalPrice - off;
    }

    if (shouldPayTmp > 0 && userOff !== undefined) {
      if (userOff.type === 'percent') {
        off += (shouldPayTmp * userOff.amount) / 100.0;
        allOffs.push(userOff.amount + ' % بابت کد تخفیف');
      } else {
        off += userOff.amount;
        allOffs.push(userOff.amount + ' تومان بابت کد تخفیف');
      }
    }

    shouldPayTmp = totalPrice - off;

    if (shouldPayTmp > 0) {
      setUsedFromWallet(Math.min(userMoney, shouldPayTmp));
      shouldPayTmp -= userMoney;
    } else setUsedFromWallet(0);

    setQuizzesTotalPrice(quizzesTotalPriceTmp);
    setOffs(allOffs);
    setOff(Math.min(off, totalPrice));
    setPrice(totalPrice);
    setShouldPay(shouldPayTmp > 0 ? shouldPayTmp : 0);
  }, [
    userOff,
    state.groupRegistrationOff,
    state.selectedStudents,
    state.wantedQuizzes,
    props.package,
    userMoney,
  ]);

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
  };

  React.useEffect(() => {
    if (
      state.wantedQuizzes === undefined &&
      state.selectedStudents === undefined
    )
      return;
    calc();
  }, [state.wantedQuizzes, state.selectedStudents, userOff, calc]);

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
      {showStudenListPane && (
        <StudentList
          token={props.token}
          setLoading={props.setLoading}
          toggleShowPopUp={() => {
            setShowStudenListPane(false);
          }}
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
          style={{
            padding: 10,
            alignSelf: 'start',
            width: '100%',
            minHeight: '100vh',
          }}>
          <BigBoldBlueText text={'لیست آزمون‌ها'} />
          <Quizzes
            marginBottom={30}
            fullWidth={!state.isRightMenuVisible}
            noSelectAll={true}
            label={'دانش آموزان'}
            calculation={quizzesTotalPrice + ' تومان'}
            selectedItemsCount={
              state.selectedStudents === undefined
                ? 0
                : state.selectedStudents.length
            }
            quizzes={quizzes}>
            <BuyBasket
              packageId={props.package.id}
              students={
                state.selectedStudents !== undefined
                  ? state.selectedStudents.map(elem => {
                      return elem.id;
                    })
                  : []
              }
              price={price}
              shouldPay={shouldPay}
              wantedQuizzes={state.wantedQuizzes}
              off={off}
              offs={offs}
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

          <CommonWebBox style={{marginTop: 20, marginBottom: 100}}>
            <PhoneView style={{gap: 20}}>
              <SimpleText text="لیست دانش آموزان" />
              <FontIcon
                onPress={() => setShowStudenListPane(true)}
                back={'yellow'}
                theme={'rect'}
                icon={faPlus}
              />
            </PhoneView>
            <CommonDataTable
              excel={false}
              columns={columns}
              data={
                state.selectedStudents === undefined
                  ? []
                  : state.selectedStudents
              }
              pagination={false}
              groupOps={[
                {
                  key: 'remove',
                  label: commonTranslator.delete,
                  warning: 'آیا از حذف دانش آموزان انتخاب شده اطمینان دارید؟',
                  needData: true,
                  afterFunc: (res, data) => {
                    let tmp = data.filter(elem => {
                      return res.find(e => e.id === elem.id) === undefined;
                    });
                    dispatch({selectedStudents: tmp});
                  },
                },
              ]}
            />
          </CommonWebBox>
        </MyView>
      )}
    </MyView>
  );
}

export default SchoolList;
