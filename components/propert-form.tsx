"use client";

import { useForm } from "react-hook-form";
import { bookDataSchema } from "@/validation/propertySchema";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

type Props = {
    submitButtonLabel: React.ReactNode;
    handleSubmit: (data: z.infer<typeof bookDataSchema>) => void;
}

export default function PropertyForm({handleSubmit, submitButtonLabel}:Props) {
    const form = useForm<z.infer<typeof bookDataSchema>>({
        resolver: zodResolver(bookDataSchema),
        defaultValues: {
            title: "",
            subtitle: "",
            author: "",
            isbn: "",
            price: 0,
            description: "",
            stock: 0,
            pages: 0,
            status: "đang bán",
            
        }
    });
    return <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
         <div className="grid grid-cols-2 gap-4">
           <fieldset className="flex flex-col gap-2" disabled={form.formState.isSubmitting}>
             <FormField control={form.control} name="status" render={({field}) => (
                <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bản nháp">
                            Bản Nháp
                            </SelectItem>
                            <SelectItem value="đang bán">
                            Đang Bán
                            </SelectItem>
                            <SelectItem value="hết hàng">
                            Hết Hàng
                            </SelectItem>
                            <SelectItem value="ngừng kinh doanh">
                            Ngừng Kinh Doanh
                            </SelectItem> 
                        </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
             )}/>
             <FormField control={form.control} name="title" render={({field}) => (
                <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                       <Input {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
             )}/>
             <FormField control={form.control} name="subtitle" render={({field}) => (
                <FormItem>
                    <FormLabel>Subtitle</FormLabel>
                    <FormControl>
                       <Input {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
             )}/>
             <FormField control={form.control} name="author" render={({field}) => (
                <FormItem>
                    <FormLabel>author</FormLabel>
                    <FormControl>
                       <Input {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
             )}/>
             <FormField control={form.control} name="isbn" render={({field}) => (
                <FormItem>
                    <FormLabel>Isbn</FormLabel>
                    <FormControl>
                       <Input {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
             )}/>
           </fieldset>
           <fieldset className="flex flex-col gap-2" disabled={form.formState.isSubmitting}>
             <FormField control={form.control} name="price" render={({field}) => (
                <FormItem>
                    <FormLabel>price</FormLabel>
                    <FormControl>
                       <Input {...field} type="number"/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
             )}/>
             <FormField control={form.control} name="stock" render={({field}) => (
                <FormItem>
                    <FormLabel>stock</FormLabel>
                    <FormControl>
                       <Input {...field} type="number"/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
             )}/>
             <FormField control={form.control} name="pages" render={({field}) => (
                <FormItem>
                    <FormLabel>Pages</FormLabel>
                    <FormControl>
                       <Input {...field} type="number"/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
             )}/>
             <FormField control={form.control} name="description" render={({field}) => (
                <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                       <Textarea {...field} rows={5} className="resize-none"/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
             )}/>
           </fieldset>
         </div>
         <Button type="submit" className="max-w-md mx-auto mt-3 w-full flex gap-2"
         disabled={form.formState.isSubmitting}>{submitButtonLabel}</Button>
        </form>
    </Form>
}