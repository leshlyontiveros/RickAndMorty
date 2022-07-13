import "./styles.css";
import { fetchNextPageThunk } from '../../store/actions/characters'
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '../../types'

/**
 * Componente que contém os botões para paginar
 *
 * Você deve adicionar as propriedades necessárias para que funcione corretamente
 *
 *
 * @returns Elemento JSX
 */


const Paginacao = () => {
    const { paginacao }  = useSelector((state: GlobalState) => state.person);
     
    const dispatch = useDispatch();

    /**
     * Esta função faz que "paginacao.next" passe como parametro para a função fetchNextPageThunk que a recebe
     * faz uma requisição para a API e carrega a próxima página, se "paginacao.next' existir.
     * @function handleNextPage
     * @returns retorna uma nova pagina
     */
    const handleNextPage = () => {
      if(paginacao.next) {
        fetchNextPageThunk(paginacao.next)(dispatch);
      }     
    };

    /**
      * Esta função faz que "paginacao.prev'' seja o parametro de "paginacao.prev" (se existir)
     *  Para que fetchNextPageThunk a receba, faça uma requisição para a API e carrege a página anterior.
     * @function handlePrevPage
     * @returns retorna uma pagina anterior
     */
    const handlePrevPage = () => {
      if(paginacao.prev) {
        fetchNextPageThunk(paginacao.prev)(dispatch);
      }        
    }; 


    /**
     * Função que desabilita o botão "Anterior" usando o disabled true, se a paginacao.prev
     * for null, o que quer dizer que não existe
     * @function buttonDisabled
     * @returns Dependendo do paginacao.prev retorna true ou false. 
     */
    const buttonDisabled = () => {
      if(paginacao.prev === null) return true;
      return false;
    }


  return (
    <div className="paginacao">
      <button disabled={buttonDisabled()} onClick={handlePrevPage} className={"primary"}>
        Anterior
      </button>
      <button disabled={false} onClick={handleNextPage} className={"primary"}>
        Próximo
      </button>
    </div>
  );
};

export default Paginacao;
