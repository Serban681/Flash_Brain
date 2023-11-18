import {Like} from "@/utils/model/Like";

export interface User {
    uid?: number;
    email: string;
    password?: string;
    username: string;
    likes?: Like[];
}