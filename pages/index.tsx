import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import config from 'lib/config';
import Buttons from 'components/Buttons';
import Tilt from 'react-tilty';
import ContentLoader from 'react-content-loader';
// import Palette from 'react-palette';
import Head from 'next/head';
import { useGames } from 'lib/gameContext';
import Palette from 'react-palette';

export default function Home() {
  const { games, loadGames, state } = useGames();

  const loaderParams = {
    width: 180,
    height: 240,
  };
  return (
    <>
      <Head>
        <title>{`Acceuil${config.titleSufix}`}</title>
      </Head>
      <div className="items-center text-center">
        <FirstPage />
        <div className="w-full bg-gradient-to-tr from-green-200 to-blue-200 py-20">
          <h1 className="text-2xl font-semibold text-slate-800">Nos dernières sorties :</h1>
          <div className="mt-10 flex flex-col items-center justify-evenly md:flex-row lg:mx-10">
            {state.success && games ? (
              [0, 1].map((i) => (
                <Palette key={games[i]._id} src={games[i].coverUrl as string}>
                  {({ data, loading, error }) => {
                    console.log(data, loading, error);
                    return (
                      <div className="flex flex-row rounded-lg" id={games[i]._id + '-container'}>
                        <div className="block w-[180px]" style={{ backgroundColor: data.vibrant || '#334155' }}>
                          <Link href={`/games/${games[i]._id}`} className="w-[180px]">
                            <Tilt max={12.5} speed={400} scale={1.07} reverse={true}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={games[i].coverUrl || ''}
                                alt={games[i].name}
                                width="180px"
                                height="240px"
                                className="game-card-img tilt relative h-[240px] w-[180px] rounded-lg"
                                data-tilt
                                id={games[i]._id + '-image'}
                              />
                            </Tilt>
                          </Link>
                        </div>
                        <div className="relative flex flex-col whitespace-normal px-10 py-6 md:justify-between">
                          <Link href={`/games/${games[i]._id}`} className="text-lg">
                            {games[i].name}
                          </Link>
                          <p className="text-description text-sm">{games[i].description}</p>
                          <Link href={`/games/${games[i]._id}`} className="rounded-lg bg-slate-200 px-2 py-1 text-black">
                            Découvrir <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    );
                  }}
                </Palette>
              ))
            ) : state.loading ? (
              [1, 2].map((e) => (
                <div className="flex h-[240px] flex-row rounded-lg bg-slate-600/50" key={e}>
                  <ContentLoader
                    speed={2}
                    width={loaderParams.width}
                    height={loaderParams.height}
                    viewBox={`0 0 ${loaderParams.width} ${loaderParams.height}`}
                    backgroundColor="#00000022"
                    foregroundColor="#0000003b"
                    className="relative rounded-lg outline-none"
                  >
                    <rect x="0" y="0" width={loaderParams.width} height={loaderParams.height} />
                  </ContentLoader>
                  <div className="whitespace-normal px-10 py-6">
                    <ContentLoader speed={2} width={400} height={240} viewBox="0 0 400 240" backgroundColor="#37415122" foregroundColor="#37415144">
                      <rect x={0} y={0} rx={6} ry={6} width={250} height={25} />
                    </ContentLoader>
                  </div>
                </div>
              ))
            ) : (
              <div className="my-24 flex flex-col text-black">
                <i className="fa-solid fa-warning mb-2 text-2xl text-orange-400"></i>
                Connexion impossible
                <button className="mt-2 rounded-md bg-white px-2 py-1 transition-all hover:bg-slate-100" onClick={loadGames}>
                  Ressayer
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="my-40 w-full">
          <h1 className="text-2xl">
            <i className="fa-solid fa-shield-keyhole"></i> Votre sécurité, notre priorité
          </h1>
          <div className="mt-10 text-lg text-slate-300">
            Tout nos jeux sont téstés et approuvés par notre équipe.
            <br />
            <span className="mt-2 text-3xl text-white">0%</span> de chance d&apos;avoir un virus
          </div>
        </div>
      </div>
    </>
  );
}

function FirstPage() {
  const [screenHeigth, setScreenHeigth] = useState(typeof window !== 'undefined' ? window.innerHeight : 700);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ev = () => setScreenHeigth(window.innerHeight);
      window.addEventListener('resize', ev);
      return () => {
        window.removeEventListener('resize', ev);
      };
    }
  }, [typeof window !== 'undefined' ? window.innerHeight : undefined]);

  return (
    <div className="m-0 flex flex-col items-center justify-center" style={{ height: screenHeigth }}>
      <h1 className="mx-4 text-center text-2xl lg:mx-20">
        Touts vos jeux préférés, gratuits et téléchargable en un seul <span className="text-blue-500 underline">click</span>
        <i className="fa-solid fa-arrow-pointer text-shadow-white absolute translate-y-5 -translate-x-3 text-black"></i> !
      </h1>
      <div className="relative mt-10 flex flex-col items-center justify-center text-center sm:flex-row">
        <Buttons.Primary href="/games" type="link" className="mb-4 sm:mr-4 sm:mb-0">
          Voir tout les jeux
        </Buttons.Primary>
        <Buttons.Secondary href={config.discordInvite} type="href">
          <i className="fa-solid fa-arrow-up-right-from-square mr-2"></i>
          Notre discord
        </Buttons.Secondary>
      </div>
      {/* <Palette src="https://i.redd.it/gta-6-cover-art-v0-ea2ovju0wj791.png?width=1920&format=png&auto=webp&s=fbc7960e6f2e88684b481af4af12ca4d1fb5d4dc">
      {({ data, loading, error }) => {
        console.log(data, loading, error);
        return Object.entries(data).map((e) => (
          <div className="p-5" key={e[0]} style={{ backgroundColor: e[1] }}>
            {e[0]}
          </div>
        ));
      }}
    </Palette> */}
    </div>
  );
}
