import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';

export const fetchAllFlags = async token => {
  return await generalRequest(
    routes.getQuestionAllFlags,
    'get',
    undefined,
    'data',
    token,
  );
};

export const checkExistance = async (token, section, id, qNo, level) => {
  let query = new URLSearchParams();

  if (section === 'subject') query.append('subjectId', id);
  else if (section === 'lesson') query.append('lessonId', id);
  else if (section === 'grade') query.append('gradeId', id);
  else if (section === 'tag') query.append('tag', id);

  if (level !== undefined) query.append('level', level);

  query.append('qNo', qNo);

  let res = await generalRequest(
    routes.checkAvailableQuestions + '?' + query.toString(),
    'post',
    undefined,
    undefined,
    token,
  );

  return res !== null;
};

export const finalized = async (token, boxes, name) => {
  return await generalRequest(
    routes.prepareCustomQuiz,
    'post',
    {
      name: name,
      filters: boxes.map(elem => {
        let obj = {
          qNo: elem.count,
          level: elem.level,
        };

        if (elem.section === 'tag') obj.tag = elem.name;
        else if (elem.section === 'subject') obj.subjectId = elem.id;
        else if (elem.section === 'lesson') obj.lessonId = elem.id;
        else if (elem.section === 'grade') obj.gradeId = elem.id;

        return obj;
      }),
    },
    'data',
    token,
  );
};

export const goToPay = async (token, id, offcode) => {
  return await generalRequest(
    routes.payCustomQuiz + id,
    'post',
    offcode === undefined
      ? undefined
      : {
          offcode: offcode,
        },
    ['action', 'refId'],
    token,
  );
};
