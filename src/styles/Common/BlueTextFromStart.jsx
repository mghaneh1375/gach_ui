import vars from '../root';
import BlueTextInline from './blueTextInline.js';
import MyView from './MyView';

const BlueTextFromStart = props => (
  <MyView style={{flexDirection: 'row', alignSelf: vars.alignSelf}}>
    <BlueTextInline text={props.text} />
  </MyView>
);

export default BlueTextFromStart;
