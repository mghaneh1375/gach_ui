import {PhoneView, SimpleText} from '@/styles';
import {Translate} from './translate';

function Meeting({createdAt, endAt, user, url}) {
  return (
    <>
      <PhoneView style={{gap: 20, alignItems: 'center'}}>
        <SimpleText text={`${Translate.meetingStartAt}: ${createdAt}`} />
        <SimpleText text={`${Translate.meetingEndAt}: ${endAt}`} />
        <SimpleText
          text={`${Translate.meetingStudent}: ${user.firstname}  ${user.lastname}`}
        />
        <a target="_blank" style={{fontFamily: 'IRANSans'}} href={url}>
          {Translate.meetingUrl}
        </a>
      </PhoneView>
    </>
  );
}

export default Meeting;
