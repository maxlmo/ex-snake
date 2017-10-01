import {Table, Column, Model, HasMany, CreatedAt, UpdatedAt} from 'sequelize-typescript';

@Table
export default class Score extends Model<Score> {

    @Column
    public name: string;

    @Column
    public score: number;
}
