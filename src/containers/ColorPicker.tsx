import React, {FC, useCallback, useState} from 'react';

import {ColorPicker as ColorPickerComponent} from '~components';
import {APPLY, CANCEL, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP} from '~shortcuts';
import {Color} from '~types';
import {isEqual} from '~utils/color';
import {aperture} from '~utils/func';
import palette from '~utils/palette';

import ModalContainer from './ModalContainer';

const increment = (max: number) => (value: number): number => value < max - 1 ? value + 1 : 0;
const decrement = (max: number) => (value: number): number => value > 0 ? value - 1 : max - 1;

type ColorPickerProps = {
    onColorChange: (color: Color) => void;
    onClose: () => void;
    color: Color;
}

const COLUMNS = 7;
const paletteMatrix = aperture(palette, COLUMNS);
const findColorIndex = (color: Color): number => palette.findIndex((other) => isEqual(color, other));
const getColumn = (color: Color): number => findColorIndex(color) % COLUMNS;
const getRow = (color: Color): number => Math.floor(findColorIndex(color) / COLUMNS);

const ColorPicker: FC<ColorPickerProps> = ({color, onColorChange, onClose}) => {
    const [selectedColumn, setSelectedColumn] = useState(() => getColumn(color));
    const [selectedRow, setSelectedRow] = useState(() => getRow(color));
    const handleSelectionChange = useCallback((row: number, column: number): void => {
        setSelectedRow(row);
        setSelectedColumn(column);
    }, [setSelectedColumn, setSelectedRow]);
    const updateSelectedRow = (operation: (row: number) => number): void => {
        let newRow = selectedRow;
        do {
            newRow = operation(newRow);
        } while (paletteMatrix[newRow].length <= selectedColumn);
        setSelectedRow(newRow);
    };
    const updateSelectedColumn = (operation: (column: number) => number): void => setSelectedColumn(operation);
    const setColor = (): void => onColorChange(paletteMatrix[selectedRow][selectedColumn]);

    return (
        <ModalContainer
            onOutsideClick={onClose}
            keyHandlers={{
                [MOVE_UP]: () => updateSelectedRow(decrement(paletteMatrix.length)),
                [MOVE_DOWN]: () => updateSelectedRow(increment(paletteMatrix.length)),
                [MOVE_LEFT]: () => updateSelectedColumn(decrement(paletteMatrix[selectedRow].length)),
                [MOVE_RIGHT]: () => updateSelectedColumn(increment(paletteMatrix[selectedRow].length)),
                [APPLY]: setColor,
                [CANCEL]: onClose,
            }}
        >
            <ColorPickerComponent
                palette={paletteMatrix}
                selectedRow={selectedRow}
                selectedColumn={selectedColumn}
                handleSelectionChange={handleSelectionChange}
                handleClick={setColor}
            />
        </ModalContainer>
    )
};

export default ColorPicker;
