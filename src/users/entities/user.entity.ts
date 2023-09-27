import { Post } from "../../posts/entities/post.entity"
import {Entity, Column,PrimaryGeneratedColumn , OneToMany} from "typeorm"


@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    password:string

    @Column()
    email:string

    @OneToMany(()=>Post,(post)=>post.id)
    post:Post[]
}
