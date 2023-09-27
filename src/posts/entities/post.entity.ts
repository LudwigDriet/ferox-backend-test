import {Entity, Column,PrimaryGeneratedColumn,CreateDateColumn ,ManyToOne} from "typeorm"
import { User } from '../../users/entities/user.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    titulo:string

    @Column()
    descripcion:string

    @Column()
    imagen:string

    @CreateDateColumn()
    createAt:string

    @ManyToOne(()=>User,(user)=>user.id,{
    
    eager: true,
  })
    user_id:string
}
