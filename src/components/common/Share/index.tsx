import * as React from 'react'
import {
    FacebookShareButton, RedditShareButton, TelegramShareButton, TwitterShareButton,
} from 'react-share'
import { useLocation } from 'react-router-dom'

import { useProposalContext } from '@/modules/Governance/providers'
import { Icon } from '@/components/common/Icon'

import './index.scss'

export function Share(): JSX.Element {
    const proposal = useProposalContext()
    const location = useLocation()
    const url = `https://everdao.net${location.pathname}`

    return (
        <div className="share">
            <FacebookShareButton
                url={url}
                quote={proposal.title}
                resetButtonStyle={false}
            >
                <Icon icon="facebook" />
            </FacebookShareButton>

            <TwitterShareButton
                url={url}
                title={proposal.title}
                resetButtonStyle={false}
            >
                <Icon icon="twitter" />
            </TwitterShareButton>

            <RedditShareButton
                url={url}
                title={proposal.title}
                resetButtonStyle={false}
            >
                <Icon icon="reddit" />
            </RedditShareButton>

            <TelegramShareButton
                url={url}
                title={proposal.title}
                resetButtonStyle={false}
            >
                <Icon icon="telegram" />
            </TelegramShareButton>
        </div>
    )
}
