import { ProfileEntity } from "../../../modules/profiles/entities/profile.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, Relation } from "typeorm";

@Entity({name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn({unsigned: true})
    id: number;
    @Column({type:'varchar', length: 50, nullable: true})
    username?: string;
    @Column({type: 'varchar', length: 25, nullable: true})
    tel?: string;
    @Column({nullable: true})
    password?: string;
    @Column({nullable: true})
    gmail?: string;
    
    @OneToOne(() => ProfileEntity, (profile) => profile.user)
    profile?: Relation<ProfileEntity>;

    @CreateDateColumn()
    create_at!: Date;
    @UpdateDateColumn()
    update_at!: Date;
    @DeleteDateColumn({nullable: true})
    delete_at?: Date
}