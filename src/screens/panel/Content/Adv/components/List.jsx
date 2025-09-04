import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {CommonWebBox, MyView, PhoneView} from '@/styles';
import {styles} from '@/styles/common/styles';
import {contentContext, dispatchContentContext} from '../../components/Context';
import Translator from '../../translate';
import Card from './Card';
import {getAll} from './utility';
function List(props) {
  const useGlobalState = () => [
    React.useContext(contentContext),
    React.useContext(dispatchContentContext),
  ];
  const [state, dispatch] = useGlobalState();
  const fetchData = React.useCallback(() => {
    if (state.allAdv !== undefined) return;
    props.setLoading(true);
    Promise.all([getAll(props.token)]).then(res => {
      props.setLoading(false);
      if (res[0] === null) {
        props.navigate('/');
        return;
      }
      dispatch({
        allAdv: res[0],
      });
    });
  }, [props, dispatch, state.allAdv]);
  useEffectOnce(() => {
    fetchData();
  });
  const [videoForShow, setVideoForShow] = useState();
  return (
    <MyView>
      <CommonWebBox
        header={Translator.manageAdv}
        backBtn={videoForShow === undefined ? undefined : true}
        onBackClick={() =>
          videoForShow === undefined ? undefined : setVideoForShow(undefined)
        }
        addBtn={videoForShow === undefined ? true : undefined}
        onAddClick={() =>
          videoForShow === undefined ? props.setMode('create') : undefined
        }
      />
      {videoForShow !== undefined && (
        <CommonWebBox>
          <video controls src={videoForShow} />
        </CommonWebBox>
      )}
      {videoForShow === undefined && (
        <PhoneView style={styles.gap10}>
          {state.allAdv !== undefined &&
            state.allAdv.map((elem, index) => {
              return (
                <Card
                  onUpdate={res => {
                    const tmp = state.allAdv.map(itr => {
                      if (itr.id !== elem.id) return itr;
                      return res;
                    });
                    dispatch({
                      allAdv: tmp,
                    });
                  }}
                  onDelete={() => {
                    const tmp = state.allAdv.filter(itr => {
                      return itr.id !== elem.id;
                    });
                    dispatch({
                      allAdv: tmp,
                    });
                  }}
                  setVideoForShow={setVideoForShow}
                  token={props.token}
                  setLoading={props.setLoading}
                  elem={elem}
                  key={index}
                />
              );
            })}
        </PhoneView>
      )}
    </MyView>
  );
}
export default List;
