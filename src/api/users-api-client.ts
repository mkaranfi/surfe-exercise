import camelcaseKeys from 'camelcase-keys';

import { User } from 'types/User';
import { UserResponse } from 'types/api-response/UserResponse';

const getUsersAPIUrl = () => 'https://challenge.surfe.com/users';
const getMostMentionedUsersAPIUrl = () => 'https://challenge.surfe.com/users/mostMentioned';

export const fetchUsers = (): Promise<User[]> =>
  fetch(getUsersAPIUrl())
    .then((response) => response.json())
    // the camelcase-keys library transforms snake case keys like phone_number to phoneNumber
    // we don't want to mix case notations in the project so we align them to camel case
    .then((usersResponse: UserResponse[]) => camelcaseKeys(usersResponse))
    .catch((error) => {
      console.log('Error occurred while fetching the users: ', error);
      return [];
    });

export const fetchMostMentionedUsers = (): Promise<User[]> =>
  fetch(getMostMentionedUsersAPIUrl())
    .then((response) => response.json())
    .then((usersResponse: UserResponse[]) => camelcaseKeys(usersResponse))
    .catch((error) => {
      console.log('Error occurred while fetching the most mentioned users: ', error);
      return [];
    });
