import * as React from 'react'

import { ProposalStore } from '@/modules/Governance/stores/Proposal'
import { UserDataStore } from '@/modules/Governance/stores/UserData'
import { useTonWallet } from '@/stores/TonWalletService'

export function useProposal(userData: UserDataStore): ProposalStore {
    const ref = React.useRef<ProposalStore>()
    ref.current = ref.current || new ProposalStore(
        useTonWallet(),
        userData,
    )

    return ref.current
}
