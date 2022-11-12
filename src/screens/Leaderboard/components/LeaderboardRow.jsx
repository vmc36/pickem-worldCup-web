import { tail, tailed } from 'tailed-js'
import styledBy from 'styled-by'
import { Link } from 'react-router-dom'

const LeaderboardRowWrapper = tailed('tr')`
    border-l-8
    p-4

    ${styledBy('position', {
        1: 'border-amber-400',
        2: 'border-zinc-400',
        3: 'border-yellow-700'
    })}

    ${styledBy('type', {
        'default': 'even:bg-slate-200',
        'user': 'border-primary bg-primary text-on-primary'
    })}
`

export function LeaderboardRowDivider() {
    return (
        <LeaderboardRowWrapper>
            <td className="text-2xl" colSpan={5}>
                ...
            </td>
        </LeaderboardRowWrapper>
    )
}

export function LeaderboardRow({score, isCurrentUser}) {
    const type = isCurrentUser ? 'user' : 'default'
    const performancePercentual = `${(score.performance * 100).toFixed(1)}%`

    const linkClassNames = tail`
        font-bold

        ${(props) => props.type === 'user' ? 'text-on-primary' : 'text-primary'}
    `

    return (
        <LeaderboardRowWrapper
            position={score.position}
            type={type}
            >
            <td className="text-sm font-bold">{score.position}</td>
            <td>{score.user.username}</td>
            <td>{score.points}</td>
            <td className="flex flex-col items-center justify-center">
                <span className="inline text-sm">
                    {performancePercentual}
                </span>
                <meter
                    low={0.35}
                    high={0.7}
                    optimum={1}
                    min={0}
                    max={1}
                    value={score.performance}
                    >
                        {performancePercentual}
                </meter>
            </td>
            <td>
                <Link
                    to={`/u/${score.user.username}`}
                    className={linkClassNames({type})}
                    >
                    Ver Perfil
                </Link>
            </td>
        </LeaderboardRowWrapper>
    )
}