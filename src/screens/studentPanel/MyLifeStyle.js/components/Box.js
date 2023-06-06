import {MyView, PhoneView, SimpleText} from '../../../../styles/Common';

function Box(props) {
  return (
    <MyView>
      <SimpleText title={props.item.title} />
      <PhoneView></PhoneView>
    </MyView>
  );
}

export default Box;
