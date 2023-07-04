import {faClose} from '@fortawesome/free-solid-svg-icons';
import {
  CommonButton,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {styles} from '../../../../styles/Common/Styles';
import LastBuyer from '../../../general/Packages/components/Detail/LastBuyer';

function Box(props) {
  return (
    <MyView
      style={{
        border: '1px solid',
        minWidth: 150,
        maxWidth: 150,
        minHeight: 150,
        maxHeight: 150,
        padding: 5,
        borderRadius: 7,
      }}>
      {props.remove !== undefined && (
        <SimpleFontIcon
          icon={faClose}
          kind={'normal'}
          parentStyle={{alignSelf: 'end'}}
          style={{color: 'red'}}
          onPress={() => props.remove()}
        />
      )}
      <SimpleText text={props.item.tag} />
      <SimpleText text={props.item.duration + ' دقیقه'} />
      {props.item.lesson !== undefined && (
        <SimpleText text={props.item.lesson} />
      )}

      {props.item.additional !== undefined && (
        <SimpleText
          text={props.item.additionalLabel + ' : ' + props.item.additional}
        />
      )}

      <SimpleText text={props.item.startAt} />

      {props.item.description !== undefined && (
        <SimpleText text={props.item.description} />
      )}

      <PhoneView style={{...styles.justifyContentEnd}}>
        {props.item.advisor !== undefined && (
          <LastBuyer
            pic={props.item.advisor.pic}
            text={props.item.advisor.name}
          />
        )}
      </PhoneView>
    </MyView>
  );
}

export default Box;
