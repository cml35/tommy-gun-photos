declare global {
    interface Window {
      CONQA_CONFIG: {
        common: {
          baseApiDomain: string;
          baseBackendDomain: string;
          baseAccountDomain: string;
        };
        auth: {
          userPoolId: string;
          appClientId: string;
        };
        demo: {
          accountId: string;
          projectId: string;
        };
      };
    }
  }
  
  const appConfig = window.CONQA_CONFIG;
  
  export const authConfig = appConfig.auth;
  export const demoConfig = appConfig.demo;
  
  export const baseAccountDomain = appConfig.common.baseAccountDomain;
  
  export const baseApiDomain = appConfig.common.baseApiDomain;
  export const basePath = process.env.APP_BASE_PATH ?? '/';
  
  export const usernameLookupBaseUrl = `${appConfig.common.baseBackendDomain}/v1/user/lookup`;
  