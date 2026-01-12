import { DataSource } from 'typeorm'
import { connectionOptions } from './ormconfig'

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory(): Promise<DataSource> {
      return connectionOptions.initialize()
    }
  }
]
