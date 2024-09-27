import {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {MyView, SimpleText} from '../../../styles/Common';
import vars from '../../../styles/root';

function Card(props) {
  const [pic, setPic] = useState();
  const [showInfo, setShowInfo] = useState(false);
  useEffect(() => {
    setPic(props.badge.img);
  }, [props.badge]);

  return (
    <div
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
      style={{
        minHeight: '200px',
        width: '200px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <MyView
        style={{
          border: 'unset',
          borderRadius: '50%',
          width: props.isInPhone ? 100 : 148,
          height: props.isInPhone ? 100 : 148,
        }}>
        <Image
          style={{
            width: props.isInPhone ? 90 : 140,
            height: props.isInPhone ? 90 : 140,
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          source={pic}
        />
      </MyView>

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: vars.SOLID_CREAM,
          width: '100%',
          height: '100%',
          borderRadius: '7px',
          zIndex: 2,
          display: showInfo ? 'flex' : 'none',
          flexDirection: 'column',
        }}>
        <SimpleText
          style={{
            marginTop: '10px',
            textAlign: 'center',
            fontSize: '22px',
            color: vars.DARK_BLUE,
            fontWeight: 'bold',
          }}
          text={props.badge.name}
        />
        {props.badge.actions.map((e, index) => (
          <SimpleText
            style={{
              textAlign: 'center',
              fontSize: '16px',
              color: vars.DARK_BLUE,
            }}
            key={index}
            text={e.actionFa + ': ' + e.count + ' بار'}
          />
        ))}
        <SimpleText
          style={{
            textAlign: 'center',
            fontSize: '14px',
            color: vars.RED,
            fontWeight: 'bold',
            marginTop: '10px',
          }}
          text={'جایزه دریافت مدال'}
        />
        <SimpleText
          style={{
            textAlign: 'center',
            fontSize: '14px',
            color: vars.RED,
            fontWeight: 'bold',
          }}
          text={props.badge.award + ' ایکس پول'}
        />
      </div>
    </div>
  );
}

export default Card;
