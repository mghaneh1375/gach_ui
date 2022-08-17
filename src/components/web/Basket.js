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
import {
  dark_blue_color,
  yellow_color,
  fontSize17,
} from '../../styles/Common/Styles';

import commonTranslator from '../../tranlates/Common';
import {globalStateContext} from '../../App';

function Basket(props) {
  const useGlobalState = () => [React.useContext(globalStateContext)];
  const [state] = useGlobalState();

  const [width, setWidth] = useState('calc(100% - 240px)');

  React.useEffect(() => {
    if (state.isRightMenuVisible) setWidth('calc(100% - 240px)');
    else setWidth('calc(100% - 40px)');
  }, [state.isRightMenuVisible]);

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
                ...dark_blue_color,
                ...fontSize17,
              }}
              text={'تعداد آزمون'}
            />
            <SimpleText
              style={{
                ...{
                  marginTop: 5,
                  marginRight: 5,
                },
                ...yellow_color,
                ...styleFontSize13,
              }}
              text={commonTranslator.selectAll}
            />
          </PhoneView>
          {props.total > 0 && (
            <PhoneView>
              <SimpleText
                style={{
                  ...yellow_color,
                  ...styleFontSize15,
                }}
                text={props.selectedLength}
              />
              <SimpleText
                style={{
                  ...dark_blue_color,
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
