import {useEffectOnce} from 'usehooks-ts';
import {CommonWebBox} from '../../../../styles/Common';
import {fetchTags} from './Utility';

function Create(props) {
  const fetchData = React.useCallback(() => {
    Promise.all([fetchTags(props.token)]).then(res => {
      if (res[0] == null || res[1] == null || res[2] == null) {
        props.navigate('/');
        return;
      }

      dispatch({
        myLifeStyle: res[0].days,
        myExams: res[0].exams,
        lifeStyleTags: res[1],
        examTags: res[2],
      });
      setSelectedExams(
        res[0].exams.map(e => {
          return res[2].find(ee => ee.label === e).id;
        }),
      );
    });
  }, [props, dispatch]);

  useEffectOnce(() => {
    fetchData();
  }, [fetchData]);

  return (
    <CommonWebBox>
      {state.myLifeStyle !== undefined &&
        state.myLifeStyle.map((e, index) => {
          return (
            <Day
              setLoading={props.setLoading}
              token={props.token}
              addNewItem={() => {
                setSelectedDay(e.day);
              }}
              boxes={e.items}
              day={e.day}
              key={index}
              canEdit={canEdit}
            />
          );
        })}
    </CommonWebBox>
  );
}

export default Create;
