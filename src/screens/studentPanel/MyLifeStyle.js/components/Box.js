import {CommonButton, MyView, SimpleText} from '../../../../styles/Common';

function Box(props) {
  return (
    <MyView>
      <SimpleText text={props.item.tag} />
      <SimpleText text={props.item.duration + ' دقیقه'} />
      {props.item.subject !== undefined && (
        <SimpleText text={props.item.subject} />
      )}
      <SimpleText text={props.item.startAt} />
      {props.remove !== undefined && (
        <CommonButton title={'حذف'} onPress={() => props.remove()} />
      )}
      {props.item.description !== undefined && (
        <SimpleText text={props.item.description} />
      )}
    </MyView>
  );
}

export default Box;
