'use client'

import Image from 'next/image'
import { Link } from 'react-scroll'
import type { ClubNavProps } from '@/types'
import './club-nav.css'

export default function ClubNav({ team }: ClubNavProps) {
  const targetId = `club-${team.tla.toLowerCase()}`
  
  return (
    <Link
      to={targetId}
      spy={true}
      smooth={true}
      duration={800}
      offset={-50}
      className="club-nav"
      href={`/#${targetId}`}
    >
      <div className="club-nav-logo">
        <Image
          src={`/club-logos/${team.tla.toLowerCase()}.png`}
          alt={`${team.name} crest`}
          width={30}
          height={30}
          style={{ objectFit: 'contain', width: 'auto', height: '30px' }}
        />
      </div>
      <span>{team.name}</span>
    </Link>
  )
}
