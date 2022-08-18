/* eslint-disable @typescript-eslint/ban-types */
import {
  Model, ModelCtor,
} from 'sequelize-typescript';
import { cloneDeep } from 'lodash';
import {
  CreateOptions, DeleteOptions, FindByIdOptions, FindOptions, IRepository, UpdateOptions,
} from '../interface/_repository.interface';

export class SequelizeRepository<Entity, CreateEntity, M extends Model>
implements IRepository<Entity, CreateEntity> {
  constructor(
    protected readonly model: ModelCtor<M>,
  ) {

  }

  async findAll(options?: FindOptions<Entity>): Promise<Entity[]> {
    return this.model.findAll({
      ...options,
      raw: true,
      where: {
        ...options?.where,
      },
    } as any) as unknown as Entity[];
  }

  async findById(id: string | number | Buffer, options?: FindByIdOptions): Promise<Entity | null> {
    const model: Entity | null = await this.model.findByPk(
      id,
      { ...options, raw: true },
    ) as unknown as Entity;
    return model;
  }

  async create(dto: CreateEntity, options?: CreateOptions): Promise<Entity> {
    return this.model.create(dto as any, options) as unknown as Entity;
  }

  async createMany(dto: CreateEntity[], options?: CreateOptions): Promise<Entity[]> {
    return this.model.bulkCreate(dto as any, options) as unknown as Entity[];
  }

  async updateById(id: string | number | Buffer | Entity, dto: Partial<Entity>, options?: Omit<UpdateOptions<Entity>, 'where'>): Promise<void> {
    await this.model.update(dto, {
      ...options,
      where: {
        [this.model.primaryKeyAttribute]: id,
      } as any,
    });
  }

  async updateMany(dto: Partial<Entity>, options?: UpdateOptions<Entity>): Promise<void> {
    await this.model.update(dto, options as any);
  }

  async deleteById(id: number, options?: Omit<DeleteOptions<Entity>, 'where'>): Promise<void> {
    await this.model.destroy({
      where: {
        [this.model.primaryKeyAttribute]: id,
      } as any,
      ...options,
    });
  }

  async deleteMany(options?: DeleteOptions<Entity>): Promise<void> {
    await this.model.destroy(options as any);
  }

  protected async findPaginate(options: FindOptions<Entity>): Promise<{ rows: Entity[]; count: number; }> {
    const countOptions = cloneDeep(options);

    delete countOptions.subQuery;
    delete countOptions.attributes;

    const [count, rows] = await Promise.all([
      this.model.count(countOptions as any),
      this.model.findAll(options as any),
    ]);
    return {
      count: Array.isArray(count) ? count[0].count : count,
      rows: rows as unknown as Entity[],
    };
  }
}
