import React from 'react';
import nookie from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/components/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';


function ProfileSidebar(propriedades){
  return(
    <Box as="aside">
      <img src={`https://github.com/${propriedades.gitHubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr/>
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.gitHubUser}`} >
          @{propriedades.gitHubUser}
        </a>
      </p>
      <hr/>
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades){
  return(
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>

      <ul>
        {propriedades.items.map((itemAtual) => {
          return (
            <li id={itemAtual.id}  key={itemAtual.id}>
              <a href={itemAtual.url}>
                <img src={itemAtual.image_url}/>
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {

  const gitHubUser = props.githubUser;
  const [comunidades, setComunidades] = React.useState([]);
  // const comunidades = comunidades[0];
  // const alteradorDeComunidades = comunidades[1];
  console.log(comunidades);
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ];

  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(function(){
    fetch('https://api.github.com/users/peas/followers')
    .then(function (respostaDoServidor){
      return respostaDoServidor.json();
    })
    .then(function (respostaCompleta){
      setSeguidores(respostaCompleta);
    })

    //API GraphQL
    fetch('https://graphql.datocms.com/' , {
      method: 'POST',
      headers: {
        'Authorization': 'a343f2dc625823535969c6aad8d07e' ,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({'query': `query {
        allCommunities {
          id
          title
          imageUrl
          url
          creatorslug
        }
      }` })
    })
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((respostaCompleta) => {
      const comunidadesDato = respostaCompleta.data.allCommunities;
      setComunidades(comunidadesDato)
    })
  }, [])

  return (
    <>
      <AlurakutMenu githubUser={gitHubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar gitHubUser={gitHubUser}/>
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem Vindo(a)
            </h1>
            
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              
              const dadosDoForm = new FormData(e.target);

              console.log("Campo:", dadosDoForm.get('title'));
              console.log("Campo:", dadosDoForm.get('image'));
              console.log("Campo:", dadosDoForm.get('url'));

              const comunidade = {
                title: dadosDoForm.get('title'),
                image_url: dadosDoForm.get('image'),
                url: dadosDoForm.get('url'),
                creatorslug: gitHubUser,
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados);
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);
              })
            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade" 
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma url para usar de capa" 
                  name="image" 
                  aria-label="Coloque uma url para usar de capa" 
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma url para acesso a comunidade" 
                  name="url" 
                  aria-label="Coloque uma url para acesso a comunidade"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguidores" items={seguidores} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>

            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={itemAtual.url}>
                      <img src={itemAtual.imageUrl}/>
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`}/>
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context){
  const cookies = nookie.get(context)
  const token = cookies.USER_TOKEN;
  console.log('Cookies', jwt.decode(token))

  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
  .then((resposta) => resposta.json())

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  console.log("Autenticado", isAuthenticated)

  const { githubUser } = jwt.decode(token);
  
  return {
    props: {
      githubUser // Nome da variavel e da chave igual ele atribui direto o valor da variavel
    },
  }
}