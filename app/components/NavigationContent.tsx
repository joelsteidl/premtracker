'use client'

import { useEffect } from 'react'
import MicroModal from 'micromodal'
import type { Team } from '@/types'
import ClubNav from './ClubNav'

interface NavigationContentProps {
  sortedTeams: Team[]
}

export default function NavigationContent({ sortedTeams }: NavigationContentProps) {
  useEffect(() => {
    MicroModal.init()

    const menuButton = document.querySelector('#menu-button')

    const toggleModal = () => {
      if (!menuButton) return

      if (menuButton.classList.contains('is-active')) {
        MicroModal.close('nav-modal')
        menuButton.classList.remove('is-active')
        menuButton.setAttribute('aria-label', 'Open navigation')
      } else {
        MicroModal.show('nav-modal')
        menuButton.classList.add('is-active')
        menuButton.setAttribute('aria-label', 'Close navigation')
      }
    }

    menuButton?.addEventListener('click', toggleModal)

    return () => {
      menuButton?.removeEventListener('click', toggleModal)
    }
  }, [])

  return (
    <nav role="dialog" aria-modal="true">
      {sortedTeams.map((team) => (
        <ClubNav key={`nav-${team.id}`} team={team} />
      ))}
    </nav>
  )
}
