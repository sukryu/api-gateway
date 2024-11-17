import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity({ name: 'user_followers' })
export class UserFollowerEntity extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'follower_id' })
    followerId: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'followed_id' })
    followedId: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'enum', enum: ['PENDING', 'ACCEPTED'], default: 'PENDING' })
    status: string;
}
