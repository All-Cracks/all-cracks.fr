import React, { useState, useEffect } from 'react';
import Md from '@uiw/react-markdown-preview';
import Buttons from 'components/Buttons';
import NoConnection from 'components/NoConnection';
import { APIGame } from 'lib/types';
import { useRouter } from 'next/router';
import { useGames } from '@/lib/gameContext';
import { Tooltip } from '@nextui-org/react';

function showTutorial() {
  document.querySelector('.game-tuto')?.classList.toggle('hidden');
  document.querySelector('.tutorial-icon')?.classList.toggle('show');
}

export default function Game() {
  const router = useRouter();
  const { gameId } = router.query;
  const { games, state, loadGames } = useGames();
  const [game, setGame] = useState<APIGame | null>(null);

  useEffect(() => {
    if (games && !game) {
      const _game = games.find((e) => e._id === gameId);
      if (_game) setGame(_game);
    }
  }, [games, gameId]);

  if (state.loading) return <div className="my-20 text-center text-lg">Chargement...</div>;
  if (state.success && game)
    return (
      <div>
        <div className="absolute left-0 -z-10 mt-[-120px] h-full w-full overflow-hidden">
          <div
            className={`game-bg h-full w-full bg-cover blur after:absolute after:left-0 after:top-0 after:h-full after:w-full`}
            style={{
              backgroundImage: `url(${game.bgUrl?.replace('screenshot_med', 'screenshot_huge')})`,
              backgroundPosition: 'center center',
            }}
          ></div>
        </div>
        <main className="my-10 text-center">
          <div className="mb-10 text-3xl">{game.name}</div>
          <div className="flex flex-row justify-evenly">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={game.coverUrl?.replace('cover_big', '720p')} alt={game.name} className="rounded-xl" width={264} height={374} />
            <iframe
              width="664"
              height="374"
              src={`https://www.youtube.com/embed/${game.videoId}?controls=0&rel=0&amp;autoplay=1&mute=1&loop=1&showinfo=0&amp;playlist=${game.videoId}`}
              title={game.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
              className="hidden rounded-xl lg:block"
            ></iframe>
          </div>
          {game.tutorial ? (
            <button onClick={showTutorial} className="mx-5 mt-20 rounded-lg bg-[#0d1117] px-8 py-6 sm:mx-10 md:mx-20 lg:mx-40">
              <div className="text-lg">
                Tutoriel d&apos;installation <i className="fa-solid fa-chevron-down tutorial-icon ml-2"></i>
              </div>
              <Md className="text-md game-tuto mt-5 hidden text-left" source={game.tutorial} />
            </button>
          ) : (
            ''
          )}
          <Tooltip id="globalTip" place="top" effect="solid" backgroundColor="#111827" />
          <div className="my-10 text-center">
            <div>
              <div
                data-tip={`Ce fichier requiert ${game.crackDlLinkType === 'rar' ? 'WinRar' : 'µTorrent'} pour être téléchargé et installé`}
                data-for="globalTip"
                className="m-0"
              >
                fichier .{game.crackDlLinkType} <i className="fa-regular fa-circle-question"></i>
              </div>
              <Buttons.Primary href={game.crackDlLink} type="href">
                <i className="fa-solid fa-download mr-2 -ml-1"></i>Télécharger le jeux
              </Buttons.Primary>
            </div>
            <>
              {game.additionalLinks?.map((e) => (
                <div key={e.name} className="mt-2">
                  <div data-tip={`Ce fichier requiert ${e.linkType === 'rar' ? 'WinRar' : 'uTorrent'} pour être utilisé`} data-for="globalTip" className="m-0">
                    fichier .{e.linkType} <i className="fa-regular fa-circle-question"></i>
                  </div>
                  <Buttons.Secondary href={e.link} type="href" className="text-sm">
                    <i className="fa-solid fa-download mr-2 -ml-1"></i>
                    <div dangerouslySetInnerHTML={{ __html: e.name }}></div>
                  </Buttons.Secondary>
                </div>
              ))}
            </>
          </div>
          <div>
            <div className="text-2xl">A propos de {game.name} :</div>
            <div className="mx-20 my-10 text-lg">{game.description}</div>
            <div className="mx-20 text-left">
              Derniere mise a jour : {game.lastUpdate}
              <br />
              Date de sortie du jeux : {game.release}
              <br />
              Taille du jeux une fois installé : {game.crackDlSize}
            </div>
          </div>
        </main>
      </div>
    );
  else if (state.success && !state.loading && !game) return <div className="my-20 text-center text-lg">Jeu introuvable</div>;
  else return <NoConnection retry={() => loadGames()} />;
}
