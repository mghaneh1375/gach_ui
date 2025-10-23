import {BigBoldBlueTextInlineElem} from './bigBoldTextElem.js';

const BigBoldBlueTextInline = props => (
  <BigBoldBlueTextInlineElem
    style={props.style !== undefined ? props.style : {}}>
    {props.text}
  </BigBoldBlueTextInlineElem>
);

export default BigBoldBlueTextInline;
