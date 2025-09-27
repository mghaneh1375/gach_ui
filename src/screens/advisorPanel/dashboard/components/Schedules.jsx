import {PhoneView, SimpleText} from '@/styles';
import {Translate} from './translate';

function Schedules({schedules}) {
  return (
    <>
      {schedules.map((schedule, index) => (
        <PhoneView style={{gap: '20px', alignItems: 'center'}} key={index}>
          <SimpleText
            text={`${Translate.weekStartAt}: ${schedule.weekStartAt}`}
          />
          <SimpleText
            text={`${Translate.studentName}: ${
              schedule.student.firstname + ' ' + schedule.student.lastname
            }`}
          />
        </PhoneView>
      ))}
    </>
  );
}

export default Schedules;
