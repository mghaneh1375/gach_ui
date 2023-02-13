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

function StudentCard(props) {
  const isInPhone = false;
  const [isSelected, setIsSelected] = useState(
    props.elem.correctorId !== undefined &&
      props.elem.correctorId === props.correctorId,
  );

  const isMyTask =
    props.elem.correctorId !== undefined &&
    props.elem.correctorId === props.correctorId;

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
            text={'نام و نام خانوادگی :' + ' ' + props.elem.student.name}
          />
        </MyView>
        <MyView style={{marginTop: -10, ...styles.gap5}}>
          <SimpleText
            style={{...styles.colorDarkBlue}}
            text={'مدرسه : ' + ' ' + props.elem.student.school}
          />
          <SimpleText
            style={{...styles.colorDarkBlue}}
            text={'شهر : ' + ' ' + props.elem.student.city}
          />
          <SimpleText
            style={{...styles.colorDarkBlue}}
            text={'پایه : ' + ' ' + props.elem.student.grade}
          />
          {props.elem.student.field !== undefined &&
            props.elem.student.field !== '' && (
              <SimpleText
                style={{...styles.colorDarkBlue}}
                text={'رشته : ' + ' ' + props.elem.student.field}
              />
            )}
          <SimpleText
            style={{...styles.colorDarkBlue}}
            text={
              props.elem.student.allMarked
                ? 'وضعیت : تصحیح شده'
                : 'وضعیت : تصحیح نشده'
            }
          />
          {props.onPress !== undefined && (
            <SimpleText
              style={{...styles.colorDarkBlue}}
              text={
                props.elem.corrector !== undefined
                  ? 'مصحح فعلی : ' + props.elem.corrector
                  : 'مصحح فعلی : تعیین نشده'
              }
            />
          )}
          <EqualTwoTextInputs>
            {(isMyTask || props.onPress === undefined) && (
              <CommonButton
                theme="transparent"
                onPress={() => props.showAnswerSheet()}
                title="مشاهده پاسخ برگ"
              />
            )}
            {!isMyTask && <></>}
            {props.onPress !== undefined && (
              <CommonButton
                onPress={() => {
                  props.onPress(!isSelected);
                  setIsSelected(!isSelected);
                }}
                theme={isSelected ? 'dark' : undefined}
                title={isSelected ? 'انتخاب شده' : 'انتخاب'}
              />
            )}
          </EqualTwoTextInputs>
        </MyView>
      </MyView>
    </CommonWebBox>
  );
}

export default StudentCard;
