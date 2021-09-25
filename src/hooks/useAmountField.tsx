import * as React from 'react'

import { TokenCache as EvmTokenCache } from '@/stores/EvmTokensCacheService'
import { TokenCache as TonTokenCache } from '@/stores/TonTokensCacheService'
import { formatAmount } from '@/utils'


type FieldShape = {
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

type Props = {
    token?: EvmTokenCache | TonTokenCache;
    value?: string;
    onChange?: (value: string) => void;
}


export function useAmountField({ token, ...props }: Props): FieldShape {
    const onBlur: React.FocusEventHandler<HTMLInputElement> = event => {
        const { value } = event.target
        if (value.length === 0) {
            return
        }
        const validatedAmount = formatAmount(value, token?.decimals)
        if (props.value !== validatedAmount && validatedAmount != null) {
            props.onChange?.(validatedAmount)
        }
        else if (validatedAmount == null) {
            props.onChange?.('')
        }
    }

    const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        let { value } = event.target
        value = value.replace(/(?!- )[^0-9.]/g, '')
        props.onChange?.(value)
    }

    return { onBlur, onChange }
}
