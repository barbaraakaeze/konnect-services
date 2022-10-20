import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ServiceVersion extends BaseEntity {
 @PrimaryGeneratedColumn()
 id: number;

 @Column({ nullable: true })
 versionId?: number;

 @ManyToOne(() => ServiceVersion, version => version.id)
 @JoinColumn({ name: "versionId" })
 public version?: ServiceVersion;

 @UpdateDateColumn({ name: 'valid_from', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
 validFrom: Date;

 @UpdateDateColumn({ name: 'valid_to', type: 'timestamptz', nullable: true })
 validTo: Date;
}
