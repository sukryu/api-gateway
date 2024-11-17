import { Expose } from "class-transformer";
import { AuthProvider } from "src/auth/auth-provider.enum";
import { EntityHelper } from "src/utils/entity-helper";
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'users'
})
export class UserEntity extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ type: 'varchar', nullable: false, unique: true, length: 50 })
    email: string;

    @Index()
    @Column({ type: 'varchar', nullable: false, unique: true, length: 50 })
    username: string;

    @Expose({ toPlainOnly: true })
    @Column({ type: 'varchar', nullable: true })
    password: string | null;

    @Index()
    @Column({ type: 'varchar', nullable: true, unique: true })
    socialId: string | null;

    @Column({ type: 'varchar', nullable: false, default: AuthProvider.EMAIL })
    provider: string;

    @Column({ type: 'varchar', nullable: true })
    profileImageUrl: string;

    @Column({ type: 'text', nullable: true })
    bio: string | null;

    @Index()
    @Column({ type: 'varchar', nullable: false, unique: true })
    phoneNumber: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'boolean', default: false })
    isActive: boolean;

    @Column({ type: 'boolean', default: false })
    isVerified: boolean;

    constructor(data: Partial<UserEntity> = {}) {
        super()
        Object.assign(this, data);
    }
}