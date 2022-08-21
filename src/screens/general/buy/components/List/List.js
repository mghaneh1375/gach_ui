import React, {useState} from 'react';
import {PhoneView} from '../../../../../styles/Common';
import Card from '../../../../panel/package/card/Card';
import {packagesContext, dispatchPackagesContext} from '../Context';
import {fetchAllPackages} from '../../../../panel/package/components/Utility';
import QuizCard from '../../../../panel/quiz/components/Card/Card';

function List(props) {
  const useGlobalState = () => [
    React.useContext(packagesContext),
    React.useContext(dispatchPackagesContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);

  React.useEffect(() => {
    if (isWorking || state.allItems !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([fetchAllPackages(undefined)]).then(res => {
      props.setLoading(false);

      if (res[0] === null) {
        props.navigate('/');
        return;
      }

      dispatch({
        allItems: res[0].items,
        filters: {
          items: res[0].tags,
          onChangeFilter: selectedIndices => {
            dispatch({
              checkedFilterIndices: selectedIndices,
              needUpdateFilters: true,
            });
          },
        },
      });

      setIsWorking(false);
    });
  }, [dispatch, props, isWorking, state.allItems]);

  return (
    <PhoneView style={{gap: 15, padding: 10}}>
      {state.selectableItems !== undefined &&
        state.selectableItems.map((item, index) => {
          if (item.type === 'package')
            return (
              <Card
                isAdmin={false}
                key={index}
                package={item}
                onPress={() => {
                  dispatch({package: item});
                  props.setMode('detail');
                }}
              />
            );

          return <QuizCard onClick={() => {}} quiz={item} key={index} />;
        })}
    </PhoneView>
  );
}

export default List;
