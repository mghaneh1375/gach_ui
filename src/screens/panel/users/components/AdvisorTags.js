import { routes } from '../../../../API/APIRoutes';
import {CommonWebBox} from '../../../../styles/Common';
import {dispatchUsersContext, usersContext} from './Context';

function AdvisorTags(props) {
  const [isWorking, setIsWorking] = useState(false);
  const useGlobalState = () => [
    React.useContext(usersContext),
    React.useContext(dispatchUsersContext),
  ];

  const [state, dispatch] = useGlobalState();

  const fetchData = React.useCallback(() => {
      
    props.setLoading(true);

      Promise.all([routes.]).then(res => {

      });

      props.setLoading(false);

  }, [state.selectedUser]);

  const [tags, setTags] = useState();

  return <CommonWebBox></CommonWebBox>;
}

export default AdvisorTags;
