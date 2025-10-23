import {getDevice} from '@/services/utility';
import {useEffect, useMemo, useState} from 'react';
import {
  basketBox,
  styleFontSize13,
  styleFontSize15,
} from '../../screens/panel/package/card/style';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../styles/CommonComponents.jsx';
import {styles} from '../../styles/common/styles';
import vars from '../../styles/root';
import commonTranslator from '../../translator/common';
import {useTheme} from 'styled-components';
function Basket(props) {
  const isInPhone = useMemo(() => {
    return getDevice().indexOf('WebPort') !== -1;
  }, []);

  const [width, setWidth] = useState(
    isInPhone ? 'calc(100% - 20px)' : vars.BASKET_WIDTH_WITH_OPEN_MENU,
  );

  useEffect(() => {
    if (props.fullWidth === undefined) return;
    if (props.fullWidth) setWidth(vars.BASKET_WIDTH_WITH_CLOSE_MENU);
    else setWidth(vars.BASKET_WIDTH_WITH_OPEN_MENU);
  }, [props.fullWidth]);

  const theme = useTheme();
  return (
    <CommonWebBox
      style={{
        ...basketBox,
        ...{
          width: width,
        },
        marginBottom: '5px',
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
            {props.disable && props.disableText && (
              <SimpleText
                style={{
                  ...styles.marginTop10,
                  ...styles.red,
                }}
                text={props.disableText}
              />
            )}

            {(props.total !== undefined || props.label !== undefined) && (
              <SimpleText
                style={{
                  ...styles.fontSize17,
                  ...styles.bold,
                  ...{
                    color: theme.colors.text,
                  },
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
                  ...{
                    color: theme.colors.text,
                  },
                  ...styleFontSize15,
                  ...styles.bold,
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
          {!props.total && props.calculation && (
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
                  ...{
                    color: theme.colors.text,
                  },
                  ...styles.bold,
                  ...styleFontSize15,
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
