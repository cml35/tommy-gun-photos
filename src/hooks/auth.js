import { CognitoUserPool } from 'amazon-cognito-identity-js';

import { authConfig } from '../config';

const { userPoolId, appClientId } = authConfig;

const getCognitoUser = () => {
  const userPool = new CognitoUserPool({
    UserPoolId: userPoolId,
    ClientId: appClientId,
  });
  return userPool.getCurrentUser();
};

export const getCurrentUsername = ()=> {
  const currentUser = getCognitoUser();
  if (currentUser == null) {
    return null;
  }
  return currentUser.getUsername();
};

const getCognitoSession = async ()=> {
  const currentUser = getCognitoUser();
  if (currentUser == null) {
    throw new Error('User is not authenticated');
  }

  return new Promise((resolve, reject) =>
    currentUser.getSession((error, session) => {
      if (error != null) return reject(error);
      return resolve(session);
    })
  );
};

export const getIdToken = async ()=> {
  const session = await getCognitoSession();
  const idToken = session.getIdToken();
  return idToken.getJwtToken();
};

export const getAuthHeaders = async () => {
  const token = await getIdToken();
  return {
    Authorization: `Bearer ${token}`,
  };
};