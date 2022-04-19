import {PostComment} from "./postComment.model";

export class Post {
    postId: string;
    body: string;
    createdAt: string;
    nb_Signal: number;
    nb_etoil: number;
    postTitle: string;
    postComments: PostComment[];

}
