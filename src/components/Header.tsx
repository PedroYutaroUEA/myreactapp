import React from 'react'

interface Props {
  label: string
  link?: string
}

export function Header({ label, link }: Props) {
  return (
    <header className="text-center py-10 w-screen border-b-2 border-b-zinc-500 border-dotted flex flex-col gap-3">
      <h1 className="text-zinc-50 text-8xl font-extrabold">
        {label}
      </h1>
      <p className="text-zinc-400">
        Check out my {" "}
        <a
          className="underline text-zinc-300 hover:text-zinc-100"
          rel='noreferrer'
          href={link}
          target="_blank"
        >
        other projects
        </a>
        !
      </p>
    </header>
  )
}
