import {SimpleText} from '@/styles';
import {useTheme} from 'styled-components';

function Titr({title}) {
  const theme = useTheme();
  return (
    <SimpleText
      style={{
        color: theme.colors.text,
        fontWeight: 'bold',
        fontSize: '18px',
        borderBottom: `2px solid ${theme.colors.text}`,
        paddingBottom: '8px',
      }}
      text={title}
    />
  );
}

export default Titr;
