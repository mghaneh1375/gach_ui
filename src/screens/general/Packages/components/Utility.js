import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';

export const fetchAllPackages = async (isInMyMode, token = undefined) => {
  return await generalRequest(
    isInMyMode ? routes.fetchMyContents : routes.fetchContents,
    'get',
    undefined,
    isInMyMode
      ? 'data'
      : [
          'data',
          'min',
          'max',
          'tags',
          'minDuration',
          'maxDuration',
          'teachers',
        ],
    token,
  );
};

export const fetchPackage = async (slug, token) => {
  return await generalRequest(
    routes.fetchContent + slug,
    'get',
    undefined,
    'data',
    token,
  );
};

export const goToPay = async (token, data, id) => {
  return await generalRequest(
    routes.buyContent + id,
    'post',
    data,
    ['action', 'refId'],
    token,
  );
};

export const filter = async (
  tag,
  teacher,
  min,
  max,
  minDuration,
  maxDuration,
  hasCert,
  token,
) => {
  let query = new URLSearchParams();

  if (tag !== undefined && tag !== 'all') query.append('tag', tag);

  if (teacher !== undefined && teacher !== 'all')
    query.append('teacher', teacher);

  if (min !== undefined) query.append('minPrice', min);

  if (max !== undefined) query.append('maxPrice', max);

  if (minDuration !== undefined) query.append('minDuration', minDuration);

  if (maxDuration !== undefined) query.append('maxDuration', maxDuration);

  if (hasCert !== undefined && hasCert !== 'all')
    query.append('hasCert', hasCert);

  return await generalRequest(
    routes.fetchContents + '?' + query.toString(),
    'get',
    undefined,
    'data',
    token,
  );
};
