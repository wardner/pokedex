import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn} from 'typeorm';
import { Type } from './type';
import { User } from './user';

@Entity()
export class Pokemon{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    pokeId: number;

    @Column({
        nullable: false
    })
    name: string;

    @Column({
        nullable: true
    })
    picture: string;

    @Column({
        nullable: true
    })
    color: string;

    @Column({
        nullable: true
    })
    description: string;

    @ManyToMany(type => Type, {
        eager: true
    })
    @JoinTable()
    types: Type[];

    @ManyToOne(type => User, user => user.id)
    user: User;

}