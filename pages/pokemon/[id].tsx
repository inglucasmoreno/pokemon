import React, { useState } from 'react'
import { Layout } from '@/components/layouts'
import { GetStaticProps, NextPage } from 'next';
import { GetStaticPaths } from 'next'
import { pokeApi } from '@/api';
import { Pokemon } from '@/interfaces';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { getPokemonInfo, localFavorites } from '@/utils';
import confetti from 'canvas-confetti';

interface Props {
  pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

  const onToggleFavorite = () => {
    localFavorites.toggleFavorites( pokemon.id );
    setIsInFavorites( !IsInFavorites );

    if( IsInFavorites ) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x:1,
        y:0
      }
    })

  }

  const [ IsInFavorites, setIsInFavorites ] = useState( localFavorites.existePokemonInFavorites( pokemon.id ) );

  return (
    <div>
      <Layout title={ pokemon.name }>

        <Grid.Container css={{ marginTop: 'pxs' }} gap={2}>

          <Grid xs={12} sm={4} >
            <Card isHoverable css={{ padding: '30px' }}>
              <Card.Body>
                <Card.Image
                  src={pokemon.sprites.other?.dream_world.front_default || 'no-image.png'}
                  alt={pokemon.name}
                  width='100%'
                  height={200}
                />
              </Card.Body>
            </Card>
          </Grid>

          <Grid xs={12} sm={8}>
            <Card>
              <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text h1 transform='capitalize'> {pokemon.name} </Text>
                <Button
                  color="gradient"
                  ghost={ !IsInFavorites }
                  onPress={ onToggleFavorite }
                >
                  { IsInFavorites ? 'En Favoritos' : 'Guardar en favoritos' }
                </Button>
              </Card.Header>
              <Card.Body>
                <Text size={30} > Sprites: </Text>

                <Container display='flex' direction='row' gap={0}>
                  <Image
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image
                    src={pokemon.sprites.back_default}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image
                    src={pokemon.sprites.front_shiny}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image
                    src={pokemon.sprites.back_shiny}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                </Container>

              </Card.Body>
            </Card>
          </Grid>

        </Grid.Container>


      </Layout>
    </div>
  )

}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemons151.map(id => ({
      params: { id }
    })),
    // fallback: false
    fallback: 'blocking'
  }
}

// Esto solo se ejecuta del LADO DEL SERVIDOR y en TIEMPO DE CONSTRUCCION (BUILD TIME)
// En desarrollo -> Siempre que se ejecuta la pagina se llama
// En produccion -> Se llama una sola vez
export const getStaticProps: GetStaticProps = async ({ params }) => { // Se desestructura el ctx -> ({ params })

  const { id } = params as { id: string }; // Para evitar colocar el tipado complicado

  const pokemon = await getPokemonInfo( id );

  if(!pokemon){
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      pokemon
    },
    revalidate: 86400
  }
}

export default PokemonPage
