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
      header={Translator.manageSeo}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <Card
        token={props.token}
        setLoading={props.setLoading}
        onAdd={data => {
          let tmp = state.allSeo;
          tmp.push(data);
          dispatch({allSeo: tmp});
          props.setMode('list');
        }}
        id={props.packageId}
        elem={undefined}
      />
    </CommonWebBox>
  );
}

export default Create;
