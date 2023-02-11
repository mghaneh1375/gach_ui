import React, {useState} from 'react';
import {Image} from 'react-native';
import Circle from '../../../../../components/web/Circle';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  SimpleText,
} from '../../../../../styles/Common';
import {styles} from '../../../../../styles/Common/Styles';
import vars from '../../../../../styles/root';

function StudentCard(props) {
  const isInPhone = false;

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
          <SimpleText
            style={{...styles.colorDarkBlue}}
            text={
              props.elem.student.corrector !== undefined
                ? 'مصحح فعلی : ' + props.elem.student.corrector
                : 'مصحح فعلی : تعیین نشده'
            }
          />
          <CommonButton title="انتخاب" />
        </MyView>
      </MyView>
    </CommonWebBox>
  );
}

export default StudentCard;
