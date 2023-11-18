import {Flashcard} from "@/utils/model/Flashcard";

export interface Summary {
    title: string;
    category_id: number;
    ownerId: number;
    summaryId: number;
    isPublic: boolean;
    flashCard: Flashcard[];
    path?: string;
}