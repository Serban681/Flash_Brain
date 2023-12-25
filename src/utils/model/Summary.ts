import {Flashcard} from "@/utils/model/Flashcard";
import {Like} from "@/utils/model/Like";

export interface Summary {
    summaryId: number;
    title: string;
    categoryId: number;
    ownerId: number;
    isPublic: boolean;
    flashcards: Flashcard[];
    path?: string;
    like?: Like[];
}