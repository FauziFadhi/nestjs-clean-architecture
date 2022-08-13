import { IParanoidTimestamp, Optional } from "@utils/base-class/base.interface";
import { Model, Table } from "sequelize-typescript";

interface INullableAttr {

}

interface IGeneratedAttr extends IParanoidTimestamp {
  id: number;
}

export interface IModel extends IGeneratedAttr, Optional<INullableAttr> {

}

type IModelCreateAttr = IModel & Partial<IGeneratedAttr>


@Table({
  tableName: 'tableName',
  paranoid: true,
})
export class TableName extends Model<IModel, IModelCreateAttr> {

}
