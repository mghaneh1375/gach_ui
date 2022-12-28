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
    if (state.allSeo !== undefined) return;

    props.setLoading(true);
    Promise.all([getAll(props.token, props.packageId)]).then(res => {
      props.setLoading(false);
      if (res[0] === null) {
        props.navigate('/');
        return;
      }
      dispatch({allSeo: res[0].data, allSeoId: res[0].id});
    });
  }, [props, dispatch, state.allSeo]);

  useEffectOnce(() => {
    fetchData();
  });

  return (
    <MyView>
      <CommonWebBox
        header={Translator.manageSeo}
        backBtn={props.onBackClick === undefined ? undefined : true}
        onBackClick={
          props.onBackClick === undefined ? undefined : props.onBackClick
        }
        addBtn={true}
        onAddClick={() => props.setMode('create')}
      />
      <PhoneView style={styles.gap10}>
        {state.allSeo !== undefined &&
          state.allSeoId !== undefined &&
          state.allSeo.map((elem, index) => {
            return (
              <Card
                onDelete={() => {
                  let tmp = state.allSeo.filter(itr => {
                    return itr.key !== elem.key;
                  });
                  dispatch({allSeo: tmp});
                }}
                id={state.allSeoId}
                token={props.token}
                setLoading={props.setLoading}
                elem={elem}
                key={index}
              />
            );
          })}
      </PhoneView>
    </MyView>
  );
}

export default List;
