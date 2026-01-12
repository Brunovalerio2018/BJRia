import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SystemStatus } from '../dtto/status.dto';



@Injectable()
export class HealthService {
  constructor(private dataSource: DataSource) {}

  async checkPostgres(): Promise<SystemStatus> {
    try {
      await this.dataSource.query('SELECT 1');
      return { service: 'PostgreSQL', status: 'green' };
    } catch (err) {
      return { service: 'PostgreSQL', status: 'red', message: err.message };
    }
  }

  async checkAPI(): Promise<SystemStatus> {
    return { service: 'API', status: 'green' };
  }

  async checkIA(): Promise<SystemStatus> {
    try {
      const iaUrl = process.env.IA_URL || 'http://localhost:5050/health';
      const res = await fetch(iaUrl);
      if (res.ok) return { service: 'IA', status: 'green' };
      return { service: 'IA', status: 'orange', message: 'IA retornou não-ok' };
    } catch (err) {
      return { service: 'IA', status: 'red', message: err.message };
    }
  }

  async getAllStatuses(): Promise<SystemStatus[]> {
    const [postgres, api, ia] = await Promise.all([
      this.checkPostgres(),
      this.checkAPI(),
      this.checkIA(),
    ]);
    return [postgres, api, ia];
  }
}
