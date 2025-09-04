import React from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {CommonWebBox, MyView, PhoneView} from '@/styles';
import {styles} from '@/styles/common/styles';
import {
  contentContext,
  dispatchContentContext,
} from '../../components/Context.jsx';
import Translator from '../../translate';
import Card from './Card.jsx';
import {getAll} from './utility';
function List(props) {
  const useGlobalState = () => [
    React.useContext(contentContext),
    React.useContext(dispatchContentContext),
  ];
  const [state, dispatch] = useGlobalState();
  const fetchData = React.useCallback(() => {
    if (state.allFaq !== undefined) return;
    props.setLoading(true);
    Promise.all([getAll(props.token, props.packageId)]).then(res => {
      props.setLoading(false);
      if (res[0] === null) {
        props.navigate('/');
        return;
      }
      dispatch({
        allFaq: res[0].data,
      });
    });
  }, [props, dispatch, state.allFaq]);
  useEffectOnce(() => {
    fetchData();
  });
  return (
    <MyView>
      <CommonWebBox
        header={Translator.manageFAQ}
        backBtn={props.onBackClick === undefined ? undefined : true}
        onBackClick={
          props.onBackClick === undefined ? undefined : props.onBackClick
        }
        addBtn={true}
        onAddClick={() => props.setMode('create')}
      />
      <PhoneView style={styles.gap10}>
        {state.allFaq &&
          state.allFaq.map((elem, index) => (
            <Card
              onUpdate={res => {
                const tmp = state.allFaq.map(itr => {
                  if (itr.id !== elem.id) return itr;
                  return res;
                });
                dispatch({
                  allFaq: tmp,
                });
              }}
              onDelete={() => {
                const tmp = state.allFaq.filter(itr => {
                  return itr.id !== elem.id;
                });
                dispatch({
                  allFaq: tmp,
                });
              }}
              id={props.packageId}
              token={props.token}
              setLoading={props.setLoading}
              elem={elem}
              key={index}
            />
          ))}
      </PhoneView>
    </MyView>
  );
}
export default List;
