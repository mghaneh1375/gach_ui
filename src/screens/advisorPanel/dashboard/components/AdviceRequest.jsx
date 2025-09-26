import {FontIcon, PhoneView, SimpleText} from '@/styles';
import {faInfo} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router';
import {Translate} from './translate';
import {formatPrice} from '@/services/utility';

function AdviceRequest({firstname, lastname, title, price, requestAt}) {
  const navigate = useNavigate();
  return (
    <PhoneView style={{gap: '20px', alignItems: 'center'}}>
      <SimpleText text={`${Translate.sendFrom}: ${firstname} ${lastname}`} />
      <SimpleText text={`${Translate.wantedPackageTitle}: ${title}`} />
      <SimpleText
        text={`${Translate.wantedPackagePrice}: ${formatPrice(price)}`}
      />
      <SimpleText text={`${Translate.requestAt}: ${requestAt}`} />
      <FontIcon
        icon={faInfo}
        theme={'rect'}
        onPress={() => navigate('/myStudentRequests')}
      />
    </PhoneView>
  );
}

export default AdviceRequest;
