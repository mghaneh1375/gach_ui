import {
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../styles/Common';

function Basket(props) {
  return (
    <CommonWebBox style={basketBox}>
      <EqualTwoTextInputs>
        <MyView>
          <PhoneView>
            <SimpleText
              style={{color: vars.DARK_BLUE, fontWeight: 600, fontSize: 17}}
              text={'تعداد آزمون'}
            />
            <SimpleText
              style={{
                ...{
                  color: vars.YELLOW,
                  marginTop: 5,
                  marginRight: 5,
                },
              }}
              text={commonTranslator.selectAll}
            />
          </PhoneView>
          {quizzes !== undefined && (
            <PhoneView>
              <SimpleText
                style={{color: vars.YELLOW, fontSize: 15}}
                text={selectedItems.length}
              />
              <SimpleText
                style={{color: vars.DARK_BLUE, fontSize: 15}}
                text={' از ' + quizzes.length + ' آزمون موجود '}
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
