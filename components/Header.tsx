import React, { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import config from 'lib/config';
import ContentLoader from 'react-content-loader';
import Search from 'components/Search';
import { classNames } from 'components/Util';
import { useGames } from 'lib/gameContext';
import { useRouter } from 'next/router';
import Image from 'next/image';
import darkGlowImage from '@/public/assets/dark-glow.png';
import { APIGame } from 'lib/types';

export default function Header() {
  const [nav, setNav] = useState([
    { name: 'Accueil', type: 'link', href: '/' },
    {
      name: 'Jeux',
      type: 'dropdown',
      href: '/games',
      dropdownItems: [{ type: 'link', name: 'Tout les jeux', href: '/games' }, { type: 'hr' }, { type: 'text', text: 'Dernières sorties' }, { type: 'loader' }],
    },
    {
      name: 'Discord',
      type: 'href',
      href: config.discordInvite,
    },
    { name: 'DMCA', type: 'link', href: '/dmca' },
  ]);
  const { games, loadGames, state } = useGames();
  const router = useRouter();
  const path = router.pathname;

  useEffect(() => {
    if (games) {
      let dropdownItems:
        | {
            type: string;
            name?: string;
            href?: string;
            text?: string;
          }[]
        | undefined;
      const item = nav.find((e) => e.name === 'Jeux');
      if (item) {
        dropdownItems = item.dropdownItems;
      }
      if (dropdownItems) {
        dropdownItems.pop();
        games.forEach((e: APIGame) => {
          dropdownItems?.push({
            type: 'link',
            name: e.name,
            href: '/game/' + e._id,
          });
        });
      }
      setNav(nav);
    } else if (!games && !state.success && !state.loading) {
      let dropdownItems:
        | {
            type: string;
            name?: string;
            href?: string;
            text?: string;
          }[]
        | undefined;
      const item = nav.find((e) => e.name === 'Jeux');
      if (item) {
        dropdownItems = item.dropdownItems;
      }
      if (dropdownItems) {
        dropdownItems.pop();
        dropdownItems.push({ type: 'error' });
      }
      setNav(nav);
    }
  }, [games]);
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center overflow-hidden">
        <div className="hidden w-[108rem] flex-none justify-end md:flex">
          <picture>
            <Image src={darkGlowImage} alt="" className="w-[90rem] max-w-none flex-none" decoding="async" />
          </picture>
        </div>
      </div>
      <Disclosure as="nav" className="z-10">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <i className="fa-solid fa-xmark block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <i className="fa-solid fa-bars block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="text-goodtime flex shrink-0 items-center justify-center text-2xl text-white">
                    <Link href="/" className="block h-8 w-auto select-none lg:hidden">
                      All-Cracks.fr
                    </Link>
                    <Link href="/" className="hidden h-8 w-auto select-none lg:block">
                      All-Cracks.fr
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block sm:w-full sm:items-center sm:justify-between">
                    <div className="flex space-x-4">
                      {nav.map((item) =>
                        item.type === 'href' ? (
                          <a
                            key={item.name}
                            href={item.href}
                            rel="noreferrer"
                            target="_blank"
                            className={[
                              path === item.href ? 'text-white' : 'text-slate-400 hover:text-white',
                              'rounded-md px-3 py-2 text-base font-medium transition-all',
                            ].join(' ')}
                            aria-current={path === item.href ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ) : item.type === 'link' ? (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={[
                              path === item.href ? 'text-white' : 'text-slate-400 hover:text-white',
                              'rounded-md px-3 py-2 text-base font-medium transition-all',
                            ].join(' ')}
                            aria-current={path === item.href ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
                        ) : (
                          <Menu as="div" className="relative">
                            <div>
                              <Menu.Button
                                className={[
                                  path === item.href ? 'text-white' : 'text-slate-400 hover:text-white focus:text-white',
                                  'flex items-center justify-center rounded-md px-3 py-2 text-base font-medium outline-none transition-all',
                                ].join(' ')}
                              >
                                <span className="sr-only">Ouvrir la liste des jeux</span>
                                {item.name}
                                <i className="fa-solid fa-caret-down ml-2 translate-y-[-1px]"></i>
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-[-50%] z-10 mt-2 w-48 origin-center translate-x-[10px] rounded-md bg-slate-800 py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                                {item.dropdownItems?.map((e) => (
                                  <Menu.Item key={e.name}>
                                    {({ active }) =>
                                      e.type === 'link' ? (
                                        <Link
                                          key={e.name}
                                          href={e.href || '/'}
                                          className={classNames(
                                            active ? 'bg-slate-700' : '',
                                            'mx-2 my-1 block select-none overflow-hidden text-ellipsis whitespace-nowrap rounded-md px-3 py-2 text-sm text-white',
                                          )}
                                        >
                                          {e.name}
                                        </Link>
                                      ) : e.type === 'hr' ? (
                                        <div key={e.type} className="relative mx-3 mt-2 rounded-sm border-b-[1px] border-b-slate-600"></div>
                                      ) : e.type === 'text' ? (
                                        <div key={e.type} className="relative mb-1 mt-2 text-center text-xs font-semibold text-slate-400">
                                          {e.text}
                                        </div>
                                      ) : e.type === 'loader' ? (
                                        <ContentLoader
                                          speed={2}
                                          width={192}
                                          height={200}
                                          viewBox="0 0 192 200"
                                          backgroundColor="#4b5563"
                                          foregroundColor="#6b7280"
                                          className="relative px-3 outline-none"
                                          key={e.name}
                                        >
                                          <rect x="0" y="0" rx="8" ry="8" width="190" height="30" className="mt-2" />
                                          <rect x="0" y="40" rx="8" ry="8" width="190" height="30" className="mt-2" />
                                          <rect x="0" y="80" rx="8" ry="8" width="190" height="30" className="mt-2" />
                                          <rect x="0" y="120" rx="8" ry="8" width="190" height="30" className="mt-2" />
                                          <rect x="0" y="160" rx="8" ry="8" width="190" height="30" className="mt-2" />
                                        </ContentLoader>
                                      ) : (
                                        <div key={e.type} className="my-2 flex flex-col px-3 text-center">
                                          <div>
                                            <i className="fa-solid fa-warning text-lg text-orange-400"></i> Erreur
                                          </div>
                                          <button className="mt-1 rounded-md bg-slate-300 py-1 px-2 text-black" onClick={loadGames}>
                                            Ressayer
                                          </button>
                                        </div>
                                      )
                                    }
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        ),
                      )}
                    </div>
                  </div>
                </div>
                <div className="inset-y-0 hidden items-center justify-center pr-2 sm:relative sm:right-0 sm:top-0 sm:flex">
                  <Search />

                  {/* Profile dropdown */}
                  {/* <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/"
                              className={classNames(
                                active ? "bg-slate-100" : "",
                                "block px-4 py-2 text-sm text-slate-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/"
                              className={classNames(
                                active ? "bg-slate-100" : "",
                                "block px-4 py-2 text-sm text-slate-700"
                              )}
                            >
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/"
                              className={classNames(
                                active ? "bg-slate-100" : "",
                                "block px-4 py-2 text-sm text-slate-700"
                              )}
                            >
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu> */}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="menu-shadow space-y-1 px-2 pt-2 pb-3 text-center">
                <div className="inset-y-0 mb-3">
                  <Search />
                </div>
                {nav.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={item.type === 'href' ? 'a' : Link}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    href={item.href}
                    target={item.type === 'href' ? '_blank' : undefined}
                    className={[
                      path === item.href ? 'text-white' : 'text-slate-300 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium transition-all',
                    ].join(' ')}
                    aria-current={path === item.href ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
