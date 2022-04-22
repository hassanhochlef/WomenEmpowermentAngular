import {PostComment} from './postComment.model';
import {PostLike} from './postLike.model';
import {User} from './user.model';

export class Post {
    postId: string;
    body: string;
    createdAt: string;
    nb_Signal: number;
    nb_etoil: number;
    postTitle: string;
    postComments: PostComment[];
    postLikes: PostLike[];
    user: User;
}
