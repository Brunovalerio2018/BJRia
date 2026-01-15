/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { IaService } from 'src/module/ia.controller';


export type ComponentStatus = {
  name: string;
  status: string;
  colorCode: string;
  statusCode: 'online' | 'connecting' | 'offline';
};

@Injectable()
export class StatusService {
  constructor(private readonly iaService: IaService) {}

     getStatus() {
    const components: ComponentStatus[] = [];

    // API
    components.push({
      name: 'API',
      status: '🟢 Online',
      colorCode: '#00ff00',
      statusCode: 'online',
    });

    // Banco
    const dbAlive = this.iaService.checkDatabase();
    components.push(
      dbAlive
        ? {
            name: 'Banco PostgreSQL',
            status: '🟢 Online',
            colorCode: '#00ff00',
            statusCode: 'online',
          }
        : {
            name: 'Banco PostgreSQL',
            status: '🔴 Offline',
            colorCode: '#ff0000',
            statusCode: 'offline',
          },
    );

    // IA
    const iaAlive = this.iaService.checkIA();
    components.push(
      iaAlive
        ? {
            name: 'IA (Gemini)',
            status: '🟢 Online',
            colorCode: '#00ff00',
            statusCode: 'online',
          }
        : {
            name: 'IA (Gemini)',
            status: '🔴 Offline',
            colorCode: '#ff0000',
            statusCode: 'offline',
          },
    );

    return {
      components,
      timestamp: new Date().toISOString(),
    };
  }
}
export { IaService };

