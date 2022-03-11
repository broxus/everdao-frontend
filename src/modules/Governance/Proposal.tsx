import * as React from 'react'
import { useIntl } from 'react-intl'
import { observer } from 'mobx-react-lite'
import { DiscussionEmbed } from 'disqus-react'
import { useParams } from 'react-router-dom'

import { ContentLoader } from '@/components/common/ContentLoader'
import { Container } from '@/components/common/Section'
import { ProposalHeader } from '@/modules/Governance/components/ProposalHeader'
import { Breadcrumb } from '@/components/common/Breadcrumb'
import { ProposalVoting } from '@/modules/Governance/components/ProposalVoting'
import { ProposalContent } from '@/modules/Governance/components/ProposalContent'
import { VotesTable } from '@/modules/Governance/components/VotesTable'
import { ProposalTimeline } from '@/modules/Governance/components/ProposalTimeline'
import { ProposalManagement } from '@/modules/Governance/components/ProposalManagement'
import { UserVote } from '@/modules/Governance/components/UserVote'
import { useProposalContext } from '@/modules/Governance/providers'

import './index.scss'

type RouteParams = {
    id: string;
}

export function ProposalInner(): JSX.Element | null {
    const intl = useIntl()
    const proposal = useProposalContext()
    const routeParams = useParams<RouteParams>()

    if (proposal.loading) {
        return (
            <ContentLoader transparent />
        )
    }

    return (
        <Container size="lg">
            <Breadcrumb
                items={[{
                    title: intl.formatMessage({
                        id: 'GOVERNANCE_BREADCRUMB_OVERVIEW',
                    }),
                    link: '/governance',
                }, {
                    title: intl.formatMessage({
                        id: 'GOVERNANCE_BREADCRUMB_PROPOSALS',
                    }),
                    link: '/governance/proposals',
                }, {
                    title: intl.formatMessage({
                        id: proposal.id && proposal.title
                            ? 'GOVERNANCE_BREADCRUMB_PROPOSAL'
                            : 'PROPOSAL_UNKNOWN_TITLE',
                    }, {
                        id: proposal.id,
                        title: proposal.title,
                    }),
                }]}
            />

            <ProposalHeader />

            <div className="proposal-layout-content">
                <div>
                    <ProposalVoting />
                    <ProposalTimeline />
                    <ProposalContent />
                </div>
                <div className="proposal-layout-sidebar">
                    <ProposalManagement />
                    <UserVote />
                </div>
            </div>

            <VotesTable />

            <DiscussionEmbed
                shortname="everdao"
                config={{
                    url: window.location.href,
                    identifier: routeParams.id,
                    title: proposal.title,
                }}
            />
        </Container>
    )
}

export const Proposal = observer(ProposalInner)
