import {CommonButton, PhoneView} from '@/styles';
import {LargePopUp} from '../../../../../styles/common/PopUp';
import {contentContext} from '../Context';
import React, {useState} from 'react';
import Translator from '../../translate';
import Video from '../../../Video';
function Ops(props) {
  const useGlobalState = () => [React.useContext(contentContext)];
  const [state] = useGlobalState();
  const [showPreview, setShowPreview] = useState(false);
  return (
    <LargePopUp
      title={state.selectedContent.title}
      toggleShowPopUp={() =>
        showPreview ? setShowPreview(false) : props.toggleShowPopUp()
      }>
      {!showPreview && (
        <PhoneView>
          <CommonButton
            onPress={() => props.setMode('updateSession')}
            dir={'rtl'}
            theme={'transparent'}
            title={Translator.seeInfo}
          />
          {props.isAdmin && (
            <CommonButton
              dir={'rtl'}
              theme={'transparent'}
              onPress={() => props.setMode('sessionStudent')}
              title={Translator.users}
            />
          )}

          <CommonButton
            dir={'rtl'}
            theme={'transparent'}
            onPress={() => props.setMode('attaches')}
            title={Translator.attaches}
          />
          {state.selectedSession.hls !== undefined && (
            <CommonButton
              dir={'rtl'}
              theme={'transparent'}
              onPress={() => setShowPreview(true)}
              title={Translator.preview}
            />
          )}
        </PhoneView>
      )}
      {showPreview && <Video src={state.selectedSession.hls} />}
    </LargePopUp>
  );
}
export default Ops;
