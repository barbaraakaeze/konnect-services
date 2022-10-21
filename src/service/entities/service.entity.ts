import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { VersionedEntity } from "typeorm-versions";

@Entity()
@VersionedEntity()
export class Services extends BaseEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
createdAt: Date;

 @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
 updatedAt: Date;

 @Column({ name: 'name', type: 'varchar' })
 name: string;

 @Column({ name: 'description', type: 'varchar', nullable: true, length: 255 })
 description?: string;

 @VersionColumn({ name: 'versions', type: 'int' })
 versions: number;
}
