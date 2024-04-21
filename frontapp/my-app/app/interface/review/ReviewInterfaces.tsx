import { MemberInterface } from "../user/MemberInterfaces";
export interface ReviewInterface {
  id: number;
  content: string;
  createdDate: string;
  modifiedDate: string;
  author: MemberInterface;
}
