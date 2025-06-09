type CommentUser = {
  id: number;
  username: string;
  fullName: string;
};

export type BlogComment = {
  id: number;
  body: string;
  postId: number;
  user: CommentUser;
};

export type CommentsResponse = {
  comments: BlogComment[];
};
