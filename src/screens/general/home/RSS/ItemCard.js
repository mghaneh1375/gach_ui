import React from 'react';
import {Pressable} from 'react-native';
import {PhoneView, SimpleText} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';

function ItemCard({news, selectItem}) {
  //   const [pic, setPic] = useState();
  //   React.useEffect(() => {
  //     setPic(news.mainImage);
  //   }, [news.mainImage]);

  return (
    <Pressable
      onPress={() => {
        selectItem();
        window.open(news.link, '_blank');
      }}>
      <PhoneView
        style={{
          width: 300,
          borderBottom: '1px solid',
          height: 50,
          gap: '20px',
          alignItems: 'center',
        }}>
        {/* {pic && (
          <Image
            resizeMode="cover"
            style={{width: '40px', height: '40px'}}
            source={{uri: pic}}
          />
        )} */}

        <SimpleText
          style={{...styles.BlueBold, ...{fontSize: 12}}}
          text={news.title}
        />
      </PhoneView>
    </Pressable>
  );
}

export default ItemCard;
