import {CommonWebBox} from '../../../../../styles/Common';
import Translator from '../../Translate';
import Card from './Card';
import {contentContext, dispatchContentContext} from '../../Components/Context';
import React from 'react';

function Create(props) {
  const useGlobalState = () => [
    React.useContext(contentContext),
    React.useContext(dispatchContentContext),
  ];

  const [state, dispatch] = useGlobalState();

  return (
    <CommonWebBox
      header={Translator.manageFAQ}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <Card
        token={props.token}
        setLoading={props.setLoading}
        onAdd={data => {
          let tmp = state.allAdv;
          tmp.push(data);
          dispatch({allAdv: tmp});
          props.setMode('list');
        }}
        elem={undefined}
      />
    </CommonWebBox>
  );
}

export default Create;
