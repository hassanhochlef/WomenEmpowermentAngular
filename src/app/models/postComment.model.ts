import {User} from "./user.model";

export class PostComment {
    commentId: number;
    commentBody: string;
    commentedAt: string;
    user: User;
    Commentreply: PostComment[];
}
