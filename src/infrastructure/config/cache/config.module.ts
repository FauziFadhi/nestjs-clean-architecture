import {
  CACHE_MANAGER, CacheModule, Inject, Module,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Store } from 'cache-manager';
import { CacheService } from './cache.service';

import config from './config';
import { CacheConfigProvider } from './config.provider';
import schema from './schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      validationSchema: schema,
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      useClass: CacheConfigProvider,
    }),
  ],
  providers: [CacheService],
  exports: [CacheModule, CacheService],
})
export class CacheConfigModule {
  static store: Store;

  constructor(@Inject(CACHE_MANAGER) private store: Store) {
    CacheConfigModule.store = this.store;
  }
}
