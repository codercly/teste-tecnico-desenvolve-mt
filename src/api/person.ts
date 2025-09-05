import api from "@/lib/axiosConfig";
import { IAditionalInfo, IPessoaDesaparecida } from "@/types/Person";
import { IPaginatedResponse } from "@/types/Pageble";
import { IFilter } from "@/types/Filters";

export const getPeople = async (filter: IFilter) => {
  const response = await api.get<IPaginatedResponse<IPessoaDesaparecida>>(
    `/v1/pessoas/aberto/filtro`,
    {
      params: { ...filter, porPagina: 12 },
    }
  );

  return response.data;
};

export const getPeopleById = async (id: number) => {
  const response = await api.get<IPessoaDesaparecida>(`/v1/pessoas/${id}`);

  console.log(response.data);
  return response.data;
};

export async function addData(data: IAditionalInfo) {
  const response = await api.post(
    "/v1/ocorrencias/informacoes-desaparecido",
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
    
  );
  return response.data;
}
