import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  breed: string;

  @Column()
  age: number;
}
