import {CommonWebBox} from '@/styles';
import Translator from '../../translate';
import Card from './Card';
import {contentContext, dispatchContentContext} from '../../components/Context';
import React from 'react';
function Create(props) {
  const useGlobalState = () => [
    React.useContext(contentContext),
    React.useContext(dispatchContentContext),
  ];
  const [state, dispatch] = useGlobalState();
  return (
    <CommonWebBox
      header={Translator.manageAdv}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <Card
        token={props.token}
        setLoading={props.setLoading}
        onAdd={data => {
          const tmp = state.allAdv;
          tmp.push(data);
          dispatch({
            allAdv: tmp,
          });
          props.setMode('list');
        }}
        elem={undefined}
      />
    </CommonWebBox>
  );
}
export default Create;
