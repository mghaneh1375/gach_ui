import React, {useState} from 'react';
import {
  basketBox,
  styleFontSize13,
  styleFontSize15,
} from '../../screens/panel/package/card/Style';
import {getDevice} from '../../services/Utility';
import {
  CommonButton,
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
  const isInPhone = getDevice().indexOf('WebPort') !== -1;
  const [width, setWidth] = useState(
    isInPhone ? 'calc(100% - 20px)' : vars.BASKET_WIDTH_WITH_OPEN_MENU,
  );

  React.useEffect(() => {
    if (props.fullWidth === undefined) return;
    if (props.fullWidth) setWidth(vars.BASKET_WIDTH_WITH_CLOSE_MENU);
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
            {props.onBackClick !== undefined &&
              props.backBtnTitle !== undefined && (
                <CommonButton
                  title={props.backBtnTitle}
                  onPress={() => props.onBackClick()}
                />
              )}
            {(props.total !== undefined || props.label !== undefined) && (
              <SimpleText
                style={{
                  ...styles.dark_blue_color,
                  ...styles.fontSize17,
                  ...styles.bold,
                }}
                text={
                  props.label === undefined
                    ? commonTranslator.counter + ' ' + commonTranslator.quiz
                    : commonTranslator.counter + ' ' + props.label
                }
              />
            )}
            {props.total !== undefined && (
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
            )}
          </PhoneView>
          {props.total !== undefined && props.total > 0 && (
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
          {props.total === undefined && props.calculation !== undefined && (
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
                  props.label === undefined
                    ? commonTranslator.haveQuiz
                    : props.label + '  *  ' + props.calculation
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
