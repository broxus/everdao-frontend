import * as React from 'react'
import { Observer } from 'mobx-react-lite'
import { useIntl } from 'react-intl'
import classNames from 'classnames'

import { Select } from '@/components/common/Select'
import { WrongNetworkError } from '@/modules/Bridge/components/WrongNetworkError'
import { TonWalletService } from '@/stores/TonWalletService'
import { EvmWalletService } from '@/stores/EvmWalletService'
import { NetworkShape } from '@/bridge'
import { isTonAddressValid } from '@/utils'
import { isEvmAddressValid } from '@/utils/is-evm-address-valid'


type Props = {
    address?: string;
    addressFieldDisabled?: boolean;
    addressFieldLabel: string;
    changeAddress: (value: string) => void;
    changeNetwork: (value: string, option: NetworkShape) => void;
    label: React.ReactNode;
    network?: NetworkShape;
    networkFieldDisabled?: boolean;
    networks: NetworkShape[];
    shouldDisplayNetworkAlert?: boolean;
    wallet?: TonWalletService | EvmWalletService;
}


export function RouteForm({
    address,
    addressFieldLabel,
    addressFieldDisabled,
    changeAddress,
    changeNetwork,
    label,
    network,
    networkFieldDisabled,
    networks,
    shouldDisplayNetworkAlert,
    wallet,
}: Props): JSX.Element {
    const intl = useIntl()

    const onChangeAddress: React.ChangeEventHandler<HTMLInputElement> = event => {
        changeAddress(event.target.value)
    }

    const isAddressValid = () => {
        if (address !== undefined) {
            if (network?.type === 'evm') {
                return isEvmAddressValid(address)
            }

            if (network?.type === 'ton') {
                return isTonAddressValid(address)
            }
        }

        return true
    }

    return (
        <div className="card card--flat card--small crosschain-transfer">
            <div className="crosschain-transfer__label">
                {label}
            </div>
            <form className="form crosschain-transfer__form">
                <fieldset className="form-fieldset">
                    <legend className="form-legend">
                        {intl.formatMessage({
                            id: 'CROSSCHAIN_TRANSFER_ROUTE_NETWORK_LABEL',
                        })}
                    </legend>
                    <div className="crosschain-transfer__controls">
                        <div className="crosschain-transfer__control">
                            <Observer>
                                {() => (
                                    <Select
                                        className="rc-select--lg"
                                        fieldNames={{
                                            value: 'chainId',
                                        }}
                                        disabled={networkFieldDisabled}
                                        // @ts-ignore
                                        options={networks}
                                        placeholder={intl.formatMessage({
                                            id: 'CROSSCHAIN_TRANSFER_ROUTE_SELECT_NETWORK_PLACEHOLDER',
                                        })}
                                        value={network?.chainId}
                                        // @ts-ignore
                                        onChange={changeNetwork}
                                    />
                                )}
                            </Observer>
                        </div>

                        <Observer>
                            {() => (
                                <div className="crosschain-transfer__wallet">
                                    {(wallet !== undefined && !wallet.isConnected) && (
                                        <button
                                            type="button"
                                            className="btn btn--primary"
                                            disabled={wallet.isConnecting}
                                            onClick={wallet.connect}
                                        >
                                            {intl.formatMessage({
                                                id: 'CROSSCHAIN_TRANSFER_WALLET_CONNECT_BTN_TEXT',
                                            })}
                                        </button>
                                    )}
                                </div>
                            )}
                        </Observer>
                    </div>

                    <Observer>
                        {() => (
                            <>
                                {(
                                    wallet !== undefined
                                    && wallet.isConnected
                                    && network !== undefined
                                    && shouldDisplayNetworkAlert
                                ) && (
                                    <WrongNetworkError
                                        key="alert"
                                        network={network}
                                    />
                                )}
                            </>
                        )}
                    </Observer>
                </fieldset>

                <fieldset className="form-fieldset">
                    <legend className="form-legend">{addressFieldLabel}</legend>
                    <div className="crosschain-transfer__controls">
                        <div className="crosschain-transfer__control">
                            <Observer>
                                {() => (
                                    <input
                                        className={classNames('form-input', 'form-input--lg', {
                                            invalid: !isAddressValid(),
                                        })}
                                        disabled={!wallet?.isConnected || addressFieldDisabled}
                                        type="text"
                                        value={address}
                                        onChange={onChangeAddress}
                                    />
                                )}
                            </Observer>
                        </div>
                        <div className="crosschain-transfer__wallet" />
                    </div>
                </fieldset>
            </form>
        </div>
    )
}
