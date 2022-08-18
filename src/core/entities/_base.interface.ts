export interface ITimestamp {
  createdAt: Date;
  updatedAt: Date;
}
export interface IParanoidTimestamp extends ITimestamp {
  deletedAt: Date;
}

export type Optional<T> = {
  [P in keyof T]?: T[P] | null;
};
