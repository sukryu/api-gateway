import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { ActivityLogs } from '../activity_logs.enum';

@Entity({ name: 'user_activity_logs' })
export class UserActivityLogEntity extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    userId: UserEntity;

    @Column({ type: 'enum', enum: ActivityLogs, nullable: false })
    activityType: string;

    @Column({ type: 'json', nullable: true })
    details: Record<string, any>;

    @CreateDateColumn()
    timestamp: Date;
}
