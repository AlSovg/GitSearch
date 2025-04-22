import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import React from "react";
import { searchRepSchema, TSearchValues } from "@/schemas/searchRepSchema";
import styles from "./SearchForm.module.scss"

interface Props {
    className?: string;
    searchEvent : (text :string) => Promise<void>;
}

export const SearchForm: React.FC<Props> = ({ className, searchEvent }) => {
    const form = useForm<TSearchValues>({
        resolver: zodResolver(searchRepSchema),
        defaultValues: {
            text: "",
        },
    });
    const onSubmit = async (values: TSearchValues) => {
        await searchEvent(values.text);
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        form.setValue("text", e.target.value);

        const isValid = await form.trigger("text");
        if (isValid) {
            await form.handleSubmit(onSubmit)();
        }
    };


    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn(className, styles.searchForm)}
        >
            <div className={styles.searchForm__FieldWrapper}>
                <Input
                    {...form.register('text')}
                    placeholder="Введите название или описание..."
                    aria-invalid={!!form.formState.errors.text}
                    aria-describedby="search-error"
                    onChange={handleChange}
                />
                {form.formState.errors.text ? (
                    <p id="search-error" className={styles.searchForm__Error}>
                        {form.formState.errors.text.message}
                    </p>
                ) : (
                    <p className={styles.searchForm__Hint}>
                        Поиск по имени, описанию и темам
                    </p>
                )}
            </div>
        </form>
    );
};
