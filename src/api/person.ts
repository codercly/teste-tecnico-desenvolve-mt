import api from '@/lib/axiosConfig'
import { IAditionalInfo, IPessoaDesaparecida } from '@/types/Person'
import { IPaginatedResponse } from '@/types/Pageble'
import { IFilter } from '@/types/Filters'

export const getPeople = async (filter: IFilter) => {
  try {
    const response = await api.get<IPaginatedResponse<IPessoaDesaparecida>>(
      `/v1/pessoas/aberto/filtro`,
      {
        params: { ...filter, porPagina: 12 },
      }
    )

    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao carregar pessoas')
  }
}

export const getPeopleById = async (id: number) => {
  try {
    const response = await api.get<IPessoaDesaparecida>(`/v1/pessoas/${id}`)

    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao carregar pessoa')
  }
}

export async function addData(data: IAditionalInfo) {
  try {
    const response = await api.post(
      '/v1/ocorrencias/informacoes-desaparecido',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    console.log(response.data)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Erro ao enviar informações adicionais'
    )
  }
}
