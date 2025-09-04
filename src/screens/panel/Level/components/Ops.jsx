import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
import {CommonButton, PhoneView} from '@/styles';
import {LargePopUp} from '../../../../styles/common/PopUp';
function Ops(props) {
  return (
    <LargePopUp toggleShowPopUp={props.toggleShowPopUp}>
      <PhoneView
        style={{
          gap: '10px',
        }}>
        <CommonButton
          onPress={async () => {
            props.setLoading(true);
            const res = await generalRequest(
              routes.removeLevel + props.id,
              'delete',
              undefined,
              undefined,
              props.token,
            );
            props.setLoading(false);
            if (res != null) props.onRemove();
          }}
          title={'حذف'}
          theme={'transparent'}
        />
        <CommonButton
          onPress={() => props.setMode('edit')}
          title={'ویرایش'}
          theme={'transparent'}
        />
      </PhoneView>
    </LargePopUp>
  );
}
export default Ops;
