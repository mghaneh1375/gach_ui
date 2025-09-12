import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
import Video from '@/screens/panel/Video.jsx';
import {showError, showSuccess} from '@/services/utility';
import {LargePopUp} from '@/styles/common/PopUp.jsx';
function DailyAdv(props) {
  return (
    <LargePopUp removeCancel={true}>
      <Video
        src={props.src}
        disableSeekbar={false}
        onFinish={async () => {
          props.setLoading(true);
          const res = await generalRequest(
            routes.giveMyPointForAdv,
            'post',
            undefined,
            undefined,
            props.token,
          );
          props.setLoading(false);
          if (res !== null) {
            window.localStorage.setItem('can_request_for_adv', false);
            showSuccess('تبریک! امتیاز امروزت رو گرفتی');
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            showError('خطایی در انجام فرآیند امتیازدهی بوجود آمده است');
          }
        }}
      />
    </LargePopUp>
  );
}
export default DailyAdv;
