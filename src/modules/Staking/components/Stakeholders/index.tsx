import * as React from 'react'
import { useIntl } from 'react-intl'
import { Observer, observer } from 'mobx-react-lite'

import {
    DateFilter, FilterField, Filters, NUM_REGEXP, RadioFilter, TextFilter,
} from '@/components/common/Filters'
import { Table } from '@/components/common/Table'
import { Header, Section, Title } from '@/components/common/Section'
import { UserCard } from '@/components/common/UserCard'
import { Amount } from '@/components/common/Amount'
import { Pagination } from '@/components/common/Pagination'
import { mapStakeholderKindToIntlId } from '@/modules/Staking/utils'
import { StakeholderApiOrdering, StakeholderKindApiRequest, StakeholdersApiFilters } from '@/modules/Staking/types'
import { ExplorerStoreContext } from '@/modules/Staking/providers/ExplorerStoreProvider'
import { usePagination } from '@/hooks/usePagination'
import { useTableOrder } from '@/hooks/useTableOrder'
import { useDateParam } from '@/hooks/useDateParam'
import { useBNParam } from '@/hooks/useBNParam'
import { useDictParam } from '@/hooks/useDictParam'
import { dateFormat, error } from '@/utils'

import './index.scss'

export function StakeholdersInner(): JSX.Element | null {
    const explorer = React.useContext(ExplorerStoreContext)

    if (!explorer) {
        return null
    }

    const intl = useIntl()
    const pagination = usePagination(explorer?.stakeholderTotalCount)
    const tableOrder = useTableOrder<StakeholderApiOrdering>('createdatdescending')

    const [createdAtGe, setCreatedAtGe] = useDateParam('created-ge')
    const [createdAtLe, setCreatedAtLe] = useDateParam('created-le')
    const [frozenStakeGe, setFrozenStakeGe] = useBNParam('frozen-ge')
    const [frozenStakeLe, setFrozenStakeLe] = useBNParam('frozen-le')
    const [lastRewardGe, setLastRewardGe] = useBNParam('last-reward-ge')
    const [lastRewardLe, setLastRewardLe] = useBNParam('last-reward-le')
    const [totalRewardGe, setTotalRewardGe] = useBNParam('total-reward-ge')
    const [totalRewardLe, setTotalRewardLe] = useBNParam('total-reward-le')
    const [userBalanceGe, setUserBalanceGe] = useBNParam('user-balance-ge')
    const [userBalanceLe, setUserBalanceLe] = useBNParam('user-balance-le')
    const [stakeholderKind, setStakeholderKind] = useDictParam<StakeholderKindApiRequest>(
        'stakeholder', ['ordinary', 'relay'],
    )

    const nullMessage = intl.formatMessage({
        id: 'NO_VALUE',
    })

    const fetch = async () => {
        try {
            await explorer.fetchStakeholders({
                createdAtGe,
                createdAtLe,
                frozenStakeGe,
                frozenStakeLe,
                lastRewardGe,
                lastRewardLe,
                totalRewardGe,
                totalRewardLe,
                userBalanceGe,
                userBalanceLe,
                stakeholderKind,
                limit: pagination.limit,
                offset: pagination.offset,
                ordering: tableOrder.order,
            })
        }
        catch (e) {
            error(e)
        }
    }

    const changeFilters = (localFilters: StakeholdersApiFilters) => {
        pagination.submit(1)
        setCreatedAtGe(localFilters.createdAtGe)
        setCreatedAtLe(localFilters.createdAtLe)
        setFrozenStakeGe(localFilters.frozenStakeGe)
        setFrozenStakeLe(localFilters.frozenStakeLe)
        setLastRewardGe(localFilters.lastRewardGe)
        setLastRewardLe(localFilters.lastRewardLe)
        setTotalRewardGe(localFilters.totalRewardGe)
        setTotalRewardLe(localFilters.totalRewardLe)
        setUserBalanceGe(localFilters.userBalanceGe)
        setUserBalanceLe(localFilters.userBalanceLe)
        setStakeholderKind(localFilters.stakeholderKind)
    }

    React.useEffect(() => {
        fetch()
    }, [
        createdAtGe,
        createdAtLe,
        frozenStakeGe,
        frozenStakeLe,
        lastRewardGe,
        lastRewardLe,
        totalRewardGe,
        totalRewardLe,
        userBalanceGe,
        userBalanceLe,
        stakeholderKind,
        pagination.limit,
        pagination.page,
        tableOrder.order,
    ])

    return (
        <Section>
            <Header size="lg">
                <Title size="lg">
                    {intl.formatMessage({
                        id: 'STAKEHOLDERS_TITLE',
                    })}
                </Title>

                <Filters<StakeholdersApiFilters>
                    filters={{
                        createdAtGe,
                        createdAtLe,
                        frozenStakeGe,
                        frozenStakeLe,
                        lastRewardGe,
                        lastRewardLe,
                        totalRewardGe,
                        totalRewardLe,
                        userBalanceGe,
                        userBalanceLe,
                        stakeholderKind,
                    }}
                    onChange={changeFilters}
                >
                    {(localFilters, changeFilter) => (
                        <>
                            <FilterField
                                title="Staking since"
                            >
                                <DateFilter
                                    value={localFilters.createdAtGe}
                                    onChange={changeFilter('createdAtGe')}
                                />
                                <DateFilter
                                    value={localFilters.createdAtLe}
                                    onChange={changeFilter('createdAtLe')}
                                />
                            </FilterField>
                            <FilterField
                                title="Balance"
                            >
                                <TextFilter
                                    regexp={NUM_REGEXP}
                                    placeholder="From"
                                    value={localFilters.userBalanceGe}
                                    onChange={changeFilter('userBalanceGe')}
                                />
                                <TextFilter
                                    regexp={NUM_REGEXP}
                                    placeholder="To"
                                    value={localFilters.userBalanceLe}
                                    onChange={changeFilter('userBalanceLe')}
                                />
                            </FilterField>
                            <FilterField
                                title="Frozen stake"
                            >
                                <TextFilter
                                    regexp={NUM_REGEXP}
                                    placeholder="From"
                                    value={localFilters.frozenStakeGe}
                                    onChange={changeFilter('frozenStakeGe')}
                                />
                                <TextFilter
                                    regexp={NUM_REGEXP}
                                    placeholder="To"
                                    value={localFilters.frozenStakeLe}
                                    onChange={changeFilter('frozenStakeLe')}
                                />
                            </FilterField>
                            <FilterField
                                title="Last reward"
                            >
                                <TextFilter
                                    regexp={NUM_REGEXP}
                                    placeholder="From"
                                    value={localFilters.lastRewardGe}
                                    onChange={changeFilter('lastRewardGe')}
                                />
                                <TextFilter
                                    regexp={NUM_REGEXP}
                                    placeholder="To"
                                    value={localFilters.lastRewardLe}
                                    onChange={changeFilter('lastRewardLe')}
                                />
                            </FilterField>
                            <FilterField
                                title="Total reward"
                            >
                                <TextFilter
                                    regexp={NUM_REGEXP}
                                    placeholder="From"
                                    value={localFilters.totalRewardGe}
                                    onChange={changeFilter('totalRewardGe')}
                                />
                                <TextFilter
                                    regexp={NUM_REGEXP}
                                    placeholder="To"
                                    value={localFilters.totalRewardLe}
                                    onChange={changeFilter('totalRewardLe')}
                                />
                            </FilterField>
                            <FilterField
                                title="Type"
                            >
                                <RadioFilter<StakeholderKindApiRequest>
                                    labels={[{
                                        id: 'ordinary',
                                        name: 'Ordinary',
                                    }, {
                                        id: 'relay',
                                        name: 'Relay',
                                    }]}
                                    onChange={changeFilter('stakeholderKind')}
                                    value={localFilters.stakeholderKind}
                                />
                            </FilterField>
                        </>
                    )}
                </Filters>
            </Header>

            <div className="card card--flat card--small">
                <Observer>
                    {() => (
                        <Table
                            loading={explorer.stakeholdersLoading}
                            className="stakeholders-table"
                            onSort={tableOrder.onSort}
                            order={tableOrder.order}
                            cols={[{
                                name: intl.formatMessage({
                                    id: 'STAKEHOLDERS_ADDRESS',
                                }),
                            }, {
                                name: intl.formatMessage({
                                    id: 'STAKEHOLDERS_TYPE',
                                }),
                            }, {
                                name: intl.formatMessage({
                                    id: 'STAKEHOLDERS_STAKE',
                                }),
                                align: 'right',
                                ascending: 'stakeascending',
                                descending: 'stakedescending',

                            }, {
                                name: intl.formatMessage({
                                    id: 'STAKEHOLDERS_FROZEN',
                                }),
                                align: 'right',
                                ascending: 'frozenstakeascending',
                                descending: 'frozenstakedescending',
                            }, {
                                name: intl.formatMessage({
                                    id: 'STAKEHOLDERS_30D',
                                }),
                                align: 'right',
                                ascending: 'lastrewardascending',
                                descending: 'lastrewarddescending',
                            }, {
                                name: intl.formatMessage({
                                    id: 'STAKEHOLDERS_REWARD',
                                }),
                                align: 'right',
                                ascending: 'totalrewardascending',
                                descending: 'totalrewarddescending',
                            }, {
                                name: intl.formatMessage({
                                    id: 'STAKEHOLDERS_DATE',
                                }),
                                align: 'right',
                                ascending: 'createdatascending',
                                descending: 'createdatdescending',
                            }]}
                            rows={explorer.stakeholdersItems.map(item => ({
                                cells: [
                                    item.userAddress ? (
                                        <UserCard
                                            copy
                                            external
                                            address={item.userAddress}
                                            link={`/staking/explorer/${item.userAddress}`}
                                        />
                                    ) : nullMessage,
                                    intl.formatMessage({
                                        id: mapStakeholderKindToIntlId(item.userType),
                                    }),
                                    <Amount value={item.stakeBalance} />,
                                    <Amount value={item.frozenStakeBalance} />,
                                    <Amount value={item.lastReward} />,
                                    <Amount value={item.totalReward} />,
                                    item.createdAt ? dateFormat(item.createdAt) : nullMessage,
                                ],
                            }))}
                        />
                    )}
                </Observer>

                <Pagination
                    totalPages={pagination.totalPages}
                    page={pagination.page}
                    onSubmit={pagination.submit}
                />
            </div>
        </Section>
    )
}

export const Stakeholders = observer(StakeholdersInner)