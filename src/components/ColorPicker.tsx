import classnames from 'classnames';
import React, {FC} from 'react';

import {Color} from '~types';
import {toHex} from '~utils/color';

import style from './ColorPicker.scss';


type ColorPickerProps = {
    palette: Array<Array<Color>>;
    selectedRow: number;
    selectedColumn: number;
    handleSelectionChange: (row: number, column: number) => void;
    handleClick: () => void;
    originalColor: Color;
}

const ColorPicker: FC<ColorPickerProps> = ({
    palette, selectedRow, selectedColumn, handleSelectionChange, handleClick, originalColor
}) => (
    <div className={style.main}>
        <div className={style.showcase}>
            <div style={{backgroundColor: toHex(originalColor)}} />
            <div style={{backgroundColor: toHex(palette[selectedRow][selectedColumn])}} />
        </div>
        {palette.map((row, rowIndex) => (
            <div key={rowIndex} className={style.row}>
                {row.map((color, columnIndex) => (
                    <div
                        key={toHex(color)}
                        className={classnames(style.cell, {[style.focus]: selectedColumn === columnIndex && selectedRow === rowIndex})}
                        style={{backgroundColor: toHex(color)}}
                        onMouseOver={() => handleSelectionChange(rowIndex, columnIndex)}
                        onClick={handleClick}
                    />
                ))}
            </div>
        ))}
    </div>
);

export default ColorPicker;
