import {Card, CardContent} from '@/components/ui/card';
import {GitFork, Star} from 'lucide-react';
import Image from 'next/image';
import {Rep} from '@/models/rep';
import styles from './RepositoryCard.module.scss';
import React from "react";

interface Props {
    repo: Rep;
}

export const RepositoryCard: React.FC<Props> = ({repo}) => {
    return (
        <Card className={styles.repositoryCard}>
            <CardContent className={styles.repositoryCard__content}>
                <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.repositoryCard__link}
                >
                    {repo.full_name}
                </a>
                <p className={styles.repositoryCard__description}>
                    {repo.description || 'Описание отсутствует.'}
                </p>
                <div className={styles.repositoryCard__footer}>
                    <div className={styles['repository-card__owner']}>
                        <Image
                            width={30}
                            height={30}
                            src={repo.owner.avatar_url}
                            alt={repo.owner.login}
                            className={styles.repositoryCard__avatar}
                        />
                        <span>{repo.owner.login}</span>
                    </div>
                    <div className={styles.repositoryCard__stats}>
                        <span className={styles.repositoryCard__stat}>
                          <Star size={14}/> {repo.stargazers_count}
                        </span>
                        <span className={styles.repositoryCard__stat}>
                          <GitFork size={14}/> {repo.forks_count}
                        </span>
                        {repo.language &&
                            <span>{repo.language}</span>}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
