import { tally } from '../../Tally/types/tally'

export type item = {
    meta?: any,
    spaceName: string,
    id: string,
    route: string,
    tally: tally[]
}