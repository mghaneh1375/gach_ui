import {
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../../../styles/Common/JustBottomBorderTextInput';
import commonTranslator from '../../../../../../tranlates/Common';
import Translate from '../../../Translate';
import React, {useState} from 'react';
import {View} from 'react-native';
import {TextIcon} from '../../../../../../styles/Common/TextIcon';
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {convertTimestamp} from '../../../../../../services/Utility';
import {FontIcon} from '../../../../../../styles/Common/FontIcon';

function List(props) {
  return (
    <CommonWebBox header={commonTranslator.configuration}>
      <JustBottomBorderTextInput
        subText={Translate.maxCut}
        placeholder={Translate.maxCut}
        justNum={true}
        // onChangeText={text => setMaxCut(text)}
        value={props.data.maxWebGiftSlot}
        isHalf={true}
      />
      <PhoneView style={{marginTop: 25, gap: 10}}>
        <SimpleText text={Translate.launchDates} />
        <View>
          {props.data.webGiftDays !== undefined &&
            props.data.webGiftDays.map((elem, index) => {
              return (
                <TextIcon
                  theme={'rect'}
                  icon={faTrash}
                  key={index}
                  text={convertTimestamp(elem)}
                />
              );
            })}
        </View>
        <FontIcon
          parentStyle={{alignSelf: 'flex-start'}}
          theme={'rect'}
          kind={'normal'}
          back={'yellow'}
          icon={faPlus}
        />
      </PhoneView>
    </CommonWebBox>
  );
}

export default List;
