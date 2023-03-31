import React from 'react';

export default function NoConnection({ retry }: { retry: () => void }) {
  return (
    <div className="my-20 text-center">
      <div>
        <i className="fa-solid fa-warning text-8xl text-orange-400"></i>
        <div className="mt-4 text-3xl">Connexion impossible</div>
      </div>
      <div className="text-md mt-4 text-slate-400">Vérifiez votre connexion internet et réessayez</div>
      <button className="mt-8 rounded-md bg-slate-300 py-2 px-6 text-xl text-black transition-all hover:bg-slate-200" onClick={retry}>
        Ressayer
      </button>
    </div>
  );
}
