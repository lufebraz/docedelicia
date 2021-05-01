import { useEffect, useState } from "react";
import VMasker from "vanilla-masker";

  export default function Masker(){

    
    // Mascarando campos telefone, cpf, cep
    const [cep, setCep] = useState('');
    useEffect(() => {
      setCep(VMasker.toPattern(cep, "99999-999"));
    }, [cep]);
    
    const [cpf, setCpf] = useState('');
    useEffect(() => {
      setCpf(VMasker.toPattern(cpf, "999.999.999-99"));
    }, [cpf]);
    
    const [tel, setTel] = useState('');
    useEffect(() => {
      setTel(VMasker.toPattern(tel, "(99) 9 9999-9999"));
    }, [tel]);
    
    const [telfixo, setTelfixo] = useState('');
    useEffect(() => {
      setTelfixo(VMasker.toPattern(telfixo, "(99) 9999-9999"));
    }, [telfixo]);
  }