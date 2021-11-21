import { IndexerApiBaseUrl } from '@/config'
import {
    TransferKind, TransfersApiRequest, TransfersApiResponse,
    TransfersApiStatus, TransfersApiTransfer,
} from '@/modules/Transfers/types'
import { BadgeStatus } from '@/components/common/Badge'
import { findNetwork } from '@/modules/Bridge/utils'

export async function handleTransfersApi(params: TransfersApiRequest): Promise<TransfersApiResponse> {
    const url = `${IndexerApiBaseUrl}/transfers/search`
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })

    if (!response.ok) {
        throw response
    }

    const result: TransfersApiResponse = await response.json()

    return result
}

export function mapStatusToIntl(status: TransfersApiStatus): string {
    const map: Record<TransfersApiStatus, string> = {
        Pending: 'TRANSFERS_STATUS_PENDING',
        Rejected: 'TRANSFERS_STATUS_REJECTED',
        Confirmed: 'TRANSFERS_STATUS_CONFIRMED',
    }
    return map[status]
}

export function mapStatusToBadge(status: TransfersApiStatus): BadgeStatus {
    const map: Record<TransfersApiStatus, BadgeStatus> = {
        Pending: 'warning',
        Rejected: 'disabled',
        Confirmed: 'success',
    }

    return map[status]
}

export function getFromNetwork(transferKind: TransferKind, chainId: number): string | undefined {
    switch (transferKind) {
        case 'EthToTon':
            return findNetwork(chainId.toString(), 'evm')?.label
        case 'TonToEth':
            return findNetwork('1', 'ton')?.label
        default:
            return undefined
    }
}

export function getToNetwork(transferKind: TransferKind, chainId: number): string | undefined {
    switch (transferKind) {
        case 'EthToTon':
            return findNetwork('1', 'ton')?.label
        case 'TonToEth':
            return findNetwork(chainId.toString(), 'evm')?.label
        default:
            return undefined
    }
}

export function getTransferLink(transfer: TransfersApiTransfer): string | undefined {
    if (!transfer.contractAddress || !transfer.transactionHash) {
        return undefined
    }

    switch (transfer.transferKind) {
        case 'EthToTon':
            return `/transfer/evm-${transfer.chainId}/ton-1/0x${transfer.transactionHash}`
        case 'TonToEth':
            return `/transfer/ton-1/evm-${transfer.chainId}/${transfer.contractAddress}`
        default:
            return undefined
    }
}
