import {View} from 'react-native-web';
import {useState} from 'react';
import {CommonButton, PhoneView} from '../../../../styles/Common';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import commonTranslator from '../../../../tranlates/Common';
import RemovePane from '../../../../components/web/RemovePane';
import {routes} from '../../../../API/APIRoutes';

const Ops = props => {
  const changeMode = newMode => {
    props.setMode(newMode);
  };

  const [showRemovePane, setShowRemovePane] = useState(false);

  const toggleShowRemovePane = () => {
    setShowRemovePane(!showRemovePane);
  };

  const afterRemove = res => {
    setShowRemovePane(false);
    props.removeOffs([props.off.id]);
    props.setMode('list');
    props.toggleShowPopUp();
  };

  return (
    <View style={{zIndex: 10}}>
      {showRemovePane && (
        <RemovePane
          setLoading={props.setLoading}
          token={props.token}
          url={routes.removeOffs}
          data={{ids: [props.off.id]}}
          afterRemoveFunc={afterRemove}
          toggleShowPopUp={toggleShowRemovePane}
        />
      )}
      {!showRemovePane && (
        <LargePopUp
          title={commonTranslator.opMenu}
          toggleShowPopUp={props.toggleShowPopUp}>
          <PhoneView style={{flexWrap: 'wrap'}}>
            <CommonButton
              onPress={() => changeMode('update')}
              dir={'rtl'}
              theme={'transparent'}
              title={commonTranslator.edit}
            />
            <CommonButton
              dir={'rtl'}
              onPress={() => toggleShowRemovePane()}
              theme={'transparent'}
              title={commonTranslator.delete}
            />
          </PhoneView>
        </LargePopUp>
      )}
    </View>
  );
};

export default Ops;
