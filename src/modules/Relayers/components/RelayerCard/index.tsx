import * as React from 'react'
import { useIntl } from 'react-intl'

import { UserAvatar } from '@/components/common/UserAvatar'
import { RelayerStatus } from '@/modules/Relayers/components/RelayerStatus'
import { Status } from '@/modules/Relayers/types'
import { sliceAddress } from '@/utils'

import './index.scss'

type Props = {
    address: string;
    status?: Status;
    rank?: number;
}

export function RelayerCard({
    address,
    status,
    rank,
}: Props): JSX.Element | null {
    const intl = useIntl()
    const shortAddress = sliceAddress(address)

    return (
        <div className="relayer-card">
            <div className="relayer-card__main">
                <UserAvatar
                    size="large"
                    address={address}
                />
            </div>

            <div className="relayer-card__side">
                {shortAddress && (
                    <div className="relayer-card__name">
                        {intl.formatMessage({
                            id: 'RELAYER_HEADER_NAME',
                        }, {
                            address: shortAddress,
                        })}
                    </div>
                )}

                <div className="relayer-card__meta">
                    {status && (
                        <div className="relayer-card__status">
                            <RelayerStatus status={status} />
                        </div>
                    )}

                    {rank !== undefined && (
                        <div className="relayer-card__rank text-muted">
                            {intl.formatMessage({
                                id: 'RELAYER_RANK',
                            }, {
                                rank,
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
