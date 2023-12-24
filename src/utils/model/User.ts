import {Summary} from "@/utils/model/Summary";

export interface User {
    uid?: number;
    email: string;
    password?: string;
    username: string;
    current_streak: number;
    max_streak: number;
    like?: Summary[];
    summaries?: Summary[];
}