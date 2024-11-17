import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { RoleEntity } from 'src/modules/roles/entities/role.entity';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity({ name: 'user_roles' })
export class UserRoleEntity extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    userId: UserEntity;

    @ManyToOne(() => RoleEntity, (role) => role.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'role_id' })
    roleId: RoleEntity;

    @CreateDateColumn()
    assignedAt: Date;
}
