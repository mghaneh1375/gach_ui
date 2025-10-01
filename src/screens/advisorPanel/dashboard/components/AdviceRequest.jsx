import {FontIcon, PhoneView, SimpleText} from '@/styles';
import {faInfo} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router';
import {Translate} from './translate';
import {formatPrice} from '@/services/utility';

function AdviceRequest({
  dashbaordMode = 'advisor',
  firstname,
  lastname,
  title,
  price,
  requestAt,
  answerAt,
  status,
}) {
  const navigate = useNavigate();
  return (
    <PhoneView style={{gap: '20px', alignItems: 'center'}}>
      <SimpleText
        text={`${
          dashbaordMode === 'advisor' ? Translate.sendFrom : Translate.sendTo
        }: ${firstname} ${lastname}`}
      />
      <SimpleText text={`${Translate.wantedPackageTitle}: ${title}`} />
      <SimpleText
        text={`${Translate.wantedPackagePrice}: ${formatPrice(price)}`}
      />
      {status && <SimpleText text={`${Translate.requestStatus}: ${status}`} />}
      <SimpleText text={`${Translate.requestAt}: ${requestAt}`} />
      {answerAt && <SimpleText text={`${Translate.answerAt}: ${answerAt}`} />}
      <FontIcon
        icon={faInfo}
        theme={'rect'}
        onPress={() => navigate('/myStudentRequests')}
      />
    </PhoneView>
  );
}

export default AdviceRequest;
