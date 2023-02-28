import React, { useEffect, useState } from 'react';
import { APIGame, APIResponse } from 'lib/types';
import axios from 'axios';
axios.defaults.withCredentials = true;

const GameContext = React.createContext<{
  games: APIGame[] | null;
  setGames: React.Dispatch<React.SetStateAction<APIGame[] | null>>;
  loadGames: () => void;
  state: { loading: boolean; success: boolean };
}>({
  games: null,
  setGames: () => {
    return;
  },
  loadGames: () => {
    return;
  },
  state: { loading: true, success: false },
});
export const useGames = () => React.useContext(GameContext);

export function Provider({ children }: React.PropsWithChildren) {
  const [games, setGames] = useState<APIGame[] | null>(null);
  const [state, setState] = useState({ loading: false, success: true });

  function loadGames() {
    console.log('fetching game');
    setState({ loading: true, success: false });
    axios
      .get<APIResponse>(`/api/games/selector`)
      .then((r) => {
        console.log(r.data);
        if (r.data.success) {
          setState({ loading: false, success: true });
          setGames(r.data.games.sort((a, b) => new Date(b.lastUpdateDate).getTime() - new Date(a.lastUpdateDate).getTime()));
        } else {
          setState({ loading: false, success: false });
        }
      })
      .catch((err) => {
        console.log(err);
        setState({ loading: false, success: false });
      });
  }

  useEffect(() => {
    loadGames();
  }, []);

  return <GameContext.Provider value={{ games, setGames, loadGames, state }}>{children}</GameContext.Provider>;
}
