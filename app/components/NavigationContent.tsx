'use client'

import { useEffect } from 'react'
import MicroModal from 'micromodal'
import { scroller } from 'react-scroll'
import type { Team } from '@/types'
import ClubNav from './ClubNav'

interface NavigationContentProps {
  sortedTeams: Team[]
}

export default function NavigationContent({ sortedTeams }: NavigationContentProps) {
  useEffect(() => {
    const menuButton = document.querySelector('#menu-button')
    const closeElements = document.querySelectorAll('.club-nav')

    const toggleModal = () => {
      if (!menuButton) return

      if (menuButton.classList.contains('is-active')) {
        MicroModal.close('nav-modal')
        menuButton.classList.remove('is-active')
        menuButton.setAttribute('aria-label', 'Open navigation')
      } else {
        MicroModal.show('nav-modal', {
          disableScroll: true
        })
        menuButton.classList.add('is-active')
        menuButton.setAttribute('aria-label', 'Close navigation')
      }
    }

    const handleClubNavClick = (event: MouseEvent) => {
      event.preventDefault()

      const target = event.currentTarget as HTMLElement
      if (!target || !menuButton) return

      const id = target.getAttribute('href')
      if (!id) return

      const targetElement = id.startsWith('/#') ? id.substring(2) : id.substring(1)

      toggleModal() // Close the modal before scrolling

      // Delay the scroll slightly to allow the modal to close
      setTimeout(() => {
        scroller.scrollTo(targetElement, {
          duration: 800,
          smooth: true,
          offset: -20
        })
      }, 150)
    }

    closeElements.forEach(element => {
      element.addEventListener('click', handleClubNavClick as EventListener)
    })

    menuButton?.addEventListener('click', toggleModal)

    return () => {
      closeElements.forEach(element => {
        element.removeEventListener('click', handleClubNavClick as EventListener)
      })
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
