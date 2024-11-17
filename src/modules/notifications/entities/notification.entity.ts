import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity({ name: 'user_notifications' })
export class UserNotificationEntity extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    userId: UserEntity;

    @Column({ type: 'text', nullable: false })
    message: string;

    @Column({ type: 'boolean', default: false })
    isRead: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'enum', enum: ['FOLLOW_REQUEST', 'MENTION', 'COMMENT'], nullable: false })
    type: string;
}
