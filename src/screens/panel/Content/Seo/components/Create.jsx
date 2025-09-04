import {CommonWebBox} from '@/styles';
import Translator from '../../translate';
import Card from './Card.jsx';
import {
  contentContext,
  dispatchContentContext,
} from '../../components/Context.jsx';
import React from 'react';
function Create(props) {
  const useGlobalState = () => [
    React.useContext(contentContext),
    React.useContext(dispatchContentContext),
  ];
  const [state, dispatch] = useGlobalState();
  return (
    <CommonWebBox
      header={Translator.manageSeo}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <Card
        token={props.token}
        setLoading={props.setLoading}
        onAdd={data => {
          const tmp = state.allSeo;
          tmp.push(data);
          dispatch({
            allSeo: tmp,
          });
          props.setMode('list');
        }}
        id={props.packageId}
        elem={undefined}
      />
    </CommonWebBox>
  );
}
export default Create;
