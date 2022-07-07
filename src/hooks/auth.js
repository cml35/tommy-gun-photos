import { CognitoUserPool } from 'amazon-cognito-identity-js';

const userPoolId = "us-west-2_5C6gxWMSg";
const appClientId = "7pjrnse0o5821699ib7dmsjosi";

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