import {ReplayResponse} from './replay-response';

export class ReportDetails {
  id: number;
  description: string;
  image: string;
  street: string;
  houseNumber: string;
  city: string;
  coordinate: string;
  active: boolean;
  authorId: number;
  creationDate: string;
  replayList: ReplayResponse[];
}
