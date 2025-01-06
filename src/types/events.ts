export interface MetaEvent {
  cover?: { offset_x: number; offset_y: number; source: string };
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  id: number;
  place?: { name: string };
}

export interface MetaGraphAPIEventResponse {
  data: MetaEvent[];
  paging: {
    cursors: { after: string; before: string };
  };
}
