import React, {FC} from 'react';

import style from './ThreadingTable.scss';

type Key = string | number;

type CellComponentProps<T extends Key, R extends Key> = {
    tablet: T;
    row: R;
}

type ThreadingTableProps<T extends Key, R extends Key> = {
    cellComponent: FC<CellComponentProps<T, R>>;
    rows: R[];
    tablets: T[];
}

const ThreadingTable = <T extends Key, R extends Key>({
    cellComponent: CellComponent,
    rows,
    tablets,
}: ThreadingTableProps<T, R>) => (
    <div className={style.main}>
        {tablets.map((tablet) => (
            <div key={tablet} className={style.column}>
                {rows.map((row) => (
                    <div key={row} className={style.cell}>
                        <CellComponent tablet={tablet} row={row} />
                    </div>
                ))}
            </div>
        ))}
    </div>
);

export default ThreadingTable;
