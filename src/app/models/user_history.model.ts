export interface Comment {
  passId: string;
  comment: string;
}

export interface UserHistory {
  id: string;
  userId: string;
  passIds: string[];
  comments: Comment[];
}
