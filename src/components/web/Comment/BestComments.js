import {Image} from 'react-native';
import BestComment from './BestComment';
import {MyView, PhoneView} from '../../../styles/Common';
import {getWidthHeight} from '../../../services/Utility';
import {useMemo} from 'react';

function BestComments(props) {
  const w = useMemo(() => getWidthHeight()[0], []);
  return (
    <>
      {props.bestComments && props.bestComments.length > 0 && (
        <MyView>
          <PhoneView style={{width: '100%', justifyContent: 'center'}}>
            <img
              width={props.isInPhone ? '100%' : '800px'}
              src={require('./../../../images/experience.jpg')}
            />
          </PhoneView>
          <PhoneView
            style={{
              backgroundColor: 'rgb(250 247 227)',
              height: '300px',
              gap: '20px',
              paddingTop: '70px',
              justifyContent:
                (w > 1500 ? w - 250 : w - 200) >
                props.bestComments.length * 200 +
                  (props.bestComments.length - 1) * 20
                  ? 'center'
                  : 'unset',
              flexWrap: 'no-wrap',
              overflow: 'auto',
              paddingLeft: '100px',
              paddingRight: '100px',
            }}>
            {props.bestComments.map((e, index) => {
              return (
                <BestComment
                  createdAt={e.createdAt}
                  reference={e.ref}
                  comment={e.comment}
                  key={index}
                  student={e.student}
                />
              );
            })}
          </PhoneView>
        </MyView>
      )}
    </>
  );
}

export default BestComments;
