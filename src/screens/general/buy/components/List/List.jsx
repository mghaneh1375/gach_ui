import {getDevice, getWidthHeight} from '@/services/utility';
import {MyView, PhoneView, SimpleText} from '@/styles';
import {styles} from '@/styles/common/styles.js';
import vars from '@/styles/root.js';
import React, {useState} from 'react';
import Card from '../../../../panel/package/card/Card.jsx';
import {fetchAllPackages} from '../../../../panel/package/components/utility';
import {dispatchPackagesContext, packagesContext} from '../Context.jsx';
import QuizList from '../detail/List.jsx';
function List(props) {
  const useGlobalState = () => [
    React.useContext(packagesContext),
    React.useContext(dispatchPackagesContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);
  const [quizzes, setQuizzes] = useState();
  const [registered, setRegistered] = useState(false);
  const [expiredMessage, setExpiredMessage] = useState(false);
  React.useEffect(() => {
    if (state.selectableItems === undefined) return;
    setQuizzes(
      state.selectableItems.filter(elem => {
        return elem.type !== 'package';
      }),
    );
  }, [state.selectableItems]);
  React.useEffect(() => {
    if (isWorking || state.allItems !== undefined) return;
    setIsWorking(true);
    props.setLoading(true);
    Promise.all([
      fetchAllPackages(
        props.token === null || props.token === undefined || props.token === ''
          ? undefined
          : props.token,
        props.quizId,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] === null) {
        props.navigate('/');
        return;
      }
      if (props.quizId !== undefined && res[0].registered !== undefined) {
        setRegistered(true);
        return;
      }
      if (props.quizId !== undefined && res[0].items.length === 0) {
        setExpiredMessage(true);
        return;
      }
      dispatch({
        off: res[0].off,
        groupRegistrationOff: res[0].groupRegistrationOff,
        allItems: res[0].items,
        filters: {
          items: res[0].tags,
          month: res[0].month,
          onChangeFilter: selectedIndices => {
            dispatch({
              checkedFilterIndices: selectedIndices,
              needUpdateFilters: true,
            });
          },
          onChangeFilterMonth: selectedIndices => {
            dispatch({
              checkedFilterIndicesMonth: selectedIndices,
              needUpdateFilters: true,
            });
          },
          onChangeKindQuiz: selectedKind => {
            dispatch({
              selectedKindQuiz: selectedKind,
              needUpdateFilters: true,
            });
          },
          onChangePrice: selectedPrice => {
            dispatch({
              selectedPrice: selectedPrice,
              needUpdateFilters: true,
            });
          },
        },
      });
      setIsWorking(false);
    });
  }, [dispatch, props, isWorking, state.allItems]);
  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;
  return (
    <MyView
      style={
        !isInPhone
          ? {
              minHeight: '130vh',
            }
          : {}
      }>
      {!registered && (
        <PhoneView
          style={
            isInPhone
              ? {
                  padding: 20,
                  gap: 10,
                  width: getWidthHeight[0],
                }
              : {
                  gap: 15,
                  padding: 20,
                }
          }>
          {expiredMessage && (
            <SimpleText
              style={{
                color: vars.DARK_BLUE,
                fontSize: '20px',
                margin: '100px auto',
              }}
              text={
                'به دلیل اتمام زمان ثبت نام، امکان ثبت نام در آزمون مدنظر وجود ندارد'
              }
            />
          )}
          {state.selectableItems !== undefined &&
            state.selectableItems.map((item, index) => {
              if (item.type === 'package')
                return (
                  <Card
                    isAdmin={false}
                    isStudent={
                      props.user === null ||
                      props.user === undefined ||
                      props.user.accesses.indexOf('student') !== -1
                    }
                    key={index}
                    package={item}
                    onPress={() => {
                      dispatch({
                        package: item,
                      });
                      props.setMode('detail');
                    }}
                  />
                );
            })}
        </PhoneView>
      )}

      {!registered && quizzes !== undefined && quizzes.length > 0 && (
        <QuizList
          isRightMenuVisible={true}
          token={props.token}
          user={props.user}
          setLoading={props.setLoading}
          navigate={props.navigate}
          package={{
            id: undefined,
            offPercent: 0,
            quizzesDoc: quizzes,
            minSelect: 0,
          }}
        />
      )}
      {registered && (
        <SimpleText
          style={{
            ...styles.BlueBold,
            ...styles.textCenter,
            ...styles.fontSize25,
            ...styles.marginTop50,
          }}
          text="شما در آزمون موردنظر ثبت نام شده اید."
        />
      )}
    </MyView>
  );
}
export default List;
