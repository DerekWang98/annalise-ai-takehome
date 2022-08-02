export interface TagReq {
  name: string,
  value: string
}

export interface ImageReq {
  name: string;
  userEmail: string;
  tags: TagReq[];
}