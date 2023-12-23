import {Summary} from "@/utils/model/Summary";

export interface User {
    uid?: number;
    email: string;
    password?: string;
    username: string;
    like?: Summary[];
    summaries?: Summary[];
}