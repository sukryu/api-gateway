import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity({ name: 'roles' })
export class RoleEntity extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', unique: true, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;
}
