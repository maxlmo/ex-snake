import {Table, Column, Model, HasMany, CreatedAt, UpdatedAt} from 'sequelize-typescript';

@Table
export default class Score extends Model<Score> {

    @Column({primaryKey: true})
    public id: number;

    @Column
    public name: string;

    @Column
    public score: number;
}
