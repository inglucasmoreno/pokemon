import { SmallPokemon } from "@/interfaces"
import { Grid, Card, Row, Text } from "@nextui-org/react"
import { useRouter } from "next/router"
import { FC } from "react"

interface Props {
  pokemon: SmallPokemon
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {

  const { id, img, name } = pokemon;

  const router = useRouter();

  const onClick = () => {
    router.push(`/name/${ pokemon.name }`);
  }

  return (
    <Grid xs={6} sm={3} xl={1} key={id}>
      <Card 
        isHoverable 
        isPressable
        onClick={ onClick }
        >
        <Card.Body css={{ p: 1 }}>
          <Card.Image
            src={img}
            width='100%'
            height={100}
          />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text transform="capitalize"> {name} </Text>
            <Text> #{id} </Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  )
}

