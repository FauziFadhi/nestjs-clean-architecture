interface WhereOptions<TAttributes = any> {
  where?: Partial<TAttributes> | any
}

interface Transactionable {
  /**
   * for `sequelize`
   *
   */
  transaction?: any | null;
}
interface Paranoid {
  /**
   * If true, only non-deleted records will be returned.
   * If false, both deleted and non-deleted records will
   * be returned. Only applies if `options.paranoid` is true for the model.
   */
  paranoid?: boolean;
}

export interface UpdateOptions<TAttributes = any> extends
  Transactionable, Paranoid, WhereOptions<TAttributes> {

}

export interface CreateOptions extends Transactionable {
  ignoreDuplicates?: boolean;
}

export interface DeleteOptions<TAttributes = any> extends
  Transactionable, WhereOptions<TAttributes>, Paranoid {

}

export interface FindOptions<TAttributes = any> extends Transactionable,
  WhereOptions<TAttributes>, Paranoid {
  limit?: number;
  offset?: number;
  subQuery?: boolean;
  attributes?: keyof TAttributes[]
}

export interface FindByIdOptions extends Transactionable, Paranoid {
  rejectOnEmpty?: boolean | Error;
  subQuery?: boolean;
}

export interface IRepository<Entity, CreateEntity> {
  findAll(options?: FindOptions<Entity>): Promise<Entity[]>

  findById(id: number | string | Buffer, options?: FindByIdOptions): Promise<Entity | null>

  create(dto: CreateEntity, options?: CreateOptions): Promise<Entity>
  createMany(dto: CreateEntity[], options?: CreateOptions): Promise<Entity[]>

  updateById(id: number, dto: Partial<Entity>, options?: Omit<UpdateOptions<Entity>, 'where'>): Promise<void>
  updateMany(dto: Partial<Entity>,
    options?: UpdateOptions<Entity>): Promise<void>

  deleteById(id: number, options?: Omit<DeleteOptions<Entity>, 'where'>): Promise<void>
  deleteMany(options?: DeleteOptions<Entity>): Promise<void>
}
