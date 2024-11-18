import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { Gender } from '../gender.enum';

@Entity({ name: 'user_profiles' })
export class ProfileEntity extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.id, { 
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'user_id' })
    userId: UserEntity;

    @Column({ type: 'varchar', nullable: true })
    location: string;

    @Column({ type: 'varchar', nullable: true })
    website: string;

    @Column({ type: 'date', nullable: true })
    birthday: Date;

    @Column({ type: 'enum', enum: Gender, nullable: true, default: Gender.OTHER })
    gender: string;

    // @Column({ type: 'json', nullable: true })
    // preferences: Record<string, any>;

    @Column({ type: 'varchar', nullable: true })
    language: string;
}
