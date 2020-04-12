import classnames from 'classnames';
import React, {FC} from 'react';

import {Color} from '~types';
import {toHex} from '~utils/color';

import style from './ColorPicker.scss';


type ColorPickerProps = {
    palette: Array<Array<[Color, string]>>;
    selectedRow: number;
    selectedColumn: number;
    handleSelectionChange: (row: number, column: number) => void;
    handleClick: () => void;
}

const ColorPicker: FC<ColorPickerProps> = ({
    palette, selectedRow, selectedColumn, handleSelectionChange, handleClick
}) => (
    <div
        className={style.main}
        tabIndex={0}
    >
        {palette.map((row, rowIndex) => (
            <div key={rowIndex} className={style.row}>
                {row.map((color, columnIndex) => (
                    <div
                        key={toHex(color[0])}
                        className={classnames(style.cell, {[style.focus]: selectedColumn === columnIndex && selectedRow === rowIndex})}
                        style={{backgroundColor: toHex(color[0])}}
                        onMouseOver={() => handleSelectionChange(rowIndex, columnIndex)}
                        onClick={handleClick}
                    />
                ))}
            </div>
        ))}
        <div>{palette[selectedRow][selectedColumn][1]}</div>
    </div>
);

export default ColorPicker;
