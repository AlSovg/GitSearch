import React from "react";
import {Api} from "@/services/api";
import {Rep} from "@/models/rep";

export const useSearch = () => {
    const [repos, setRepos] = React.useState<Rep[]>([]);
    const [searchedRepos, setSearchedRepos] = React.useState<Rep[]>([]);
    const [loading, setLoading] = React.useState(true);

    const getRepos = React.useCallback(async () => {
        const response = await Api.repos.getRepos();
        setRepos(response.items);
        setSearchedRepos(response.items);
        setLoading(false);
    }, []);
    const searchRepos = React.useCallback(async (text: string) => {
        setLoading(true)
        const lowerText = text.toLowerCase();
        setSearchedRepos(repos.filter(
            (repo) =>
                repo.full_name.toLowerCase().includes(lowerText) ||
                (repo.description && repo.description.toLowerCase().includes(lowerText)) ||
                repo.topics?.some(topic => topic.toLowerCase().includes(lowerText))
        ))
        setLoading(false)
    }, [repos])


    React.useEffect(() => {
        getRepos().then()
    }, [getRepos]);


    return {
        searchedRepos,
        searchRepos,
        loading
    }
}