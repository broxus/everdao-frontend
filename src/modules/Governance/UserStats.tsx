import * as React from 'react'
import { useIntl } from 'react-intl'
import { Observer } from 'mobx-react-lite'

import { Description, Section, Title } from '@/components/common/Section'
import { DataCard } from '@/components/common/DataCard'
import { useVotingContext } from '@/modules/Governance/providers'
import { formattedAmount } from '@/utils'

export function UserStats(): JSX.Element {
    const intl = useIntl()
    const voting = useVotingContext()

    const noValue = intl.formatMessage({
        id: 'NO_VALUE',
    })

    React.useEffect(() => {
        if (voting.isConnected) {
            voting.init()
        }
        else {
            voting.dispose()
        }
    }, [voting.isConnected])

    return (
        <Section>
            <Title>
                {intl.formatMessage({
                    id: 'USER_VOTES_TITLE',
                })}
            </Title>
            <Description>
                {intl.formatMessage({
                    id: 'USER_VOTES_DESC',
                })}
            </Description>

            <Observer>
                {() => (
                    <div className="tiles">
                        <DataCard
                            title={intl.formatMessage({
                                id: 'USER_VOTES_POWER',
                            })}
                            value={voting.votingPower && voting.tokenDecimals
                                ? formattedAmount(voting.votingPower, voting.tokenDecimals, true, true)
                                : noValue}
                        />
                        <DataCard
                            title={intl.formatMessage({
                                id: 'USER_VOTES_WEIGHT',
                            })}
                            value={voting.votingWeight
                                ? `${formattedAmount(voting.votingWeight, 0)}%`
                                : noValue}
                        />
                        <DataCard
                            title={intl.formatMessage({
                                id: 'USER_VOTES_VOTED',
                            })}
                            value={voting.votesCount || noValue}
                        />
                    </div>
                )}
            </Observer>
        </Section>
    )
}
