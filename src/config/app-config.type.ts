export type AppConfig = {
  nodeEnv: string;
  name: string;
  workingDirectory: string;
  frontendDomain?: string;
  // microservices Domain Name
  // microsercies Domain Name end
  port: number;
  apiPrefix: string;
  fallbackLanguage: string;
  headerLanguage: string;
};
