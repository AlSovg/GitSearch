import React from 'react';
import {Rep} from "@/models/rep";
import {GitFork, Star} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image";


interface Props {
    repo: Rep;
}

export const RepositoryCard: React.FC<Props> = ({ repo }) => {
    return (
        <Card className="w-full hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4 flex flex-col gap-2">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-600 hover:underline">
                    {repo.full_name}
                </a>
                <p className="text-sm text-gray-700">{repo.description || "Описание отсутствует."}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <Image
                            width={30}
                            height={30}
                            src={repo.owner.avatar_url}
                            alt={repo.owner.login}
                            className="w-6 h-6 rounded-full"
                        />
                        <span>{repo.owner.login}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <Star size={14} /> {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                            <GitFork size={14} /> {repo.forks_count}
                        </span>
                        {repo.language && <span>{repo.language}</span>}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
