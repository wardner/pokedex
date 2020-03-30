import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany, JoinTable, JoinColumn } from 'typeorm';
import bcrypt from 'bcryptjs';
import { Pokemon } from './pokemon';
import { getPokes } from '../controllers/pokemon.controllers';


enum genres {
    Male = 'male',
    Female = 'female',
    NonBinary = 'nonbinary'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column({
        unique: true
    })
    username: string;

    @Column({
        nullable: true
    })
    picture: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column({
        default: false,
    })
    google: boolean;

    @Column({
        default: true
    })
    isActive: boolean;

    @Column({
        type: 'enum',
        enum: genres
    })
    gender: genres;

    @OneToMany(type => Pokemon, pokes => Pokemon, {})
    pokes: Pokemon[];

    @BeforeInsert()
    async encryptPassword() {
        const hash = bcrypt.hashSync(this.password, 10);
        this.password = hash;
        return this.password;
    }

    comparePassword = async (password: string): Promise<boolean> =>
        bcrypt.compareSync(password, this.password);
}