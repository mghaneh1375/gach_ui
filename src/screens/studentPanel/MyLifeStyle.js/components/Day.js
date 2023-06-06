import {MyView, PhoneView, SimpleText} from '../../../../styles/Common';
import vars from '../../../../styles/root';
import Box from './Box';

function Day(props) {
  return (
    <PhoneView>
      <PhoneView
        style={{
          backgroundColor: vars.DARK_BLUE,
          padding: 40,
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <SimpleText
          text={
            props.date === undefined
              ? props.day
              : props.day + ' - ' + props.date
          }
          style={{fontSize: 18, color: 'white'}}
        />
      </PhoneView>
      {props.boxes !== undefined &&
        props.boxes.map((e, index) => {
          return <Box key={index} item={e} />;
        })}
    </PhoneView>
  );
}

export default Day;
