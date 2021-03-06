import {Col} from 'react-grid-system';
import {View} from 'react-native';
import {EqualTwoTextInputs, PhoneView} from '../../../../../styles/Common';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../../Translator';
import commonTranslator from '../../../../../tranlates/Common';

const QuizGeneralInfo = props => {
  const kindKeyVals = [
    {item: 'تستی', id: 'test'},
    {item: 'تشریحی', id: 'tashrihi'},
  ];

  const changeInput = (label, text) => {
    if (label === 'name') props.setName(text);
    else if (label === 'desc') props.setDesc(text);
  };

  return (
    <View>
      <PhoneView>
        <Col lg={6}>
          <EqualTwoTextInputs style={{marginLeft: 20}}>
            <JustBottomBorderTextInput
              placeholder={translator.name}
              onChangeText={e => changeInput('name', e)}
              value={props.name}
              isHalf={true}
              subText={commonTranslator.necessaryField}
            />
            <JustBottomBorderSelect
              isHalf={true}
              value={
                props.kind === undefined
                  ? {}
                  : kindKeyVals.filter(element => {
                      return element.id === props.kind;
                    })[0]
              }
              placeholder={translator.kind}
              setter={props.setKind}
              values={kindKeyVals}
            />
          </EqualTwoTextInputs>
        </Col>
        <Col lg={6}>
          <JustBottomBorderTextInput
            style={{marginTop: 20}}
            placeholder={translator.tag}
            subText={commonTranslator.optional}
          />
        </Col>
      </PhoneView>

      <PhoneView
        style={{marginTop: 20, marginRight: 10, flexDirection: 'column'}}>
        <JustBottomBorderTextInput
          placeholder={commonTranslator.desc}
          subText={commonTranslator.optional}
          value={props.desc}
          onChangeText={e => changeInput('desc', e)}
          multiline={true}
        />
      </PhoneView>
    </View>
  );
};

export default QuizGeneralInfo;
