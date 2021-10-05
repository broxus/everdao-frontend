import * as React from 'react'
import { Observer } from 'mobx-react-lite'
import { useIntl } from 'react-intl'

import { StatusIndicator } from '@/components/common/StatusIndicator'
import { useEvmTransferStoreContext } from '@/modules/Bridge/providers'


export function ReleaseStatusIndicator(): JSX.Element {
    const intl = useIntl()
    const transfer = useEvmTransferStoreContext()

    return (
        <div className="crosschain-transfer__status">
            <div className="crosschain-transfer__status-label">
                <Observer>
                    {() => (
                        <StatusIndicator
                            status={transfer.eventState?.status || 'disabled'}
                        >
                            {(() => {
                                switch (transfer.eventState?.status) {
                                    case 'confirmed':
                                        return intl.formatMessage({
                                            id: 'CROSSCHAIN_TRANSFER_STATUS_RELEASE_CONFIRMED',
                                        })

                                    case 'pending':
                                        return intl.formatMessage({
                                            id: 'CROSSCHAIN_TRANSFER_STATUS_RELEASE_PENDING',
                                        })

                                    case 'rejected':
                                        return intl.formatMessage({
                                            id: 'CROSSCHAIN_TRANSFER_STATUS_RELEASE_REJECTED',
                                        })

                                    default:
                                        return intl.formatMessage({
                                            id: 'CROSSCHAIN_TRANSFER_STATUS_RELEASE_DISABLED',
                                        })
                                }
                            })()}
                        </StatusIndicator>
                    )}
                </Observer>
            </div>
            <div className="crosschain-transfer__status-control">
                <p>
                    {intl.formatMessage({
                        id: 'CROSSCHAIN_TRANSFER_STATUS_RELEASE_NOTE',
                    })}
                </p>
            </div>
        </div>
    )
}
