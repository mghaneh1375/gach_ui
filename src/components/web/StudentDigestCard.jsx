import {PhoneView, SimpleText} from '@/styles';
import {Image, TouchableOpacity} from 'react-native';
import commonTranslator from '@/translator/common';
import {useEffect} from 'react';

function StudentDigestCard({student, isInPhone, children}) {
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
          {pic && (
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
          )}

          <SimpleText
            style={{fontSize: 11}}
            text={student.firstname + ' ' + student.lastname}
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

          {children}
        </TouchableOpacity>
      </PhoneView>
    </>
  );
}

export default StudentDigestCard;
