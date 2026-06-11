export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  shows: number;
}

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  status: 'new' | 'contacted' | 'interested';
}

export interface BlockedDate {
  date: string;
  reason: string;
}
