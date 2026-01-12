export type StatusColor = 'green' | 'orange' | 'red';

export interface SystemStatus {
  service: 'IA' | 'API' | 'PostgreSQL';
  status: StatusColor;
  message?: string;
}
