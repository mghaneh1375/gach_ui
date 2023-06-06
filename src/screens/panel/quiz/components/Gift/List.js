import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import {styles} from '../../../../../styles/Common/Styles';
import {dispatchQuizContext, quizContext} from '../Context';
import {generalRequest} from '../../../../../API/Utility';
import {routes} from '../../../../../API/APIRoutes';
import {showSuccess} from '../../../../../services/Utility';

function List(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState();
  const [data, setData] = useState();

  React.useEffect(() => {
    if (state.selectedQuiz?.gifts !== undefined)
      setData(state.selectedQuiz?.gifts);
  }, [state.selectedQuiz?.gifts]);

  const fetchData = React.useCallback(() => {
    if (isWorking || state.selectedQuiz.gifts !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.getEscapeQuizGift + state.selectedQuiz.id,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] == null) {
        props.setMode('list');
        return;
      }
      state.selectedQuiz.gifts = res[0];
      dispatch({selectedQuiz: state.selectedQuiz});
    });
  }, [isWorking, dispatch, state.selectedQuiz, props]);

  React.useEffect(() => {
    if (state.selectedQuiz === undefined) return;
    if (state.selectedQuiz.gifts === undefined) fetchData();
  }, [state.selectedQuiz, fetchData]);

  return (
    <CommonWebBox
      header={'جوایز'}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      {data !== undefined &&
        data.map((e, index) => {
          return (
            <PhoneView
              key={index}
              style={{...styles.gap50, ...styles.borderBottom1}}>
              <SimpleText text={'جایزه نفر ' + e.rank} />
              {e.typeFa !== undefined && (
                <>
                  <MyView>
                    <SimpleText text={e.typeFa} />
                    {e.amount !== undefined && (
                      <SimpleText text={'مقدار: ' + e.amount} />
                    )}
                    {e.description !== undefined && (
                      <SimpleText text={'جایزه: ' + e.description} />
                    )}
                  </MyView>
                  <CommonButton
                    title={'حذف'}
                    onPress={async () => {
                      props.setLoading(true);
                      let res = await generalRequest(
                        routes.removeEscapeQuizGift +
                          state.selectedQuiz.id +
                          '/' +
                          e.rank,
                        'delete',
                        undefined,
                        undefined,
                        props.token,
                      );
                      props.setLoading(false);
                      if (res != null) {
                        state.selectedQuiz.gifts = state.selectedQuiz.gifts.map(
                          ee => {
                            if (ee.rank === e.rank) {
                              return {rank: e.rank};
                            }
                            return ee;
                          },
                        );
                        dispatch({selectedQuiz: state.selectedQuiz});
                        showSuccess();
                      }
                    }}
                  />
                </>
              )}
              {e.typeFa === undefined && (
                <>
                  <SimpleText text={'تعیین نشده'} />
                  <CommonButton
                    title={'تعیین جایزه'}
                    theme={'dark'}
                    onPress={async () => {
                      dispatch({selectedRank: e.rank});
                      props.setMode('createGift');
                    }}
                  />
                </>
              )}
            </PhoneView>
          );
        })}
    </CommonWebBox>
  );
}

export default List;
