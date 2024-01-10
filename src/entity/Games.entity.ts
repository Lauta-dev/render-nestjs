import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("games")
export class Games {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("text")
  title: string;
}
