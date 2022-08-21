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

import commonTranslator from '../../tranlates/Common';

function Basket(props) {
  const [width, setWidth] = useState('calc(100% - 240px)');

  React.useEffect(() => {
    if (props.fullWidth === undefined) return;
    if (props.fullWidth) setWidth('calc(100% - 40px)');
    else setWidth('calc(100% - 240px)');
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
                ...{fontWeight: 600},
                ...styles.dark_blue_color,
                ...styles.fontSize17,
              }}
              text={'تعداد آزمون'}
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
                }}
                text={props.selectedLength}
              />
              <SimpleText
                style={{
                  ...styles.dark_blue_color,
                  ...styleFontSize15,
                }}
                text={' از ' + props.total + ' آزمون موجود '}
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
