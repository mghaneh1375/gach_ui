import React, {useState} from 'react';
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
    if (state.allAdv !== undefined) return;

    props.setLoading(true);
    Promise.all([getAll(props.token)]).then(res => {
      props.setLoading(false);
      if (res[0] === null) {
        props.navigate('/');
        return;
      }
      dispatch({allAdv: res[0]});
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
          <video controls src={videoForShow}></video>
        </CommonWebBox>
      )}
      {videoForShow === undefined && (
        <PhoneView style={styles.gap10}>
          {state.allAdv !== undefined &&
            state.allAdv.map((elem, index) => {
              return (
                <Card
                  onUpdate={res => {
                    let tmp = state.allAdv.map(itr => {
                      if (itr.id !== elem.id) return itr;
                      return res;
                    });
                    dispatch({allAdv: tmp});
                  }}
                  onDelete={() => {
                    let tmp = state.allAdv.filter(itr => {
                      return itr.id !== elem.id;
                    });
                    dispatch({allAdv: tmp});
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
