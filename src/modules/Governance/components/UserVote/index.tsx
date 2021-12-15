import * as React from 'react'
import { useIntl } from 'react-intl'
import { observer } from 'mobx-react-lite'
import BigNumber from 'bignumber.js'

import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import { Summary } from '@/components/common/Summary'
import { ContentLoader } from '@/components/common/ContentLoader'
import { TonButtonConnector } from '@/modules/TonWalletConnector/Button'
import { useProposalContext, useVotingContext } from '@/modules/Governance/providers'
import { VotingForm } from '@/modules/Governance/components/VotingForm'
import { useMounted } from '@/hooks'
import { dateFormat, error } from '@/utils'

import './index.scss'

// TODO: Voting power
// TODO: Voting weight
export function UserVoteInner(): JSX.Element {
    const intl = useIntl()
    const mounted = useMounted()
    const proposal = useProposalContext()
    const voting = useVotingContext()
    const [formVisible, setFormVisible] = React.useState(false)
    const [support, setSupport] = React.useState(false)
    const currentTime = new Date().getTime()
    const castedVote = voting.castedVotes?.find(([id]) => parseInt(id, 10) === proposal.id)

    const showFormFn = (_support: boolean) => () => {
        setSupport(_support)
        setFormVisible(true)
    }

    const hideForm = () => {
        setFormVisible(false)
    }

    const castVote = async (reason?: string) => {
        if (!proposal.id) {
            return
        }
        try {
            await voting.castVote(proposal.id, support, reason)
        }
        catch (e) {
            error(e)
        }
    }

    const unlockTokens = async () => {
        if (!proposal.id) {
            return
        }
        try {
            await voting.unlockCastedVote([proposal.id])
        }
        catch (e) {
            error(e)
        }
    }

    return (
        <div className="user-vote">
            <h3 className="user-vote__title">
                {intl.formatMessage({
                    id: 'USER_VOTE_TITLE',
                })}

                {castedVote && (
                    <Badge status={castedVote[1] ? 'success' : 'fail'}>
                        {intl.formatMessage({
                            id: castedVote[1] ? 'PROPOSALS_VOTE_1' : 'PROPOSALS_VOTE_0',
                        })}
                    </Badge>
                )}
            </h3>

            <Summary
                space="sm"
                items={[{
                    key: intl.formatMessage({
                        id: 'USER_VOTE_VOTING_POWER',
                    }),
                    value: intl.formatMessage({
                        id: 'NO_VALUE',
                    }),
                }, {
                    key: intl.formatMessage({
                        id: 'USER_VOTE_VOTING_WEIGHT',
                    }),
                    value: intl.formatMessage({
                        id: 'NO_VALUE',
                    }),
                }]}
            />

            <TonButtonConnector size="md">
                {/* eslint-disable no-nested-ternary */}
                {!mounted || voting.loading || proposal.loading ? (
                    <Button
                        block
                        size="md"
                        type="secondary"
                    >
                        <ContentLoader slim transparent />
                    </Button>
                ) : (
                    proposal.id && (
                        castedVote ? (
                            <>
                                <Button
                                    block
                                    size="md"
                                    type="secondary"
                                    disabled={proposal.state === 'Active' || voting.unlockVoteLoading}
                                    onClick={unlockTokens}
                                >
                                    {voting.unlockVoteLoading ? (
                                        <ContentLoader slim transparent />
                                    ) : (
                                        intl.formatMessage({
                                            id: 'USER_VOTE_UNLOCK_TOKENS',
                                        })
                                    )}
                                </Button>
                                <div className="user-vote__hint">
                                    {intl.formatMessage({
                                        id: 'USER_VOTE_UNLOCK_HINT',
                                    })}
                                </div>
                            </>
                        ) : (
                            proposal.state === 'Active' ? (
                                new BigNumber(voting.tokenBalance || 0).eq(0) ? (
                                    <Button
                                        block
                                        size="md"
                                        type="secondary"
                                        link="/staking"
                                        key="staking"
                                    >
                                        {intl.formatMessage({
                                            id: 'USER_VOTE_INCREASE_STAKE',
                                        })}
                                    </Button>
                                ) : (
                                    <div className="user-vote__actions">
                                        <Button
                                            block
                                            size="md"
                                            type="accept"
                                            onClick={showFormFn(true)}
                                            disabled={voting.castLoading}
                                            key="for"
                                        >
                                            {intl.formatMessage({
                                                id: 'USER_VOTE_FOR',
                                            })}
                                        </Button>

                                        <Button
                                            block
                                            size="md"
                                            type="danger"
                                            onClick={showFormFn(false)}
                                            disabled={voting.castLoading}
                                            key="against"
                                        >
                                            {intl.formatMessage({
                                                id: 'USER_VOTE_AGAINST',
                                            })}
                                        </Button>
                                    </div>
                                )
                            ) : (
                                <div className="user-vote__message text-muted">
                                    {proposal.startTime && proposal.queuedAt ? (
                                        currentTime > proposal.startTime && currentTime < proposal.queuedAt ? (
                                            intl.formatMessage({
                                                id: 'USER_VOTE_START_TEXT',
                                            }, {
                                                start: dateFormat(proposal.startTime),
                                                end: dateFormat(proposal.queuedAt),
                                            })
                                        ) : (
                                            intl.formatMessage({
                                                id: 'USER_VOTE_ENDED_TEXT',
                                            }, {
                                                start: dateFormat(proposal.startTime),
                                                end: dateFormat(proposal.queuedAt),
                                            })
                                        )
                                    ) : (
                                        intl.formatMessage({
                                            id: 'USER_VOTE_UNKNOWN_STATE',
                                        })
                                    )}
                                </div>
                            )
                        )
                    )
                )}
            </TonButtonConnector>

            {formVisible && (
                <VotingForm
                    loading={voting.castLoading || voting.loading}
                    disabled={voting.castLoading}
                    support={support}
                    onDismiss={hideForm}
                    onSubmit={castVote}
                />
            )}
        </div>
    )
}

export const UserVote = observer(UserVoteInner)
