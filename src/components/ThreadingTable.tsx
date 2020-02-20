import classnames from 'classnames';
import React, {FC} from 'react';

import style from './ThreadingTable.scss';

type Key = string | number;

type CellComponentProps<T extends Key, R extends Key> = {
    tablet: T;
    row: R;
}

type RowMarginComponentProps<R extends Key> = {
    row: R;
}

type TabletMarginComponentProps<T extends Key> = {
    tablet: T;
}

type ThreadingTableProps<T extends Key, R extends Key> = {
    cellComponent: FC<CellComponentProps<T, R>>;
    leftMarginComponent?: FC<RowMarginComponentProps<R>>;
    rightMarginComponent?: FC<RowMarginComponentProps<R>>;
    topMarginComponent?: FC<TabletMarginComponentProps<T>>;
    bottomMarginComponent?: FC<TabletMarginComponentProps<T>>;
    rows: R[];
    tablets: T[];
}

const ThreadingTable = <T extends Key, R extends Key>({
    cellComponent: CellComponent,
    topMarginComponent: TopMargin,
    bottomMarginComponent: BottomMargin,
    leftMarginComponent: LeftMargin,
    rightMarginComponent: RightMargin,
    rows,
    tablets,
}: ThreadingTableProps<T, R>) => (
    <table>
        <tbody>
        <tr>
            <td/>
            <td>
                <div className={style.columnMargin}>{TopMargin && tablets.map((tablet) => (
                    <div key={tablet} className={style.columnMarginCell}>
                        <TopMargin tablet={tablet}/>
                    </div>
                ))}</div>
            </td>
            <td/>
        </tr>
        <tr>
            <td>
                <div className={style.rowMargin}>{LeftMargin && rows.map((row) => (
                    <div key={row} className={style.rowMarginCell}>
                        <LeftMargin row={row}/>
                    </div>
                ))}</div>
            </td>
            <td className={style.center}>
                {tablets.map((tablet) => (
                    <div key={tablet} className={style.column}>
                        {rows.map((row) => (
                            <div key={row} className={style.cell}>
                                <CellComponent tablet={tablet} row={row}/>
                            </div>
                        ))}
                    </div>
                ))}
            </td>
            <td>
                <div className={style.rowMargin}>{RightMargin && rows.map((row) => (
                    <div key={row} className={classnames(style.rowMarginCell, style.trailing)}>
                        <RightMargin row={row}/>
                    </div>
                ))}</div>
            </td>
        </tr>
        <tr>
            <td/>
            <td>
                <div className={style.columnMargin}>{BottomMargin && tablets.map((tablet) => (
                    <div key={tablet} className={classnames(style.columnMarginCell, style.trailing)}>
                        <BottomMargin tablet={tablet}/>
                    </div>
                ))}</div>
            </td>
            <td/>
        </tr>
        </tbody>
    </table>
);

export default ThreadingTable;
