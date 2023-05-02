import { Layout } from "@/components/layouts";
import { pokeApi } from '../api';
import { GetStaticProps, NextPage } from "next";
import { PokemonListResponse, SmallPokemon } from "@/interfaces";
import { Card, Grid, Row, Text } from "@nextui-org/react";
import { PokemonCard } from "@/components/pokemon";

interface Props { 
  pokemons: SmallPokemon[];
}


const HomePage: NextPage<Props> = ({ pokemons }) => {
  
  return (
    <Layout title="Listado de pokemons">
      <Grid.Container gap={ 2 } justify="flex-start">
        {
          pokemons.map( (pokemon) => (
            <PokemonCard
              key={ pokemon.id }
              pokemon={ pokemon }
            />
          ))
        }
      </Grid.Container>
    </Layout>  
  )
}

// Esto solo se ejecuta del LADO DEL SERVIDOR y en TIEMPO DE CONSTRUCCION (BUILD TIME)
// En desarrollo -> Siempre que se ejecuta la pagina se llama
// En produccion -> Se llama una sola vez
export const getStaticProps: GetStaticProps = async (ctx: any) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = data.results.map( (poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg` 
  }))

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage;

