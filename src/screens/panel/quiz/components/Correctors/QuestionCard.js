import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  SimpleText,
} from '../../../../../styles/Common';
import {styles} from '../../../../../styles/Common/Styles';
import vars from '../../../../../styles/root';
import {levelKeyVals} from '../../../question/components/KeyVals';

function QuestionCard(props) {
  const isInPhone = false;
  const [isSelected, setIsSelected] = useState(
    props.elem.correctorId !== undefined &&
      props.elem.correctorId === props.correctorId,
  );

  return (
    <CommonWebBox width={isInPhone ? 320 : 390}>
      <MyView style={{...styles.gap15}}>
        <MyView
          style={{
            ...styles.justifyContentCenter,
            ...styles.paddingRight15,
            backgroundColor: vars.YELLOW_WHITE,
            borderRadius: 5,
            height: 40,
            marginRight: 0,
          }}>
          <SimpleText
            style={{...styles.BlueBold, ...styles.fontSize15}}
            text={'کد سازمانی :' + props.elem.organizationId}
          />
        </MyView>
        <MyView style={{marginTop: -10, ...styles.gap5}}>
          <SimpleText
            style={{...styles.BlueBold, ...styles.fontSize15}}
            text={'نمره :' + props.elem.mark}
          />
          <SimpleText
            style={{...styles.BlueBold, ...styles.fontSize15}}
            text={'شماره سوال :' + props.elem.no}
          />
          <SimpleText
            style={{...styles.BlueBold, ...styles.fontSize15}}
            text={
              'سطح سختی :' +
              ' ' +
              levelKeyVals.find(elem => elem.id === props.elem.level).item
            }
          />
          <SimpleText
            style={{...styles.BlueBold, ...styles.fontSize15}}
            text={'طراح :' + props.elem.author}
          />
          <SimpleText
            style={{...styles.colorDarkBlue}}
            text={
              'وضعیت تصحیح: ' + props.elem.allMarked + ' / ' + props.elem.total
            }
          />
          <SimpleText
            style={{...styles.colorDarkBlue}}
            text={
              props.elem.corrector !== undefined
                ? 'مصحح فعلی : ' + props.elem.corrector
                : 'مصحح فعلی : تعیین نشده'
            }
          />
          <EqualTwoTextInputs>
            {props.isMyTask && (
              <CommonButton
                theme="transparent"
                onPress={() => props.showAnswerSheet()}
                title="مشاهده پاسخ برگ"
              />
            )}
            <CommonButton
              onPress={() => {
                props.onPress(!isSelected);
                setIsSelected(!isSelected);
              }}
              theme={isSelected ? 'dark' : undefined}
              title={isSelected ? 'انتخاب شده' : 'انتخاب'}
            />
          </EqualTwoTextInputs>
        </MyView>
      </MyView>
    </CommonWebBox>
  );
}

export default QuestionCard;
