import { Api, Personagem, Episode, ActionType } from '../../types'

export const FETCH_PERSONAGENS_START = "FETCH_PERSONAGENS_START";
export const FETCH_PERSONAGENS_SUCCESS = 'FETCH_PERSONAGENS_SUCCESS';
export const FETCH_PERSONAGENS_ERROR = 'FETCH_PERSONAGENS_ERROR';
export const FAVORITAR_PERSONAGENS = "FAVORITAR_PERSONAGENS";
export const FETCH_PERSONAGEM_ID_SUCCESS = "FETCH_PERSONAGEM_ID_SUCCESS";
export const FETCH_EPISODES = "FETCH_EPISODES";

/**
 * Função que inicia a API e faz um load na página
 * @function fetchPersonagemStarted
 * @returns { ActionType } Só retorna um estado que já estava (...state) e isFetching: true
 */
export const  fetchPersonagemStarted = (): ActionType => {
    return { type: FETCH_PERSONAGENS_START };
};

/**
 * Esta função pega os personagens e a páginação na API.
 * @function fetchPersonagemSuccess
 * @param { Api } data Este é um objeto da API que passa dados da paginação e dos personagens.
 * @returns { ActionType } Retorna o payload com o array de personagens e a paginação.
 */
export const fetchPersonagemSuccess = (data: Api): ActionType => {
    return {
        type: FETCH_PERSONAGENS_SUCCESS,
        payload:  data ,
    }
}

/**
 * Esta função retorna um errorMessage se algo dar errado.
 * @function fetchPersonagemError
 * @param { string } errorMessage Este parametro mostra uma mensagem de erro, caso algo presente um problema
 * @returns { ActionType } Retorna o payload com a string da mensagem de erro
 */
export const fetchPersonagemError = (errorMessage: string): ActionType => {
    return {
        type: FETCH_PERSONAGENS_ERROR,
        payload: { errorMessage },
    }
}

/**
 * Esta função muda o estado favorito do personagem para true ou false
 * @function favoritarPersonagens
 * @param { number } id Este é o parâmetro id que recebe para saber qual personagem mudar
 * @returns { ActionType } Retorna o payload com id do personagem
 */
export const favoritarPersonagens = (id: number): ActionType => {

    return { 
        type: FAVORITAR_PERSONAGENS,
        payload: id,
    }   

}

/**
 * Esta função retorna apenas um personagem específico
 * @function fetchPersonagemIDSuccess
 * @param { Personagem } personagem Parâmetro do tipo { Personagem }
 * @returns { ActionType } Retorna um payload do tipo Personagem
 */
export const fetchPersonagemIDSuccess = (personagem: Personagem): ActionType => {
    return {
        type: FETCH_PERSONAGEM_ID_SUCCESS,
        payload: { personagem },
    }
}

/**
 * Esta é a função que retorna todos os episodios em que um personagem participou.
 * @function fetchEpisodes
 * @param { Episode[] } episodes Parâmetro array de episódios do tipo { Episode[] }
 * @returns { ActionType } Retorna um payload array de episódios do tipo { Episode[] }
 */
export const fetchEpisodes = (episodes: Episode[]): ActionType => {
    return {
        type: FETCH_EPISODES,
        payload: episodes,
    }

}

/**
 * Esta função requisita à API pelos personagens e retorna uma página com 20, acrescenta o favorito:false
 *  em todos eles,  passa por payload para a função fetchPersonagemSuccess e retorna a paginação
 * @function fetchPersonagemThunk
 * @async Parâmetro dispatch
 * @returns Esta função retorna os primeiros 20 personagens em .results e a paginação em .info
 */
export const fetchPersonagemThunk = () => async (dispatch: any) => {
    dispatch(fetchPersonagemStarted());    
    try {
        const response = await fetch('https://rickandmortyapi.com/api/character'); 
        const json = await response.json(); 
        const jsonFilter = json.results.map((result: Personagem) =>  ({...result, favorito: false}))      
        dispatch(fetchPersonagemSuccess({info: json.info, results: jsonFilter}));                  

    } catch (error: any) {
        dispatch(fetchPersonagemError(error.message));
    }    
}

/**
 * Esta função faz uma requisição na API de acordo com o nome passado pelo parâmetro
 * @function filterPersonagemThunk
 * @param { string } texto Este pârametro obtem o personagem buscado por filtro
 * @async
 * @returns Retorna o personagem buscado por pârametro
 */
export const filterPersonagemThunk = (texto: string) => async (dispatch: any) => {
    dispatch(fetchPersonagemStarted());
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${texto}`); 
        const json = await response.json();
        const jsonFilter = json.results.map((result: Personagem) =>  ({...result, favorito: false}))          
        dispatch(fetchPersonagemSuccess({info: json.info, results: jsonFilter}));                  

    } catch (error: any) {
        dispatch(fetchPersonagemError(error.message));
    } 
} 

/**
 * Esta função que recebe a url e faz um fetch mudando a página
 * @function fetchNextPageThunk
 * @param { string } url Pârametro da nova página a ser carregada
 * @async 
 * @returns Retorna uma nova página e passa os novos personagens dessa página na fetchPersonagemSuccess
 */
export const fetchNextPageThunk = (url: string) => async (dispatch: any) => {    
    try {
        const response = await fetch(url); 
        const json = await response.json();
        const jsonFilter = json.results.map((result: Personagem) =>  ({...result, favorito: false}))                    
        dispatch(fetchPersonagemSuccess({info: json.info, results: jsonFilter}));                 

    } catch (error: any) {
        dispatch(fetchPersonagemError(error.message));
    } 
} 

/**
 * Esta função retorna só um Personagem de acordo com id passado por pârametro
 * @function fetchPersonagemIDThunk
 * @param { number } id Este pârametro busca o personagem de acordo com o id
 * @async 
 * @returns Retorna o personagem e passa por payload para fetchPersonagemIDSuccess
 */
export const fetchPersonagemIDThunk = (id: number) => async (dispatch: any) => {      
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`); 
        const json = await response.json();                     
        dispatch(fetchPersonagemIDSuccess(json));                  

    } catch (error: any) {
        dispatch(fetchPersonagemError(error.message));
    } 
} 

/**
 * Esta função procura todos os episódios em que um personagem específico apareceu
 * @function fetchEpisodesThunk
 * @param { string[] } arrayEp Parâmetro array de strings de um determinado personagem
 * @async 
 * @returns Retorna esses episódios do personagem escolhido e passa para fetchEpisodes
 */
export const fetchEpisodesThunk = (arrayEp: string[]) => async (dispatch: any) => {    
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/episode/${arrayEp}`); 
        const json = await response.json();                     
        dispatch(fetchEpisodes(json));                  

    } catch (error: any) {
        dispatch(fetchPersonagemError(error.message));
    } 
} 