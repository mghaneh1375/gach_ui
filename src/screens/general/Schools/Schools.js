import {
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {dispatchStateContext} from '../../../App';
import React, {useState} from 'react';
import {generalRequest} from '../../../API/Utility';
import {routes} from '../../../API/APIRoutes';
import {useEffectOnce} from 'usehooks-ts/dist/esm/useEffectOnce';

const perBox = 20;

function Schools(props) {
  const navigate = props.navigate;
  const useGlobalState = () => [React.useContext(dispatchStateContext)];

  const [dispatch] = useGlobalState();
  const [boxes, setBoxes] = useState();
  const [schools, setSchools] = useState();

  React.useEffect(() => {
    if (schools === undefined) return;

    let tmp = [];
    let idx = 0;
    let end = schools.length;

    while (idx < end) {
      let limit = idx + perBox > end ? end : idx + perBox;
      tmp.push(schools.slice(idx, limit));
      idx += perBox;
    }

    setBoxes(tmp);
  }, [schools]);

  useEffectOnce(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.fetchSchoolsDigest,
        'get',
        undefined,
        'data',
        undefined,
      ),
    ]).then(res => {
      dispatch({loading: false});
      if (res[0] === null) {
        navigate('/');
        return;
      }
      setSchools(
        res[0].map(elem => {
          return elem.name;
        }),
      );
    });
  });

  return (
    <CommonWebBox>
      <PhoneView
        style={{
          gap: 10,
          justifyContent: 'center',
          alignItems: 'baseline',
        }}>
        {boxes !== undefined &&
          boxes.map((box, index) => {
            return (
              <MyView
                style={{
                  width: '45%',
                  minWidth: 300,
                  gap: 5,
                }}
                key={index}>
                {box.map((sch, idx) => {
                  return <SimpleText key={idx} text={sch} />;
                })}
              </MyView>
            );
          })}
      </PhoneView>
    </CommonWebBox>
  );
}

export default Schools;
