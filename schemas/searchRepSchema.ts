import z from "zod"

export const searchRepSchema = z.object({
    text: z.string().min(2, "Запрос не должен быть меньше 2-х символов"),
});

export type TSearchValues = z.infer<typeof searchRepSchema>;