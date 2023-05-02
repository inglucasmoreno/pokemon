import { Image, Spacer, Text, useTheme, Link, Grid } from "@nextui-org/react"
import NextLink from 'next/link';

export const Navbar = () => {

  const { theme } = useTheme()

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyItems: 'start',
      padding: '0x 20px',
      backgroundColor: theme?.colors.gray100.value  
    }}>

      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png"
        alt="Icono de la APP"
        width={70}
        height={70} 
      />

      <NextLink href="/">
        <Grid css={{ display: 'flex', alignItems: 'center' }}>
          <Text color='white' h2> P </Text>
          <Text color='white' h3> okémon </Text>
        </Grid>
      </NextLink>

      <Spacer css={{ flex: 1 }}/>

      <NextLink href="/favorites">
        <Text css={{ marginRight: '15px' }} color='white'> Favoritos </Text>
      </NextLink>

    </div>
  )
}

