import * as React from 'react'
import classNames from 'classnames'

import './style.scss'

export type TvlChangeProps = {
    changesDirection: number;
    priceChange: string;
    size?: 'small';
    showPercent?: boolean;
}

export function TvlChange({
    changesDirection,
    priceChange,
    size,
    showPercent = true,
}: TvlChangeProps): JSX.Element {
    return (
        <div
            className={classNames('changes-direction', {
                'changes-direction_up': changesDirection > 0,
                'changes-direction_down': changesDirection < 0,
                [`changes-direction_${size}`]: Boolean(size),
            })}
        >
            {priceChange}
            {showPercent && '%'}
        </div>
    )
}
