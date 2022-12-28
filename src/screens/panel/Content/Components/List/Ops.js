import React from 'react';
import {CommonButton, PhoneView} from '../../../../../styles/Common';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import Translator from '../../Translate';
import {contentContext, dispatchContentContext} from '../Context';
import commonTranslator from '../../../../../translator/Common';
import {videoGeneralRequest} from '../../../../../API/Utility';
import {routes} from '../../../../../API/APIRoutes';
import {showSuccess} from '../../../../../services/Utility';

function Ops(props) {
  const toggleVisibility = () => {
    props.setLoading(true);
    Promise.all([
      videoGeneralRequest(
        routes.changeVisibility + state.selectedContent.id,
        'put',
        {
          visibility: !state.selectedContent.visibility,
        },
        undefined,
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] !== null) {
        showSuccess();
        state.selectedContent.visibility = !state.selectedContent.visibility;
        dispatch({selectedContent: state.selectedContent, needUpdate: true});
      }
    });
  };

  const useGlobalState = () => [
    React.useContext(contentContext),
    React.useContext(dispatchContentContext),
  ];

  const [state, dispatch] = useGlobalState();

  return (
    <LargePopUp
      title={state.selectedContent.title}
      toggleShowPopUp={props.toggleShowPopUp}>
      <PhoneView>
        <CommonButton
          onPress={() => props.setMode('update')}
          dir={'rtl'}
          theme={'transparent'}
          title={Translator.seeInfo}
        />
        <CommonButton
          dir={'rtl'}
          theme={'transparent'}
          onPress={() => toggleVisibility()}
          title={
            state.selectedContent.visibility
              ? commonTranslator.toHide
              : commonTranslator.toShow
          }
        />
        <CommonButton
          dir={'rtl'}
          theme={'transparent'}
          onPress={() => props.setMode('studentsList')}
          title={Translator.users}
        />
        <CommonButton
          dir={'rtl'}
          theme={'transparent'}
          onPress={() => props.setSelectedContentId(state.selectedContent.id)}
          title={Translator.manageSeo}
        />
        <CommonButton
          dir={'rtl'}
          theme={'transparent'}
          onPress={() => props.setMode('sessions')}
          title={Translator.sessions}
        />
      </PhoneView>
    </LargePopUp>
  );
}

export default Ops;
