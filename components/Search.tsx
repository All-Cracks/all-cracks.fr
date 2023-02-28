import React, { FormEvent, useState, useEffect } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Configure, Highlight, useHits } from 'react-instantsearch-hooks-web';
import { BaseHit } from 'instantsearch.js';
import Link from 'next/link';
import config from 'lib/config';
import { Oval } from 'react-loader-spinner';
import { APIGame } from 'lib/types';
import { useRouter } from 'next/router';
import Image from 'next/image';

const searchClient = algoliasearch(config.searchId, config.searchKey);

interface inputEvent extends FormEvent<HTMLInputElement> {
  target: HTMLInputElement;
}

interface Hit {
  hit: {
    name: string;
    coverUrl: string;
    _id: string;
    __position: number;
    __queryID?: string;
    objectID: string;
  };
}

export default function instantSearch() {
  return (
    <InstantSearch searchClient={searchClient} indexName="Games">
      <Search />
    </InstantSearch>
  );
}

function Search() {
  const router = useRouter();
  const { hits } = useHits<APIGame & BaseHit>();
  const input = document.querySelector('.search-input form') as HTMLFormElement | null;
  useEffect(() => {
    const ev = input?.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log(hits[0]._id);
      if (hits[0]) {
        router.push(`/game/${hits[0]._id}`);
      }
    });
    return () => ev && input?.removeEventListener('submit', ev);
  }, [hits]);
  const [state, setState] = useState<boolean>(false);
  useEffect(() => {
    const searchInput: HTMLInputElement | null = document.querySelector('.search-input');
    searchInput?.addEventListener('focusout', (event: FocusEvent) => {
      const target: (HTMLInputElement & EventTarget) | null = event.target as HTMLInputElement & EventTarget;
      if (target?.value.length <= 0) return closeSearch();
      closeSearch();
    });
    searchInput?.addEventListener('focusin', (event: FocusEvent) => {
      const target: (HTMLInputElement & EventTarget) | null = event.target as HTMLInputElement & EventTarget;
      if (target?.value.length <= 0) return closeSearch();
      else openSearch(target?.value);
    });
  }, []);

  // function submitSearch(event: SubmitElement) {
  //   const value = event.target?.value

  //   if(value) {
  //     if(value.length <= 0) return closeSearch();
  //   }
  //   redirect(`/games/${hits.hits[0]._id}`)
  // }
  function searchInput(event: inputEvent) {
    const value = event.target?.value;

    if (value.length <= 0) return closeSearch();
    else openSearch(value);
  }
  function openSearch(value: string) {
    setState(true);
    router.query.search = value;
  }
  function closeSearch() {
    setState(false);
    router.query.search = '';
  }
  return (
    <>
      <Configure hitsPerPage={5} />
      <SearchBox
        className="search-input"
        inputMode="search"
        onInput={searchInput}
        translate="yes"
        // onSubmit={submitSearch}
        defaultValue={router.query.search || ''}
        submitIconComponent={() => <i className="fa-solid fa-magnifying-glass submit-icon z-20 text-gray-500"></i>}
        resetIconComponent={() => <i className="fa-solid fa-xmark search-reset z-20 text-gray-500"></i>}
        loadingIconComponent={() => <Oval color="black" secondaryColor="black" wrapperClass="search-loader" width="1rem" height="1rem" />}
      />
      {state ? (
        <div className="absolute left-0 top-12 flex flex-col rounded-md bg-slate-700/75 p-4">
          <Hits
            hitComponent={function HitComponent({ hit }: Hit) {
              return (
                <Link href={`/game/${hit._id}`} className="z-50 mt-10 flex cursor-pointer flex-row hover:bg-slate-600/75" onClick={closeSearch}>
                  <Image src={hit.coverUrl} alt={hit.name} width="90" height="128" />
                  <div>
                    <Highlight className="ml-2 text-ellipsis" attribute="name" hit={hit}></Highlight>
                    <div className="bg-white text-black">Accéder au jeu</div>
                  </div>
                </Link>
              );
            }}
          />
        </div>
      ) : (
        ''
      )}
    </>
    // <div>
    //   <div className="relative mt-3">
    //     <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none text-gray-500">
    //       <i className="fa-solid fa-magnifying-glass"></i>
    //     </div>
    //     <input
    //       type="text"
    //       id="search-navbar"
    //       className="block p-2 pl-8 w-full rounded-lg border sm:text-sm bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:ring-1 focus:border-blue-500 outline-none transition-all"
    //       placeholder="Search..."
    //       onInput={searchInput}
    //       value={`${params.get("search") ? params.get("search") : ""}`}
    //     />
    //   </div>
    //   {params.get("search") ? (
    //     <InstantSearch searchClient={searchClient} indexName="instant_search">
    //       <div className="absolute">{params.get("search")}</div>
    //     </InstantSearch>
    //   ) : (
    //     ""
    //   )}
    // </div>
  );
}
