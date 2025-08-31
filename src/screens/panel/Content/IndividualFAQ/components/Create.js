import {CommonWebBox} from '../../../../../styles/Common';
import Translator from '../../Translate';
import {contentContext, dispatchContentContext} from '../../Components/Context';
import React from 'react';
import Card from './Card';

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
          let tmp = state.allFaq;
          tmp.push(data);
          dispatch({allFaq: tmp});
          props.setMode('list');
        }}
        id={props.packageId}
        elem={undefined}
      />
    </CommonWebBox>
  );
}

export default Create;
