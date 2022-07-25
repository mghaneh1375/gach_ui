import {View} from 'react-native';
import {CommonWebBox, SimpleText} from '../../../../styles/Common';
import vars from '../../../../styles/root';
import {styleFontSize25, styleBorderRight} from './style';

function MiniCard(props) {
  return (
    <CommonWebBox
      width={250}
      style={{
        ...styleBorderRight,
        ...{
          borderColor: props.theme,
          backgroundImage:
            props.background !== undefined ? props.background : 'white',
          borderRightWidth: props.background !== undefined ? 0 : 18,
        },
      }}>
      <View>
        <SimpleText
          style={{
            ...styleFontSize25,
            ...{
              color:
                props.background !== undefined ? vars.WHITE : vars.DARK_BLUE,
            },
          }}
          text={props.text}
        />
      </View>
    </CommonWebBox>
  );
}

export default MiniCard;
