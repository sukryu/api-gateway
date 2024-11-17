import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity({ name: 'user_sessions' })
export class UserSessionEntity extends EntityHelper {
    @PrimaryGeneratedColumn('uuid')
    sessionId: string;

    @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    userId: UserEntity;

    @Column({ type: 'varchar', nullable: true })
    ipAddress: string;

    @Column({ type: 'json', nullable: true })
    deviceInfo: Record<string, any>;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: false })
    expiresAt: Date;
}
