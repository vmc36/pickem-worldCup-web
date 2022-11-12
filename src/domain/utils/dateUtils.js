import moment from 'moment'
import 'moment/dist/locale/pt-br'

moment.locale('pt-br')

// Formata a hora exibida no header dos cards dos jogos
// no dashboard e no perfil do usuário (MatchCard)
export function formatTimeTitle(date) {
    return moment(date).format('HH:mm')
}

// Formata o título exibido no componente que controla a 
// paginação dos cards no dashboard e no perfil de
// usuário (MatchPagination)
export function getDateTitle(date) {
    return moment(date).format('DD[ de ]MMMM')
}

// Retorna a data referente ao próximo dia
// da data passada como parâmetro [date]
export function getNextDate(date) {
    return moment(date).add({days: 1}).toDate()
}

// Retorna a data referente ao dia anterior ao
// da data passada como parâmetro [date]
export function getPreviousDate(date) {
    return moment(date).subtract({days: 1}).toDate()
}

// Retorna qual a data de jogos será exibida
// ao iniciar a aplicação. Caso seja uma data
// anterior ao início da copa, retorna a data
// do primeiro dia da copa, senão, retorna a
// data atual
export function getInitialMatchesDate() {
    const currentDate = new Date()
    const worldCupStartDate = new Date('2022-11-20 16:00')
    
    if (moment(currentDate).isBefore(worldCupStartDate)) {
        return worldCupStartDate
    }

    return currentDate
}