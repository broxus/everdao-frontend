import * as React from 'react'

import { VotingStore } from '@/modules/Governance/stores'
import { UserDataStore } from '@/modules/Governance/stores/UserData'
import { useTonWallet } from '@/stores/TonWalletService'

export function useVoting(userData: UserDataStore): VotingStore {
    const ref = React.useRef<VotingStore>()
    ref.current = ref.current || new VotingStore(
        useTonWallet(),
        userData,
    )
    return ref.current
}
