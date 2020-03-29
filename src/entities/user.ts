import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert} from 'typeorm';
import bcrypt from 'bcryptjs';


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

    @BeforeInsert()
    async encryptPassword() {
        const hash = await bcrypt.hashSync(this.password, 10);
        this.password = hash;
        return this.password;
    }
}