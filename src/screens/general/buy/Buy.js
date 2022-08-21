import React, {useState} from 'react';
import {MyView, PhoneView} from '../../../styles/Common';
import Card from '../../panel/package/card/Card';
import {fetchRegistrablePackages} from './components/Utility';
import {dispatchStateContext} from '../../../App';

function Buy(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [React.useContext(dispatchStateContext)];
  const [dispatch] = useGlobalState();
  const setLoading = status => {
    dispatch({loading: status});
  };

  const [packages, setPackages] = useState();
  const [selected, setSelected] = useState();

  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([fetchRegistrablePackages()]).then(res => {
      dispatch({loading: false});
      if (res[0] === null) {
        navigate('/');
        return;
      }
      console.log(res[0]);
      setPackages(res[0]);
    });
  }, [navigate, dispatch]);

  return (
    <MyView>
      <PhoneView style={{gap: 15, padding: 10}}>
        {packages !== undefined &&
          packages.map((package_, index) => {
            return (
              <Card
                isAdmin={false}
                key={index}
                package={package_}
                setLoading={props.setLoading}
                token={props.token}
                setSelected={props.setSelected}
              />
            );
          })}
      </PhoneView>
    </MyView>
  );
}

export default Buy;
