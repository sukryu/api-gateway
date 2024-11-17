import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity({ name: 'user_profiles' })
export class UserProfileEntity extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    userId: UserEntity;

    @Column({ type: 'varchar', nullable: true })
    location: string;

    @Column({ type: 'varchar', nullable: true })
    website: string;

    @Column({ type: 'date', nullable: true })
    birthday: Date;

    @Column({ type: 'enum', enum: ['MALE', 'FEMALE', 'OTHER'], nullable: true })
    gender: string;

    @Column({ type: 'json', nullable: true })
    preferences: Record<string, any>;

    @Column({ type: 'varchar', nullable: true })
    language: string;
}
