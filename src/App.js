import './app.css' 
import { RiSearch2Line } from "react-icons/ri";
import { useState } from 'react';
import API from './services/api';

function App() {

    const [input, setInput] = useState('');
    const [output, setOutput] = useState({});

    async function handleSearch() {
        //01001000/json/

        if(input === ''){
            alert("Preencha o campo do CEP");
            return;
        }

        try{
            const RESPONSE = await API.get(`${input}/json`);
            setOutput(RESPONSE.data);
            setInput("");
        }
        catch{
            alert("OPS!! Algo deu errado, digite o CEP novamente");
            setInput('');
        }
    }

  return (
    <div className="App">
        <h1 className="title">Buscador de CEP</h1>
        <section className="section-input">
            <input 
                type="text" 
                placeholder="Digite o CEP"
                value={input}
                onChange={(event) => setInput(event.target.value)}
            />
            <button className="btn-search" onClick={handleSearch}>
                <RiSearch2Line size={28} color="#FFF"/>
            </button>
        </section>
        {Object.keys(output).length > 0 && (
            <main className="content">
                <h2>CEP: {output.cep}</h2>
                <span>Logradouro: {output.logradouro}</span>
                <span>Complemento: {output.complemento}</span>
                <span>Bairro: {output.bairro}</span>
                <span>Localidade: {output.localidade} - {output.uf}</span>
             </main>
        )}   
    </div>
  );
}

export default App;