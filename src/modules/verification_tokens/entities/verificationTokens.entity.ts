import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity({ name: 'user_verification_tokens' })
export class UserVerificationTokenEntity extends EntityHelper {
    @PrimaryGeneratedColumn('uuid')
    token: string;

    @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    userId: UserEntity;

    @Column({ type: 'timestamp', nullable: false })
    expiresAt: Date;

    @Column({ type: 'enum', enum: ['EMAIL_VERIFICATION', 'PASSWORD_RESET'], nullable: false })
    type: string;

    @CreateDateColumn()
    createdAt: Date;
}
