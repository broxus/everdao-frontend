import { makeAutoObservable } from 'mobx'

import {
    Vote, VotesRequest, VotesResponse, VotesStoreData, VotesStoreState,
} from '@/modules/Governance/types'
import { handleVotes } from '@/modules/Governance/utils'
import { error, lastOfCalls, throwException } from '@/utils'

export class VotesStore {

    protected data: VotesStoreData = {}

    protected state: VotesStoreState = {}

    protected handleVotes: (params: VotesRequest) => Promise<VotesResponse | undefined>

    constructor() {
        makeAutoObservable(this)

        this.handleVotes = lastOfCalls(handleVotes)
    }

    public dispose(): void {
        this.data = {}
        this.state = {}
    }

    protected setState<K extends keyof VotesStoreState>(key: K, value: VotesStoreState[K]): void {
        this.state[key] = value
    }

    protected setData<K extends keyof VotesStoreData>(key: K, value: VotesStoreData[K]): void {
        this.data[key] = value
    }

    public async fetch(params: VotesRequest, silence?: boolean): Promise<void> {
        if (!silence) {
            this.setState('loading', true)
        }

        try {
            this.setState('params', params)

            const response = await this.handleVotes(params)

            if (response) {
                this.setData('response', response)
            }
        }
        catch (e) {
            error(e)
        }

        if (!silence) {
            this.setState('loading', false)
        }
    }

    public async sync(silence?: boolean): Promise<void> {
        try {
            if (!this.state.params) {
                throwException('Params must be defined in state')
            }

            this.fetch(this.state.params, silence)
        }
        catch (e) {
            error(e)
        }
    }

    public get totalCount(): number {
        return this.data.response?.totalCount || 1
    }

    public get items(): Vote[] {
        return this.data.response?.votes || []
    }

    public get loading(): boolean {
        return !!this.state.loading
    }

}
