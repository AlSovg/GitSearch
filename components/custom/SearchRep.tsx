"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import React from "react";
import { searchRepSchema, TSearchValues } from "@/schemas/searchRepSchema";
import {useSearch} from "@/hooks/useSearch";

interface Props {
    className?: string;
}

export const SearchRep: React.FC<Props> = ({ className }) => {
    const form = useForm<TSearchValues>({
        resolver: zodResolver(searchRepSchema),
        defaultValues: {
            text: "",
        },
    });

    const {searchRepos} = useSearch()
    const onSubmit = async (values: TSearchValues) => {
        await searchRepos(values.text);
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        form.setValue("text", e.target.value);

        const isValid = await form.trigger("text");
        if (isValid) {
            await form.handleSubmit(onSubmit)();
        }
    };


    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn(className, "flex gap-2")}>
            <div className="flex flex-col flex-1 h-[60px]">
                <Input
                    {...form.register("text")}
                    placeholder="Введите название или описание..."
                    aria-invalid={!!form.formState.errors.text}
                    aria-describedby="search-error"
                    onChange={handleChange}
                />
                {form.formState.errors.text && (
                    <p id="search-error" className="text-sm text-red-500">
                        {form.formState.errors.text.message}
                    </p>
                )}
                {!form.formState.errors.text && (
                    <p className="text-sm text-gray-500 ml-2">
                        Поиск по имени, описанию и темам
                    </p>
                )}
            </div>
        </form>
    );
};
