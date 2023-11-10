import { UserEntity } from "../../../modules/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, Relation, JoinColumn } from "typeorm";

@Entity({name: 'profiles'})
export class ProfileEntity {
    @PrimaryGeneratedColumn({unsigned: true})
    id: number;
    @Column({type:'varchar', length: 50, nullable: true})
    first_name?: string;
    @Column({type: 'varchar', length: 25, nullable: true})
    last_name?: string;
    @Column({nullable: true})
    profile_image?: string;
    @Column({nullable: true})
    gender?: string;
    @Column({nullable: true})
    dob?: Date
    @Column({nullable: true})
    user_id?: number;
    @OneToOne(() => UserEntity, (user) => user.profile,{
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
    @JoinColumn({name:'user_id'})
    user: Relation<UserEntity>;
    @CreateDateColumn()
    create_at!: Date;
    @UpdateDateColumn()
    update_at!: Date;
    @DeleteDateColumn({nullable: true})
    delete_at?: Date
}