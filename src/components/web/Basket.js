import React, {useState} from 'react';
import {
  basketBox,
  styleFontSize13,
  styleFontSize15,
} from '../../screens/panel/package/card/Style';
import {
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../styles/Common';
import {styles} from '../../styles/Common/Styles';
import vars from '../../styles/root';

import commonTranslator from '../../translator/Common';

function Basket(props) {
  const [width, setWidth] = useState(vars.BASKET_WIDTH_WITH_OPEN_MENU);

  React.useEffect(() => {
    if (props.fullWidth === undefined) return;
    if (props.fullWidth) setWidth(vars.LEFT_SECTION_WIDTH);
    else setWidth(vars.BASKET_WIDTH_WITH_OPEN_MENU);
  }, [props.fullWidth]);

  return (
    <CommonWebBox
      style={{
        ...basketBox,
        ...{width: width},
      }}>
      <EqualTwoTextInputs>
        <MyView>
          <PhoneView>
            <SimpleText
              style={{
                ...styles.dark_blue_color,
                ...styles.fontSize17,
                ...styles.bold,
              }}
              text={commonTranslator.counter + ' ' + commonTranslator.quiz}
            />
            <SimpleText
              onPress={() => props.selectAll()}
              style={{
                ...{
                  marginTop: 5,
                  marginRight: 5,
                },
                ...styles.yellow_color,
                ...styleFontSize13,
                ...styles.cursor_pointer,
                ...styles.bold,
              }}
              text={commonTranslator.selectAll}
            />
          </PhoneView>
          {props.total > 0 && (
            <PhoneView>
              <SimpleText
                style={{
                  ...styles.yellow_color,
                  ...styleFontSize15,
                  ...styles.bold,
                }}
                text={' ' + props.selectedLength}
              />
              <SimpleText
                style={{
                  ...styles.dark_blue_color,
                  ...styleFontSize15,
                  ...styles.BlueBold,
                }}
                text={
                  commonTranslator.from +
                  props.total +
                  ' ' +
                  commonTranslator.haveQuiz
                }
              />
            </PhoneView>
          )}
        </MyView>
        {props.children}
      </EqualTwoTextInputs>
    </CommonWebBox>
  );
}

export default Basket;
