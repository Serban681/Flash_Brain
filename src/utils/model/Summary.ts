import {Flashcard} from "@/utils/model/Flashcard";

export interface Summary {
    summaryId: number;
    title: string;
    category_id: number;
    ownerId: number;
    isPublic: boolean;
    flashCards: Flashcard[];
    path?: string;
    likes?: number[];
}