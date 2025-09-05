"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import { DialogClose, DialogFooter, DialogHeader } from "./ui/dialog"
import { addData } from "@/api/person"
import { toast } from "sonner"



const formSchema = z.object({
    informacao: z.string().min(10, {
        message: "A informação deve ter no mínimo 10 caracteres.",
    }),
    descricao: z.string().min(10, {
        message: "A descrição deve ter no mínimo 10 caracteres.",
    }),
    data: z.string(),
    files: z.any().optional(),
})

export default function ReportForm({ ocoId }: { ocoId: number }) {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            informacao: "",
            descricao: "",
            data: "",
            files: undefined,
        }
    })



    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await addData(
            {
                data: values.data,
                informacao: values.informacao,
                descricao: values.descricao,
                ocoId: ocoId,
            }
        )

        console.log({ res })

        if (res.id) {
            toast.success("Informação adicionada com sucesso!", {
                description: "Obrigado pela colaboração!",
            });

            console.log('resposta', res);
        }
    }



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            form.setValue("files", e.target.files);
        }
    }


    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Tem mais informações sobre esta pessoa ? entao clique aqui</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Informações adicionais</DialogTitle>
                        <DialogDescription>
                            Preencha o formulário abaixo para enviar informações adicionais sobre a pessoa desaparecida. Sua contribuição é muito importante para ajudar na busca e localização dela.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="informacao"
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormLabel>Informação</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Informe algo que possa ajudar na localização" {...field} />
                                        </FormControl>
                                        <FormDescription>Descreva a informação que você possui.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="descricao"
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormLabel> Descrição</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Descreva a situação ou qualquer detalhe relevante" {...field} />
                                        </FormControl>
                                        <FormDescription>Descreva a situação ou qualquer detalhe relevante.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}

                            />
                            <FormField
                                control={form.control}
                                name="data"
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormLabel>Data</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Informe a data" type="date" {...field} value={String(field.value)} />
                                        </FormControl>
                                        <FormDescription>Descreva a situação ou qualquer detalhe relevante.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="files"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Arquivos</FormLabel>
                                        <FormControl>
                                            <Input
                                                onChange={handleFileChange}
                                                size={5}
                                                accept="image/*"
                                                type="file"
                                                multiple
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancelar</Button>
                                </DialogClose>
                                <Button disabled={form.formState.isSubmitting} type="submit">
                                    {form.formState.isSubmitting
                                        ? "Enviando..."
                                        : "Enviar informação"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
