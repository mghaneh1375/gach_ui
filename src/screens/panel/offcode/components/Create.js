import {useState} from 'react';
import {View} from 'react-native';
import {routes} from '../../../../API/APIRoutes';
import ExcelComma from '../../../../components/web/ExcelCommaInput';
import {PhoneView} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderDatePicker from '../../../../styles/Common/JustBottomBorderDatePicker';
import translator from '../Translator';
import {Col} from 'react-grid-system';

const Create = props => {
  const [showExcelComma, setShowExcelComma] = useState(true);
  const [additionalData, setAdditionalData] = useState({});

  const afterAddingCallBack = () => {
    props.quiz.questions = undefined;
    props.update(props.quiz);
  };

  const changeText = (label, text) => {
    additionalData[label] = text;
  };

  const selectType = (index, element) => {};

  const typeKeyVals = [
    {name: translator.value, id: 'value'},
    {name: translator.percent, id: 'percent'},
  ];

  return (
    <View>
      {showExcelComma && (
        <ExcelComma
          header={translator.addOff}
          popUpHeader={translator.addOff}
          placeholder={translator.NIDs}
          help={translator.NIDHelp}
          setLoading={props.setLoading}
          token={props.token}
          url={routes.fetchAllOffs}
          uploadUrl={routes.fetchAllOffs}
          afterAddingCallBack={afterAddingCallBack}
          preChild={
            <PhoneView>
              <Col lg={6}>
                <PhoneView>
                  <JustBottomBorderTextInput
                    isHalf={true}
                    placeholder={translator.amount}
                    justNum={true}
                    onChangeText={e => changeText('amount', e)}
                    value={additionalData['amount']}
                  />
                  <JustBottomBorderSelect
                    isHalf={true}
                    placeholder={translator.type}
                    onSelect={selectType}
                    values={typeKeyVals}
                    value={
                      additionalData['type'] === undefined
                        ? ''
                        : additionalData['type'] === 'value'
                        ? translator.value
                        : translator.percent
                    }
                  />
                </PhoneView>
              </Col>
              <Col lg={6}></Col>
            </PhoneView>
          }
        />
      )}
    </View>
  );
};

export default Create;
