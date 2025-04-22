"use client"
import {SearchForm} from "@/components/custom/SearchForm/SearchForm";
import {RepList} from "@/components/custom/RepList";
import {useSearch} from "@/hooks/useSearch";


export default function Home() {
    const repHook = useSearch()
  return (
    <div className="flex flex-col h-[50%] overflow-hidden p-5 w-full">
        <SearchForm
            searchEvent={repHook.searchRepos}
        />
        <RepList
            repos={repHook.searchedRepos}
            loading={repHook.loading}
        />
    </div>
  );
}
