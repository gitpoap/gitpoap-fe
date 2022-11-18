import { ContributorsObject, UnvalidatedContributor } from '../../lib/api/gitpoapRequest';

export const convertContributorsObjectToList = (
  contributors: ContributorsObject,
): UnvalidatedContributor[] => {
  return Object.entries(contributors)
    .map(([key, value]) => {
      return value.map((c): UnvalidatedContributor => {
        return { type: key as UnvalidatedContributor['type'], value: c };
      });
    })
    .flat();
};
