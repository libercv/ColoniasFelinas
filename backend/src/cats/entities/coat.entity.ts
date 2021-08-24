import { Field, Int, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cat } from "./cat.entity";

@Entity()
@ObjectType()
export class Coat extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String )
  name: string;
  
  @OneToMany(() => Cat, (cat) => cat.coat)
  @Field(() => [Cat] )
  cats: Promise<Cat[]>;
}
