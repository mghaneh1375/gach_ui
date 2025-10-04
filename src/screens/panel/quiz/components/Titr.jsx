import {SimpleText} from '@/styles';
import vars from '@/styles/root';

function Titr({title}) {
  return (
    <SimpleText
      style={{
        color: vars.DARK_BLUE,
        fontWeight: 'bold',
        fontSize: '18px',
        borderBottom: `2px solid ${vars.DARK_BLUE}`,
        paddingBottom: '8px',
      }}
      text={title}
    />
  );
}

export default Titr;
