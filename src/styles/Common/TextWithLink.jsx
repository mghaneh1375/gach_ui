import vars from '../root';
import BlueTextInline from './blueTextInline.js';
import InlineTextContainer from './InlineTextContainer';
import TextLink from './TextLink';

const TextWithLink = props => {
  return (
    <InlineTextContainer style={props.style !== undefined ? props.style : {}}>
      <BlueTextInline text={props.text} />
      <button
        style={{
          border: 'none',
          padding: '5px 10px',
          marginRight: '2px',
          borderRadius: '10px',
          backgroundColor: vars.ORANGE,
        }}>
        <TextLink onPress={props.onPress} href={props.href} text={props.link} />
      </button>
    </InlineTextContainer>
  );
};

export default TextWithLink;
