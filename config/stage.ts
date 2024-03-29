import { AddressLiteral } from 'everscale-inpage-provider'

import { NetworkShape } from '@/types'


export const networks: NetworkShape[] = [
    {
        chainId: '1',
        currencySymbol: 'ETH',
        explorerBaseUrl: 'https://etherscan.io/',
        id: 'evm-1',
        label: 'Ethereum',
        name: 'Ethereum Mainnet',
        rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        transactionType: '0x2',
        type: 'evm',
    },
    {
        chainId: '56',
        currencySymbol: 'BNB',
        explorerBaseUrl: 'https://bscscan.com/',
        id: 'evm-56',
        label: 'BNB Chain (Binance Smart Chain)',
        name: 'BNB Chain',
        rpcUrl: 'https://bsc-dataseed.binance.org/',
        transactionType: '0x0',
        type: 'evm',
    },
    {
        chainId: '250',
        currencySymbol: 'FTM',
        explorerBaseUrl: 'https://ftmscan.com/',
        id: 'evm-250',
        label: 'Fantom Opera',
        name: 'Fantom Opera',
        rpcUrl: 'https://rpc.ftm.tools/',
        transactionType: '0x0',
        type: 'evm',
    },
    {
        chainId: '137',
        currencySymbol: 'MATIC',
        explorerBaseUrl: 'https://polygonscan.com/',
        id: 'evm-137',
        label: 'Polygon',
        name: 'Polygon',
        rpcUrl: 'https://matic-mainnet.chainstacklabs.com/',
        transactionType: '0x0',
        type: 'evm',
    },
    {
        chainId: '1',
        currencySymbol: 'EVER',
        explorerBaseUrl: 'https://everscan.io/',
        id: 'ton-1',
        label: 'Everscale',
        name: 'Everscale',
        rpcUrl: '',
        type: 'ton',
    },
]


export const AirdropContractAddress = new AddressLiteral('0:b321058503889a78fe0954cfb67564b218cff1eac1467dc48e4c80118dd6719f')

export const DexRootAddress = new AddressLiteral('0:5eb5713ea9b4a0f3a13bc91b282cde809636eb1e68d2fcb6427b9ad78a5a9008')

export const WTONRootAddress = new AddressLiteral('0:a49cd4e158a9a15555e624759e2e4e766d22600b7800d891e46f9291f044a93d')

export const CreditBody = '5800000000'

export const EmptyWalletMinTonsAmount = '10000000000'

export const CreditFactoryAddress = new AddressLiteral('0:5ae128e08b2c17428629e092c1a7bd5c77a83a27fa3b833a31c2eb3d704d7f68')

export const DepositToFactoryMaxSlippage = 10

export const DepositToFactoryMinSlippageNumerator = '1'

export const DepositToFactoryMinSlippageDenominator = '100'

export const GasToStaking = '11500000000'

export const GasToCastVote = '11500000000'

export const MinGasToUnlockCastedVotes = '11000000000'

export const GasToUnlockCastedVote = '200000000'

export const GasToUnlockVoteTokens = '11500000000'

export const HiddenBridgeStrategyGas = '2500000000'

export const HiddenBridgeStrategyFactory = new AddressLiteral('0:18e1dfffa7c13122c993c94b205b68905c14b77ce03d3cbcb1fd6f52664fbf2d')

export const RelayEvmNetworkChainId = '1'

export const StakingAccountAddress = new AddressLiteral('0:c4b6a1d72db79ea6fa4f71114440bb2d77d878cbb6e8bc181f51ede9cde50d06')

export const DaoRootContractAddress = new AddressLiteral('0:cd809fb1cde24b6d3cd4a3dd9102e10c0f73ddfa21c7118f233dc7309bbb0b73')

export const TokenAssetsURI = 'https://raw.githubusercontent.com/broxus/bridge-assets/master/main.json'

export const TokenListURI = 'https://raw.githubusercontent.com/broxus/ton-assets/master/manifest.json'

export const UpgradeTokenListURI = 'https://raw.githubusercontent.com/broxus/everscale-assets-upgrade/master/main.json'

export const Web3Url = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'

export const IndexerApiBaseUrl = 'https://staking.everdao.net/v1'

export const DaoIndexerApiBaseUrl = 'https://api.everdao.net/v1'

export const TonSwapIndexerApiBaseUrl = 'https://ton-swap-indexer.broxus.com/v1'
