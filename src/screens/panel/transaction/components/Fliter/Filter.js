import React, {useState} from 'react';
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {
  CommonButton,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import {MyView} from '../../../../../styles/Common';
import {FontIcon, SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../../../ticket/Translator';
import commonTranslator from '../../../../../translator/Common';
import {
  sectionKeyVals,
  usedOffKeyVals,
} from '../../../offcode/components/Utility';
import Translate from '../../Translate';
import {styles} from '../../../../../styles/Common/Styles';
import JustBottomBorderDatePicker from '../../../../../styles/Common/JustBottomBorderDatePicker';
import {getTransactions} from '../Utility';

function Filter(props) {
  const [section, setSection] = useState();
  const [usedOff, setUsedOff] = useState();
  const [createdAt, setCreatedAt] = useState();
  const [createdAtEndLimit, setCreatedAtEndLimit] = useState();
  const [showProSearch, setShowProSearch] = useState(false);
  const [wantedIcon, setWantedIcon] = useState(faAngleDoubleDown);

  const toggleShowProSearch = () => {
    if (showProSearch) setWantedIcon(faAngleDoubleDown);
    else setWantedIcon(faAngleDoubleUp);
    setShowProSearch(!showProSearch);
  };

  const doFilter = async () => {
    props.setLoading(true);
    let res = await getTransactions(
      props.token,
      undefined,
      createdAt,
      createdAtEndLimit,
      usedOff,
      section,
    );
    props.setLoading(false);
    if (res !== null) props.setTransactions(res);
  };

  return (
    <MyView>
      <PhoneView style={{...styles.gap15}}>
        <PhoneView style={{...styles.gap15}}>
          <JustBottomBorderTextInput
            placeholder={translator.nameOfReciver}
            subText={translator.nameOfReciver}
          />
          <FontIcon
            parentStyle={{marginTop: 6}}
            kind={'normal'}
            theme={'rect'}
            back={'yellow'}
            icon={faPlus}
          />
        </PhoneView>
        <JustBottomBorderSelect
          setter={setSection}
          values={sectionKeyVals}
          value={sectionKeyVals.find(elem => elem.id === section)}
          placeholder={commonTranslator.section}
          subText={commonTranslator.section}
        />
        <CommonButton
          onPress={() => doFilter()}
          title={commonTranslator.show}
          style={{alignSelf: 'flex-start'}}
        />
      </PhoneView>
      <MyView>
        <PhoneView>
          <SimpleText
            onPress={() => toggleShowProSearch()}
            style={{
              paddingTop: 15,
              paddingrRight: 15,
              paddingBottom: 15,
              cursor: 'pointer',
              ...styles.dark_blue_color,
            }}
            text={commonTranslator.advancedSearch}
          />
          <PhoneView
            style={{
              width: 20,
              height: 20,
              alignSelf: 'center',
            }}>
            <SimpleFontIcon
              onPress={() => toggleShowProSearch()}
              style={{
                ...styles.dark_blue_color,
              }}
              icon={wantedIcon}
            />
          </PhoneView>
        </PhoneView>
      </MyView>
      {showProSearch && (
        <PhoneView style={{...styles.gap15}}>
          <JustBottomBorderSelect
            setter={setUsedOff}
            values={usedOffKeyVals}
            value={usedOffKeyVals.find(elem => elem.id === usedOff)}
            placeholder={Translate.useOffCode}
            subText={Translate.useOffCode}
          />
          <JustBottomBorderDatePicker
            placeholder={Translate.createdAt}
            subText={Translate.createdAt}
            setter={setCreatedAt}
            value={createdAt}
          />
          <JustBottomBorderDatePicker
            placeholder={Translate.createdAtEndLimit}
            subText={Translate.createdAtEndLimit}
            setter={setCreatedAtEndLimit}
            value={createdAtEndLimit}
          />
        </PhoneView>
      )}
    </MyView>
  );
}

export default Filter;
