import {View} from 'react-native';
import React, {useState} from 'react';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import commonTranslator from '../../../../tranlates/Common';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {levelKeyVals} from '../../ticket/components/KeyVals';
import {addAccess} from './Utility';
import MultiBox from '../../../../components/web/MultiBox/MultiBox';
import {useParams} from 'react-router';

function ChangeLevel(props) {
  const [newLevel, setNewLevel] = useState();
  const [accesses, setAccesses] = useState();

  React.useEffect(() => {
    if (props.user !== undefined)
      setAccesses(
        props.user.accesses.map(elem => {
          return {
            id: elem,
            title: levelKeyVals.find(level => level.id === elem).item,
          };
        }),
      );
    else setAccesses([]);
  }, [props.user]);

  const currLevel = useParams().level;

  const back = () => {
    if (accesses.find(elem => elem.id === currLevel) === undefined)
      props.removeFromList([props.user.id]);
    props.setMode('list');
  };

  return (
    <View>
      <CommonWebBox
        header={commonTranslator.changeLevel}
        backBtn={true}
        onBackClick={() => back()}>
        <PhoneView style={{margin: 10}}>
          <MultiBox
            setLoading={props.setLoading}
            token={props.token}
            userId={props.user.id}
            afterFunc={newAccesses => setAccesses(newAccesses)}
            items={accesses}
          />
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
                newAccesses => setAccesses(newAccesses),
              )
            }
            title={commonTranslator.confrim}
          />
        </PhoneView>
      </CommonWebBox>
    </View>
  );
}

export default ChangeLevel;
