import React, {useState} from 'react';
import {
  CommonButton,
  PhoneView,
  MyView,
  SimpleText,
} from '../../../../../styles/Common';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import translator from '../../Translator';
import commonTranslator from '../../../../../tranlates/Common';
import {
  allTypeKeyVals,
  filter,
  usedKeyVals,
  allWithCodeKeyVals,
  expiredKeyVals,
} from '../Utility';
import {allTrueFalseValues} from '../../../../../services/Utility';
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../../../../styles/Common/Styles';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import JustBottomBorderDatePicker from '../../../../../styles/Common/JustBottomBorderDatePicker';

const Filter = props => {
  const [used, setUsed] = useState();
  const [type, setType] = useState();
  const [withCode, setWithCode] = useState();
  const [isPublic, setIsPublic] = useState();
  const [createdAt, setCreatedAt] = useState();
  const [expiredAt, setExpiredAt] = useState();
  const [createdAtEndLimit, setCreatedAtEndLimit] = useState();
  const [expiredAtEndLimit, setExpiredAtEndLimit] = useState();
  const [showProSearch, setShowProSearch] = useState(false);
  const [wantedIcon, setWantedIcon] = useState(faAngleDoubleDown);
  const [hasExpired, setHasExpired] = useState(false);

  const toggleShowProSearch = () => {
    if (showProSearch) setWantedIcon(faAngleDoubleDown);
    else setWantedIcon(faAngleDoubleUp);
    setShowProSearch(!showProSearch);
  };

  return (
    <MyView>
      <PhoneView style={{gap: 15}}>
        <JustBottomBorderSelect
          setter={setUsed}
          values={usedKeyVals}
          value={usedKeyVals.find(elem => elem.id === used)}
          placeholder={translator.usedAndNotUsed}
          subText={translator.used}
        />
        <JustBottomBorderSelect
          setter={setType}
          values={allTypeKeyVals}
          value={allTypeKeyVals.find(elem => elem.id === type)}
          placeholder={translator.type}
          subText={translator.type}
        />
        <JustBottomBorderSelect
          setter={setIsPublic}
          values={allTrueFalseValues}
          value={allTrueFalseValues.find(elem => elem.id === isPublic)}
          placeholder={translator.isPublicFilter}
          subText={translator.isPublicFilter}
        />
        <CommonButton
          onPress={() =>
            filter(
              props,
              used,
              type,
              isPublic,
              withCode,
              hasExpired,
              createdAt,
              createdAtEndLimit,
              expiredAt,
              expiredAtEndLimit,
            )
          }
          title={commonTranslator.show}
          style={{alignSelf: 'flex-start'}}
        />
      </PhoneView>
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
      {showProSearch && (
        <MyView>
          <PhoneView style={{...styles.gap15}}>
            <JustBottomBorderSelect
              setter={setWithCode}
              values={allWithCodeKeyVals}
              value={allWithCodeKeyVals.find(elem => elem.id === withCode)}
              placeholder={translator.withOrWithOutCode}
              subText={translator.withOrWithOutCode}
            />
            <JustBottomBorderSelect
              setter={setHasExpired}
              values={expiredKeyVals}
              value={expiredKeyVals.find(elem => elem.id === hasExpired)}
              placeholder={translator.expired}
              subText={translator.expired}
            />
            <JustBottomBorderDatePicker
              placeholder={translator.startOffCode}
              subText={translator.startOffCode}
              setter={setExpiredAt}
              value={expiredAt}
            />
            <JustBottomBorderDatePicker
              placeholder={translator.endOffCode}
              subText={translator.endOffCode}
              setter={setExpiredAtEndLimit}
              value={expiredAtEndLimit}
            />
          </PhoneView>
        </MyView>
      )}
    </MyView>
  );
};

export default Filter;
