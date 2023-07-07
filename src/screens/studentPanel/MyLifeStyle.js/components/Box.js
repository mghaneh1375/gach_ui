import {faClose, faEdit} from '@fortawesome/free-solid-svg-icons';
import {MyView, PhoneView, SimpleText} from '../../../../styles/Common';
import {SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {styles} from '../../../../styles/Common/Styles';
import LastBuyer from '../../../general/Packages/components/Detail/LastBuyer';

function Box(props) {
  return (
    <>
      <MyView
        style={{
          border: '1px solid',
          minWidth: 150,
          maxWidth: 150,
          minHeight: 150,
          maxHeight: 150,
          padding: 5,
          borderRadius: 7,
          backgroundColor:
            props.item.doneDuration !== undefined
              ? props.item.doneDuration === props.item.duration
                ? 'green'
                : 'yellow'
              : 'transparent',
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

        {props.item.doneDuration !== undefined && (
          <SimpleText
            text={'مدت انجام شده: ' + props.item.doneDuration + ' دقیقه'}
          />
        )}

        {props.item.lesson !== undefined && (
          <SimpleText text={props.item.lesson} />
        )}

        {props.item.additional !== undefined && (
          <SimpleText
            text={props.item.additionalLabel + ' : ' + props.item.additional}
          />
        )}

        {props.item.doneAdditional !== undefined && (
          <SimpleText
            text={
              props.item.additionalLabel +
              ' انجام شده : ' +
              props.item.doneAdditional
            }
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

        {props.onDone !== undefined && (
          <SimpleFontIcon
            onPress={() => props.onDone()}
            style={{cursor: 'pointer'}}
            icon={faEdit}
            kind={'normal'}
          />
        )}
      </MyView>
    </>
  );
}

export default Box;
