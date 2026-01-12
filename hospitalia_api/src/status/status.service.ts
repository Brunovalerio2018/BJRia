import { Injectable } from '@nestjs/common';
import { IaService } from '../ia/ia.service';
import { AppDataSource } from '../db/data-source'; // <-- chama o AppDataSource direto
import { swagConfig } from 'src/utils/swagger_config.ts';
import { IaController } from 'src/ia/ia.controller';


export type ComponentStatus = {
  name: string;
  status: string;
  colorCode: string;
  statusCode: 'online' | 'connecting' | 'offline';
};

@Injectable()
export class StatusService {
  constructor(private readonly iaService: IaService) {}

  async getStatus(): Promise<{ components: ComponentStatus[]; timestamp: string }> {
    const components: ComponentStatus[] = [];

    // 🔹 1. API
    components.push({
      name: 'API',
      status: '🟢 Online',
      colorCode: '#00ff00',
      statusCode: 'online',
    });

    // 🔹 2. Banco (usando AppDataSource)
    let dbStatus = '🟠 Tentando conectar';
    let dbColor = '#FFA500';
    let dbCode: 'connecting' | 'online' | 'offline' = 'connecting';
    try {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      await AppDataSource.query('SELECT 1'); // <-- verifica o banco de verdade
      dbStatus = '🟢 Online';
      dbColor = '#00ff00';
      dbCode = 'online';
    } catch {
      dbStatus = '🔴 Offline';
      dbColor = '#ff0000';
      dbCode = 'offline';
    }
    components.push({
      name: 'Banco PostgreSQL',
      status: dbStatus,
      colorCode: dbColor,
      statusCode: dbCode,
    });

    // 🔹 3. IA
    let iaStatus = '🟠 Tentando conectar';
    let iaColor = '#FFA500';
    let iaCode: 'connecting' | 'online' | 'offline' = 'connecting';
    try {
      const alive = await this.iaService.checkIA();
      if (alive) {
        iaStatus = '🟢 Online';
        iaColor = '#00ff00';
        iaCode = 'online';
      } else {
        iaStatus = '🔴 Offline';
        iaColor = '#ff0000';
        iaCode = 'offline';
      }
    } catch {
      iaStatus = '🔴 Offline';
      iaColor = '#ff0000';
      iaCode = 'offline';
    }
    components.push({
      name: 'IA (Gemini)',
      status: iaStatus,
      colorCode: iaColor,
      statusCode: iaCode,
    });

    return { components, timestamp: new Date().toISOString() };
  }
}
