import {BigBoldBlueTextInlineElem} from './BigBoldTextElem';

const BigBoldBlueTextInline = props => (
  <BigBoldBlueTextInlineElem
    style={props.style !== undefined ? props.style : {}}>
    {props.text}
  </BigBoldBlueTextInlineElem>
);

export default BigBoldBlueTextInline;
