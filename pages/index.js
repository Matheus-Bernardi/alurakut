import React from 'react';
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
                <img src={itemAtual.image}/>
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {

  const gitHubUser = 'Matheus-bernardi';
  const [comunidades, setComunidades] = React.useState([{
    id: '1',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    url: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  },
  {
    id: '2',
    title: 'Eu odeio acordar cedo',
    image: 'https://picsum.photos/300/200',
    url: 'https://picsum.photos/300/200'

  },
  {
    id: '3',
    title: 'Eu odeio acordar cedo',
    image: 'https://picsum.photos/300/300',
    url: 'https://picsum.photos/300/300'
  
  },
  {
    id: '4',
    title: 'Eu odeio acordar cedo',
    image: 'https://picsum.photos/200/200',
    url: 'https://picsum.photos/200/200'
  },
  {
    id: '5',
    title: 'Eu odeio acordar cedo',
    image: 'https://picsum.photos/400/400',
    url: 'https://picsum.photos/400/400'
  },
  {
    id: '6',
    title: 'Eu odeio acordar cedo',
    image: 'https://picsum.photos/300/400',
    url: 'https://picsum.photos/300/400'
  }]);
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
      for (var ix = 0; ix <6; ix++){
        console.log(respostaCompleta);
      }
      
      setSeguidores(respostaCompleta);
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
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
                url: dadosDoForm.get('url'),
              }
              if (comunidades.length != 6){
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);
              }
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
                  <li id={itemAtual.id}  key={itemAtual.id}>
                    <a href={itemAtual.url}>
                      <img src={itemAtual.image}/>
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
