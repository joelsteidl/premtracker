'use client'

import { useEffect, useCallback } from 'react'
import MicroModal from 'micromodal'
import ClubMatch from './ClubMatch'
import type { ExtendedStanding } from '@/types'
import './club-matches.css'

interface ClubMatchesContentProps {
  standing: ExtendedStanding
}

export default function ClubMatchesContent({ standing }: ClubMatchesContentProps) {
  const isInverse = ['lut', 'not', 'tot'].includes(standing.team.tla.toLowerCase())

  const closeModal = useCallback((event: Event) => {
    event.preventDefault()
    MicroModal.close(`modal-${standing.team.tla}`)
  }, [standing.team.tla])

  useEffect(() => {
    const closeButton = document.querySelector(`#button-close-${standing.team.tla}`) as HTMLElement
    closeButton?.addEventListener('click', closeModal)

    return () => {
      closeButton?.removeEventListener('click', closeModal)
    }
  }, [closeModal, standing.team.tla])

  return (
    <div className="club-card-matches">
      {standing.team.matches?.map((match) => (
        <ClubMatch key={`match-${match.id}`} match={match} teamId={standing.team.id} />
      ))}
    </div>
  )
}
