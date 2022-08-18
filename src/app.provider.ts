import { AppConfigModule } from '@infra/config/app/config.module';
import { CacheConfigModule } from '@infra/config/cache/config.module';
import { DBConfigModule } from '@infra/config/sequelize/config.module';

export const CONFIG_MODULES = [
  AppConfigModule,
  // CacheConfigModule,
  DBConfigModule,
];
