import {FontIcon, PhoneView, SimpleText} from '@/styles';
import {faInfo} from '@fortawesome/free-solid-svg-icons';
import {Translate} from './translate';

function Schedules({schedules}) {
  return (
    <>
      {schedules.map((schedule, index) => (
        <PhoneView style={{gap: '20px', alignItems: 'center'}} key={index}>
          <SimpleText
            text={`${Translate.weekStartAt}: ${schedule.weekStartAt}`}
          />
          {schedule.user && (
            <SimpleText
              text={`${Translate.studentName}: ${
                schedule.user.firstname + ' ' + schedule.user.lastname
              }`}
            />
          )}
          {schedule.advisors && (
            <SimpleText
              text={`${Translate.advisors}: ${schedule.advisors
                .map(e => e.firstname + ' ' + e.lastname)
                .join(' - ')}`}
            />
          )}

          <FontIcon
            icon={faInfo}
            theme={'rect'}
            onPress={() =>
              window.open(
                schedule.advisors
                  ? '/showSchedule/' + schedule.id
                  : '/showScheduleForAdvisor/' +
                      schedule.id +
                      '/' +
                      schedule.user.id,
                '_blank',
              )
            }
          />
        </PhoneView>
      ))}
    </>
  );
}

export default Schedules;
