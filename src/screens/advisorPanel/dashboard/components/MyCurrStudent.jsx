import {PhoneView, SimpleText} from '@/styles';
import commonTranslator from '@/translator/common';
import {useEffect, useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Translate} from './translate';

function MyCurrStudent({student, startAt, endAt, isInPhone}) {
  const [pic, setPic] = useState();
  useEffect(() => {
    setPic(student.pic);
  }, [student.pic]);
  return (
    <>
      <PhoneView style={{gap: 20, alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => window.open('/manageStudent/' + student.id, '_blank')}
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
            text={student.firstname + ' ' + student.lastname}
          />

          <SimpleText
            style={{fontSize: 11}}
            text={`${Translate.startAdviceAt}: ${startAt}`}
          />
          <SimpleText
            style={{fontSize: 11}}
            text={`${Translate.endAdviceAt}: ${endAt}`}
          />

          <SimpleText
            style={{fontSize: 11}}
            text={`${commonTranslator.branch}: ${
              student.branches && student.branches !== null
                ? student.branches.join(' - ')
                : '-'
            }`}
          />

          <SimpleText
            style={{fontSize: 11}}
            text={`${commonTranslator.grade}: ${
              student.grade && student.grade !== null ? student.grade : '-'
            }`}
          />

          <SimpleText
            style={{fontSize: 11}}
            text={`${commonTranslator.school}: ${
              student.school && student.school !== null ? student.school : '-'
            }`}
          />

          <SimpleText
            style={{fontSize: 11}}
            text={`${commonTranslator.city}: ${
              student.city && student.city !== null ? student.city : '-'
            }`}
          />
        </TouchableOpacity>
      </PhoneView>
    </>
  );
}

export default MyCurrStudent;
