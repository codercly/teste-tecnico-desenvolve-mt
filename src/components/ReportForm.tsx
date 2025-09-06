'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog'
import { DialogClose, DialogFooter, DialogHeader } from './ui/dialog'
import { addData } from '@/api/person'
import { toast } from 'sonner'

const formSchema = z.object({
  informacao: z.string().min(10, {
    message: 'A informação deve ter no mínimo 10 caracteres.',
  }),
  descricao: z.string().min(10, {
    message: 'A descrição deve ter no mínimo 10 caracteres.',
  }),
  data: z.string(),
  files: z.any().optional(),
})

export default function ReportForm({ ocoId }: { ocoId: number }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      informacao: '',
      descricao: '',
      data: '',
      files: undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await addData({
      data: values.data,
      informacao: values.informacao,
      descricao: values.descricao,
      ocoId: ocoId,
    })

    if (res.id) {
      toast.success('Informação adicionada com sucesso!', {
        description: 'Obrigado pela colaboração!',
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      form.setValue('files', e.target.files)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto rounded-2xl shadow-md">
          Tem mais informações sobre esta pessoa? Clique aqui
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg rounded-2xl p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-semibold">
            Informações adicionais
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Preencha o formulário abaixo para enviar informações adicionais sobre
            a pessoa desaparecida. Sua contribuição é muito importante para ajudar
            na busca e localização dela.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="informacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Informação</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Foi visto na praça central"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Digite de forma breve a informação que você possui.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva em mais detalhes a situação ou qualquer detalhe relevante..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Forneça o máximo de detalhes que puder.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="data"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} value={String(field.value)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="files"
              render={() => (
                <FormItem>
                  <FormLabel>Arquivos (opcional)</FormLabel>
                  <FormControl>
                    <Input
                      onChange={handleFileChange}
                      accept="image/*"
                      type="file"
                      multiple
                    />
                  </FormControl>
                  <FormDescription>
                    Você pode enviar fotos ou documentos que ajudem na
                    identificação.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button variant="outline" className="rounded-lg">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="rounded-lg"
              >
                {form.formState.isSubmitting ? 'Enviando...' : 'Enviar informação'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
