import RoleFormForSelect from '../../general/login/components/RoleFormForSelect';
import React, {useState} from 'react';
import {dispatchStateContext} from '../../../App';
import {CommonWebBox} from '../../../styles/Common';
import {useParams} from 'react-router';
import {generalRequest} from '../../../API/Utility';
import {routes} from '../../../API/APIRoutes';
import {isUserAdmin} from '../../../services/Utility';

function Upgrade(props) {
  const useGlobalState = () => [React.useContext(dispatchStateContext)];

  const [dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  const isAdmin = isUserAdmin(props.user);

  const params = useParams();
  const userId = isAdmin ? params.userId : undefined;

  if (isAdmin && userId === undefined) props.navigate('/');

  const [forms, setForms] = useState();
  const [isWorking, setIsWorking] = useState(false);

  const fetchUser = React.useCallback(() => {
    console.log('fetching');
    Promise.all([
      generalRequest(
        routes.fetchUser + userId,
        'get',
        undefined,
        'user',
        props.token,
      ),
    ]).then(res => {
      if (res[0] === null) {
        props.navigate('/');
        setIsWorking(false);
        return;
      }
      if (res[0].user.forms === undefined) setForms([]);
      else setForms(res[0].user.forms);
      setIsWorking(false);
    });
  }, [userId, props]);

  React.useEffect(() => {
    if (forms !== undefined) dispatch({loading: false});
  }, [forms, dispatch]);

  React.useEffect(() => {
    if (userId === undefined || isWorking || forms !== undefined) return;
    setIsWorking(true);
    dispatch({loading: true});
  }, [userId, isWorking, forms, dispatch]);

  React.useEffect(() => {
    if (isWorking) fetchUser();
  }, [isWorking, fetchUser]);

  return (
    <CommonWebBox>
      {/* <MyView style={{width: 400}}>
        <RoleForm
          forms={forms}
          userId={userId}
          signUp={false}
          token={props.token}
          setLoading={setLoading}
          navigate={props.navigate}
        />
      </MyView> */}

      <RoleFormForSelect
        forms={forms}
        userId={userId}
        signUp={false}
        token={props.token}
        setLoading={setLoading}
        navigate={props.navigate}
        step={'form'}
      />
    </CommonWebBox>
  );
}

export default Upgrade;
