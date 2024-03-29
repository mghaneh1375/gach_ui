import {MyView, PhoneView, SimpleText} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';

function Row(props) {
  if (props.isInPhone)
    return (
      <MyView
        style={{
          ...styles.padding10,
          ...{
            backgroundColor: props.silver ? '#ccc' : 'white',
          },
        }}>
        <SimpleText text={props.title} />
        <SimpleText
          text={props.answer}
          style={
            props.style === undefined
              ? {textAlign: 'right'}
              : {...props.style, ...{width: '60%', textAlign: 'right'}}
          }
          onPress={props.onPress}
        />
      </MyView>
    );

  return (
    <PhoneView
      style={{
        ...styles.padding10,
        ...styles.borderBottom1,
        ...{
          backgroundColor: props.silver ? '#ccc' : 'white',
          borderColor: 'black',
        },
      }}>
      <SimpleText
        style={{width: '30%', textAlign: 'right'}}
        text={props.title}
      />
      <SimpleText
        text={props.answer}
        style={
          props.style === undefined
            ? {width: '70%', textAlign: 'right'}
            : {...props.style, ...{width: '60%', textAlign: 'right'}}
        }
        onPress={props.onPress}
      />
    </PhoneView>
  );
}

export default Row;
