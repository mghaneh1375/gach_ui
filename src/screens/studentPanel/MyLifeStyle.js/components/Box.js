import {CommonButton, MyView, SimpleText} from '../../../../styles/Common';

function Box(props) {
  return (
    <MyView>
      <SimpleText text={props.item.tag} />
      <SimpleText text={props.item.duration + ' دقیقه'} />
      <SimpleText text={props.item.startAt} />
      <CommonButton title={'حذف'} onPress={() => props.remove()} />
    </MyView>
  );
}

export default Box;
