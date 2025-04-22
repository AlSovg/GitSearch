import React from "react";
import { useSearchStore} from "@/stores/searchStore";

export const useSearch = () => {
    const {searchedRepos, searchRepos,  loading, getRepos} = useSearchStore()


    React.useEffect(() => {
        getRepos().then();
    }, [getRepos]);


    return{
        searchedRepos,
        searchRepos,
        loading
    }
}