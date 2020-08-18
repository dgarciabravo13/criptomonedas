import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Error from "./Error";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import axios from "axios";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = () => {
  //state del formulario para agregar la consulta de la API

  const [listadocripto, setListadoCripto] = useState([]);
  const [error, setError] = useState(false);

  const MONEDAS = [
    { codigo: "USD", nombre: "Dolar Americano" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
  ];

  //utilizar nuestro custom hook useMoneda
  const [moneda, SelectMonedas] = useMoneda(
    "Selecciona tu moneda",
    "",
    MONEDAS
  );
  //utilizar nuestro custom hook useCriptomoneda
  const [criptomoneda, SelectCripto] = useCriptomoneda(
    "Selecciona tu criptomoneda",
    "",
    listadocripto
  );
  //utilizar useEffect para llamar a la API
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultado = await axios.get(url);
      setListadoCripto(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  //cuando el usuario hace submit

  const cotizarMoneda = (e) => {
    e.preventDefault();
    //validar si ambos campos estan llenos
    if (!moneda || !criptomoneda) {
      setError(true);
      return;
    }
    setError(false);
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}
      <SelectMonedas />
      <SelectCripto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
