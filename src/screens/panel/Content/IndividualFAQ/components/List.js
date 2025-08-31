import React from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {CommonWebBox, MyView, PhoneView} from '../../../../../styles/Common';
import {styles} from '../../../../../styles/Common/Styles';
import {contentContext, dispatchContentContext} from '../../Components/Context';
import Translator from '../../Translate';
import Card from './Card';
import {getAll} from './Utility';

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

      dispatch({allFaq: res[0].data});
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
                let tmp = state.allFaq.map(itr => {
                  if (itr.id !== elem.id) return itr;
                  return res;
                });
                dispatch({allFaq: tmp});
              }}
              onDelete={() => {
                let tmp = state.allFaq.filter(itr => {
                  return itr.id !== elem.id;
                });
                dispatch({allFaq: tmp});
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
