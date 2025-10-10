import {PhoneView, SimpleText} from '@/styles';
import {useEffect, useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Translate} from './translate';
import commonTranslator from '@/translator/common';

function TopAdvisor({advisor, isInPhone}) {
  const [pic, setPic] = useState();
  useEffect(() => {
    setPic(advisor.pic);
  }, [advisor.pic]);

  return (
    <>
      <PhoneView style={{gap: 20, alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() =>
            window.open('/admin/advisor-full-info/' + advisor.id, '_blank')
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
            style={{fontSize: 11}}
            text={`${advisor.firstname} ${advisor.lastname}`}
          />
          <SimpleText
            style={{fontSize: 11}}
            text={`${Translate.studentsCount}: ${advisor.studentsCount}`}
          />
          <SimpleText
            style={{fontSize: 11}}
            text={`${Translate.commentsCount}: ${advisor.commentsCount}`}
          />
          <SimpleText
            style={{fontSize: 11}}
            text={`${commonTranslator.rate}: ${advisor.rate}`}
          />
        </TouchableOpacity>
      </PhoneView>
    </>
  );
}

export default TopAdvisor;
