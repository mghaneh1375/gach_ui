import React, {useState} from 'react';
import {dispatchStateContext} from '../../../App';
import List from './components/List/List';
import {fetchAllPackagesDigest} from './components/Utility';
import {addItem, editItem, removeItems} from '../../../services/Utility';
import Create from './components/Create';
import {getGradeLessons} from '../Basic/Utility';
import Detail from './components/Detail/Detail';
import {QuizzesProvider} from './components/Detail/Utility';
import {MyView} from '../../../styles/Common';

function Package(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [React.useContext(dispatchStateContext)];
  const [dispatch] = useGlobalState();
  const setLoading = status => {
    dispatch({loading: status});
  };

  const [packages, setPackages] = useState();
  const [mode, setMode] = useState('');
  const [grades, setGrades] = useState();
  const [selected, setSelected] = useState();

  const showRightMenu = () => {
    dispatch({
      allFilter: true,
      isFilterMenuVisible: true,
      isRightMenuVisible: false,
    });
  };

  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([fetchAllPackagesDigest(props.token), getGradeLessons()]).then(
      res => {
        dispatch({loading: false});
        if (res[0] === null || res[1] === null) {
          navigate('/');
          return;
        }
        setPackages(res[0].items);
        setGrades(
          res[1].map(elem => {
            return {id: elem.id, item: elem.name, lessons: elem.lessons};
          }),
        );
        setMode('list');
      },
    );
  }, [dispatch, props.token, navigate]);

  return (
    <MyView>
      {mode === 'list' && (
        <List
          afterRemove={removedIds =>
            removeItems(packages, setPackages, removedIds)
          }
          setMode={setMode}
          isAdmin={true}
          packages={packages}
          setLoading={setLoading}
          token={props.token}
          setSelected={setSelected}
        />
      )}
      {mode === 'detail' && (
        <QuizzesProvider>
          <Detail
            package={selected}
            setPackage={newItem => editItem(packages, setPackages, newItem)}
            setMode={setMode}
            setLoading={setLoading}
            token={props.token}
            showRightMenu={showRightMenu}
          />
        </QuizzesProvider>
      )}
      {mode === 'create' && (
        <Create
          grades={grades}
          setMode={setMode}
          setLoading={setLoading}
          token={props.token}
          afterFunc={newItem => addItem(packages, setPackages, newItem)}
        />
      )}
      {mode === 'edit' && (
        <Create
          grades={grades}
          setMode={setMode}
          setLoading={setLoading}
          token={props.token}
          package={selected}
          afterFunc={newItem => editItem(packages, setPackages, newItem)}
        />
      )}
    </MyView>
  );
}

export default Package;
