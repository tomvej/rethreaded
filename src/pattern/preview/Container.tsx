import React, {FC} from 'react';
import WeaveTable from './WeaveTable';

const Container: FC = () => (
    <svg style={{border: '1px solid black', width: 200, height: 120}} viewBox={"-50, -20, 200, 120"}>
        <WeaveTable />
    </svg>
);

export default Container;
