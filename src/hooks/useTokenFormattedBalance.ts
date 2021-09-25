import * as React from 'react'

import { TokenCache, useTonTokensCache } from '@/stores/TonTokensCacheService'
import { error, formatBalance } from '@/utils'


export type TokenFormattedBalanceOptions = {
    subscriberPrefix?: string;
    watchOnMount?: boolean;
    unwatchOnUnmount?: boolean;
}

export type TokenFormattedBalanceShape = {
    value: string;
    isFetching: boolean;
}


const mountedTokens: Record<string, boolean> = {}


export function useTokenFormattedBalance(
    token?: TokenCache,
    options?: TokenFormattedBalanceOptions,
): TokenFormattedBalanceShape {
    const tokensCache = useTonTokensCache()

    const {
        subscriberPrefix = 'sub',
        watchOnMount = true,
        unwatchOnUnmount = watchOnMount as boolean,
    } = { ...options }

    const [balance, setBalance] = React.useState(
        formatBalance(
            token?.balance || '0',
            token?.decimals,
        ) || '0',
    )

    const [isFetching, setFetchingTo] = React.useState(false)

    React.useEffect(() => {
        setBalance(formatBalance(
            token?.balance || '0',
            token?.decimals,
        ) || '0')
    }, [token?.balance])

    React.useEffect(() => {
        if (token !== undefined) {
            mountedTokens[`${subscriberPrefix}-${token.root}`] = true;

            (async () => {
                setFetchingTo(true)
                try {
                    await tokensCache.syncToken(token.root)
                    if (mountedTokens[`${subscriberPrefix}-${token.root}`]) {
                        setBalance(formatBalance(
                            token.balance || '0',
                            token.decimals,
                        ) || '0')
                        setFetchingTo(false)
                    }
                }
                catch (e) {
                    error('Token update failure', e)
                    if (mountedTokens[`${subscriberPrefix}-${token.root}`]) {
                        setFetchingTo(false)
                    }
                }
                finally {
                    if (mountedTokens[`${subscriberPrefix}-${token.root}`]) {
                        setFetchingTo(false)
                        if (watchOnMount) {
                            await tokensCache.watch(token.root, subscriberPrefix)
                        }
                    }
                }
            })()
        }

        return () => {
            if (token) {
                mountedTokens[`${subscriberPrefix}-${token.root}`] = false
            }

            if (token && unwatchOnUnmount) {
                tokensCache.unwatch(token.root, subscriberPrefix).catch(reason => error(reason))
            }
        }
    }, [token, token?.wallet])

    return { value: balance, isFetching }
}
