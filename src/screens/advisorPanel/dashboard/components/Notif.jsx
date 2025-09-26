import {FontIcon, MyView, PhoneView, SimpleText} from '@/styles';
import commonTranslator from '@/translator/common';
import {faInfo} from '@fortawesome/free-solid-svg-icons';

function Notif({id, createdAt, title}) {
  return (
    <MyView>
      <PhoneView style={{gap: '20px', alignItems: 'center'}}>
        <SimpleText text={`${commonTranslator.title}: ${title}`} />
        <SimpleText text={`${commonTranslator.createdAt}: ${createdAt}`} />

        <FontIcon
          icon={faInfo}
          theme={'rect'}
          onPress={() => window.open(`/notif/${id}`, '_blank')}
        />
      </PhoneView>
    </MyView>
  );
}

export default Notif;
