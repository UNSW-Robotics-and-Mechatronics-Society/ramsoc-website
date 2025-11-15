export interface GetTeamMembersByYearData {
  teamCollection: {
    total: number;
    items: Array<{
      sys: {
        id: string;
      };
      year: number;
      name: string;
      role: string;
      email: string;
      linkedin?: string;
      selfie?: {
        url: string;
      };
    }>;
  };
}

export interface GetTeamByYearData {
  teamCollection: {
    total: number;
  };
}
