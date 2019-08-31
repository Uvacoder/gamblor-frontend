import React, { useEffect } from 'react'
import { parse } from 'query-string'
import Table from 'react-bootstrap/Table'

import { formatDate } from '../../utils/date'
import './index.scss'

function MarketHistory({ teamId, fetchPastGamesForTeam, results, allTeams, location }) {
  useEffect(() => {
    if (!teamId) {
      return
    }

    fetchPastGamesForTeam(teamId)
  }, [teamId, fetchPastGamesForTeam])

  const marketResult = success => {
    const resultClass = success ? 'success' : 'failure'
    return (
      <td className={`d-flex justify-content-center ${resultClass}`}>
        <span style={{ fontWeight: success ? 'bold' : '' }}>
          {success ? '✓' : '✘'}
        </span>
      </td>
    )
  }

  const row = game => {
    const { market } = parse(location.search)
    const opponent = allTeams[game.opponentId].shortName.toUpperCase()
    const date = formatDate(game.date)
    const success = game[market]

    const key = `${game.gameId}-${game.gameNumber}-${game.teamId}`
    return (
      <tr key={key}>
        <td>{date}</td>
        <td>{opponent} ({game.gameNumber})</td>
        {marketResult(success)}
      </tr>
    )
  }

  if (!teamId) {
    return <span />
  }

  return (
    <div>
      <h6>{allTeams[teamId].name}</h6>
      <small>
        <Table size='sm'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Opponent</th>
              <th>Result</th>
            </tr>
          </thead>

          <tbody>
            {results.map(row)}
          </tbody>

        </Table>
      </small>
    </div>
  )
}

export {
  MarketHistory
}
