import {MyView, PhoneView, SimpleText} from '@/styles';
import {useEffect, useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Translate} from './translate';

function LastComment({comment, isInPhone}) {
  const [pic, setPic] = useState();
  useEffect(() => {
    setPic(comment?.author?.pic);
  }, [comment?.author?.pic]);

  return (
    <PhoneView style={{gap: 20, alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() =>
          window.open('/student-public-profile/' + comment.author.id, '_blank')
        }
        style={{gap: 5, alignItems: 'center'}}>
        <Image
          style={{
            width: isInPhone ? 90 : 140,
            height: isInPhone ? 90 : 140,
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          source={pic}
        />
        <SimpleText
          text={comment.author.firstname + ' ' + comment.author.lastname}
        />
        <SimpleText text={comment.createdAt} />
      </TouchableOpacity>
      <MyView>
        <SimpleText text={Translate[comment.section]} />
        <SimpleText text={comment.comment} />
      </MyView>
    </PhoneView>
  );
}

export default LastComment;
