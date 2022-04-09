import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { StudiosModule } from './studios/studios.module';
import { SchedulesModule } from './schedules/schedules.module';
import { TagsModule } from './tags/tags.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'onboard',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    MoviesModule,
    StudiosModule,
    SchedulesModule,
    TagsModule,
    OrdersModule,
    OrderItemsModule,
    AuthModule,
  ],
})
export class AppModule {}
