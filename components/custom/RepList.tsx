"use client"
import React from "react";
import {RepositoryCard} from "./RepositoryCard";
import {useSearch} from "@/hooks/useSearch";
import {ScrollArea} from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton"
import { Frown } from "lucide-react"; // импортируем иконку "грустного лица"

export const RepList: React.FC = () => {
    const {searchedRepos, loading} = useSearch()

    if (loading) {
        return (
            <ScrollArea>
                {Array(10).fill(0).map((_, index) => (
                    <Skeleton key={index} className="h-6 mb-4 bg-[#ffffff]  rounded-[8px] w-full h-[250px]"/>
                ))}
            </ScrollArea>)
    }

    if (searchedRepos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center">
                <Frown className="h-8 w-8 text-red-500 animate-pulse" />
                <p className="text-sm text-red-500 mt-2">Репозитории не найдены.</p>
                <p className="text-sm text-gray-500 mt-2">Попробуйте изменить запрос или проверьте правильность ввода.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-[100%] w-[100%] overflow-y-scroll">
            {searchedRepos.map((repo) => (
                <RepositoryCard key={repo.id} repo={repo}/>
            ))}
        </div>

    );
};
