import BlueTextInlineElem from './BlueTextInline';

const BlueTextInline = props => (
  <BlueTextInlineElem style={props.style !== undefined ? props.style : {}}>
    {props.text}
  </BlueTextInlineElem>
);

export default BlueTextInline;
