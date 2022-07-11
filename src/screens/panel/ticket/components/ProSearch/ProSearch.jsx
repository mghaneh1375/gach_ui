import React from 'react';
import commonTranslator from '../../../../../tranlates/Common';
// import RadioButtonYesOrNo from './RadioButtonYesOrNo/RadioButtonYesOrNo';
import {View} from 'react-native';
import JustBottomBorderDatePicker from '../../../../../styles/Common/JustBottomBorderDatePicker';
import translator from '../../Translator';
import {startWithVals} from '../KeyVals';
import {
  PhoneView,
  CommonRadioButton,
  JustBottomBorderSelect,
  SimpleText,
} from '../../../../../styles/Common';

function ProSearch(props) {
  //   const [radioButtonYesOrNo, setRadioButtonYesOrNo] = useState();
  return (
    <>
      <View style={{zIndex: 11}}>
        <PhoneView>
          <JustBottomBorderDatePicker
            placeholder={translator.dateStartRequest}
            setter={props.setsenddateSolar}
            value={props.senddateSolar}
            isHalf={true}
          />
          <JustBottomBorderDatePicker
            placeholder={translator.dateEndRequest}
            setter={props.setsenddatesolarendlimit}
            value={props.senddatesolarendlimit}
            isHalf={true}
          />
          <JustBottomBorderSelect
            isHalf={true}
            setter={props.setstartwith}
            values={props.startwith}
            value={startWithVals.find(elem => elem.id === props.startwith)}
            placeholder={translator.startWith}
          />
        </PhoneView>
        <PhoneView style={{marginTop: 10}}>
          <JustBottomBorderDatePicker
            placeholder={translator.lastStartUpdate}
            setter={props.setanswersatesolar}
            value={props.answersateaolar}
            isHalf={true}
          />
          <JustBottomBorderDatePicker
            placeholder={translator.lastEndUpdate}
            setter={props.setanswerdatesolarendlimit}
            value={props.answerdatesolarendlimit}
            isHalf={true}
          />
          <View style={{marginTop: 10}}>
            <PhoneView>
              <SimpleText
                style={{
                  padding: 10,
                }}
                text={translator.SearchArchive}
              />
              <CommonRadioButton
                status={props.searcharchive === 'yes' ? 'checked' : 'unchecked'}
                onPress={() => props.setsearcharchive('yes')}
                text={commonTranslator.yes}
              />
              <CommonRadioButton
                status={props.searcharchive === 'no' ? 'checked' : 'unchecked'}
                onPress={() => props.setsearcharchive('no')}
                text={commonTranslator.no}
              />
            </PhoneView>
          </View>
        </PhoneView>
      </View>
    </>
  );
}

export default ProSearch;
