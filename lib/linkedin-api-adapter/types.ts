export type StandardLinkedinProfileResponse = LixLinkedinProfileResponse;

export interface LixLinkedinProfileResponse {
  description: string;
  location: string;
  name: string;
  twitter: string;
  aboutSummaryText: string;
  img: string;
  salesNavLink: string;
  link: string;
  experience: Array<{
    description: string;
    title: string;
    dateStarted: string;
    dateEnded: string;
    location: string;
    organisation: {
      name: string;
      salesNavLink: string;
    };
    timePeriod: {
      startedOn: {
        month: number;
        year: number;
      };
      endedOn: {
        month?: number;
        year?: number;
      };
    };
  }>;
  education: Array<{
    institutionName: string;
    degree: string;
    fieldOfStudy: string;
    dateStarted: string;
    dateEnded: string;
    timePeriod: {
      startedOn: {
        year: number;
      };
      endedOn: {
        year: number;
      };
    };
  }>;
  skills: Array<{
    name: string;
    numOfEndorsement: string;
  }>;
  numOfConnections: string;
}
