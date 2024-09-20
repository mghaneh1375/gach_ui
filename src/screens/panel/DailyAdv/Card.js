import {CommonButton, MyView, SimpleText} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';

function Card(props) {
  return (
    <MyView style={{...styles.gap10}}>
      <SimpleText text={'تبلیغات ' + props.index} />
      <SimpleText text={'عنوان ' + props.title} />
      <SimpleText text={'زمان انقضا ' + props.expireAt} />
      <a target="_blank" href={props.url}>
        مشاهده ویدیو
      </a>
      <CommonButton
        onPress={props.onRemove}
        title={'حذف'}
        style={{...styles.alignSelfCenter}}
      />
    </MyView>
  );
}

export default Card;
