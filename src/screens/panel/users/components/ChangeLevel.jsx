import {View} from 'react-native-web';
import {useState} from 'react';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import commonTranslator from '../../../../tranlates/Common';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {levelKeyVals} from '../../ticket/components/KeyVals';
import {addAccess} from './Utility';
import MultiBox from '../../../../components/web/MultiBox/MultiBox';

function ChangeLevel(props) {
  const [newLevel, setNewLevel] = useState();
  return (
    <View>
      <CommonWebBox
        header={commonTranslator.changeLevel}
        backBtn={true}
        onBackClick={() => props.setMode('list')}>
        <PhoneView style={{margin: 10}}>
          <MultiBox removeItem={props.removeItem} items={props.accesses} />
          <JustBottomBorderSelect
            isHalf={true}
            setter={setNewLevel}
            values={levelKeyVals}
            value={levelKeyVals.find(elem => elem.id === newLevel)}
            placeholder={commonTranslator.newLevel}
          />
        </PhoneView>
        <PhoneView style={{alignSelf: 'end'}}>
          <CommonButton
            onPress={() =>
              addAccess(
                props.setLoading,
                props.token,
                props.user.id,
                newLevel,
                () => {},
              )
            }
            title={commonTranslator.confrim}></CommonButton>
        </PhoneView>
      </CommonWebBox>
    </View>
  );
}

export default ChangeLevel;
