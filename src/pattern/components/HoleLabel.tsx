import React, {FC} from 'react';

import {Hole} from '~types';

type HoleLabelProps = {
    row: Hole;
};

const getLabel = (hole: Hole): string => {
    switch (hole) {
        case Hole.A:
            return 'A';
        case Hole.B:
            return 'B';
        case Hole.C:
            return 'C';
        case Hole.D:
            return 'D';
    }
};


const HoleLabel: FC<HoleLabelProps> = ({row}) => <div>{getLabel(row)}</div>;

export default HoleLabel;
