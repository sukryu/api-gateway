import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity({ name: 'user_privacy_settings' })
export class UserPrivacySettingEntity extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    userId: UserEntity;

    @Column({ type: 'enum', enum: ['PUBLIC', 'FRIENDS_ONLY', 'PRIVATE'], default: 'PUBLIC' })
    profileVisibility: string;

    @Column({ type: 'boolean', default: true })
    lastSeenVisibility: boolean;

    @Column({ type: 'boolean', default: true })
    activityStatus: boolean;
}
