import {CommonButton, PhoneView} from '../../../../../styles/Common';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import {contentContext} from '../Context';
import React from 'react';
import Translator from '../../Translate';

function Ops(props) {
  const useGlobalState = () => [React.useContext(contentContext)];

  const [state] = useGlobalState();

  return (
    <LargePopUp
      title={state.selectedContent.title}
      toggleShowPopUp={props.toggleShowPopUp}>
      <PhoneView>
        <CommonButton
          onPress={() => props.setMode('updateSession')}
          dir={'rtl'}
          theme={'transparent'}
          title={Translator.seeInfo}
        />

        <CommonButton
          dir={'rtl'}
          theme={'transparent'}
          onPress={() => props.setMode('sessionStudent')}
          title={Translator.users}
        />
        <CommonButton
          dir={'rtl'}
          theme={'transparent'}
          onPress={() => props.setMode('attaches')}
          title={Translator.attaches}
        />
      </PhoneView>
    </LargePopUp>
  );
}

export default Ops;
