import {Flashcard} from "@/utils/model/Flashcard";
import {Like} from "@/utils/model/Like";

export interface Summary {
    summaryId: number;
    title: string;
    category_id: number;
    ownerId: number;
    isPublic: boolean;
    flashCards: Flashcard[];
    path?: string;
    likes?: Like[];
}