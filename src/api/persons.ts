import api from '@/lib/axiosConfig'
import { IAditionalInfo, IPessoaDesaparecida } from '@/types/Person'
import { IPaginatedResponse } from '@/types/Pageble'
import { IFilter } from '@/types/Filters'
import axios from 'axios'

export const getPersons = async (filter: IFilter) => {
  try {
    const response = await api.get<IPaginatedResponse<IPessoaDesaparecida>>(
      `/v1/pessoas/aberto/filtro`,
      {
        params: { ...filter, porPagina: 12 },
      }
    )

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Erro ao carregar pessoas'
      )
    }

    throw new Error('Erro desconhecido')
  }
}

export const getPersonsById = async (id: number) => {
  try {
    const response = await api.get<IPessoaDesaparecida>(`/v1/pessoas/${id}`)

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Erro ao carregar pessoa'
      )
    }
    throw new Error('Erro desconhecido')
  }
}

export async function addPersonData(data: IAditionalInfo) {
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
    return response.data

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Erro ao enviar informações adicionais'
      )
    }
    throw new Error('Erro desconhecido')
  }
}
