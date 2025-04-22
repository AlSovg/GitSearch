import { create } from "zustand";
import {Rep} from "@/models/rep"
import {Api} from "@/services/api";

interface SearchState {
    repos: Rep[];
    searchedRepos: Rep[];
    loading: boolean;
    getRepos: () => Promise<void>;
    searchRepos: (text: string) => Promise<void>;
}

export const useSearchStore = create<SearchState>((set, get) => ({
    repos:[],
    searchedRepos : [],
    loading : false,
    getRepos : async () => {
        set({loading: true});
        const response = await Api.repos.getRepos()
        set({repos : response.items, searchedRepos : response.items, loading: false})
    },
    searchRepos : async (text : string) => {
        const lowerText = text.toLowerCase();
        const { repos } = get();
        console.log(lowerText)
        set({searchedRepos : repos.filter(
                (repo) =>
                    repo.full_name.toLowerCase().includes(lowerText) ||
                    (repo.description && repo.description.toLowerCase().includes(lowerText)) ||
                    repo.topics?.some(topic => topic.toLowerCase().includes(lowerText))
            )});
    }
}));