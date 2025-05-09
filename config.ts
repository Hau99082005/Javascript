import {z} from "zod";

const configSchema = z.object({
    NEXT_PUBLIC_API_ENDPOINT: z.string(),
    NEXT_PUBLIC_URL: z.string(),
    NEXT_PUBLIC_USER: z.string(),
    NEXT_PUBLIC_PASSWORD: z.string(),
    NEXT_PUBLIC_DATABASE: z.string(),
})

const configProject = configSchema.safeParse({
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_USER: process.env.NEXT_PUBLIC_USER,
    NEXT_PUBLIC_PASSWORD: process.env.NEXT_PUBLIC_PASSWORD,
    NEXT_PUBLIC_DATABASE: process.env.NEXT_PUBLIC_DATABASE,
})

if(!configProject.success) {
    console.error(configProject.error.errors);
    throw new Error("Khai báo biến môi trường không hợp lệ");
}

const envConfig = configProject.data

export default envConfig;