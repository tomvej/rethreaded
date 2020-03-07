import React, {useCallback, useState} from 'react';

import {ColorPicker as ColorPickerComponent} from '~components';
import {MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP} from '~shortcuts';
import {fromHex} from '~utils/color';
import {aperture} from '~utils/func';
import palette from '~utils/palette';

import ModalContainer from './ModalContainer';

const increment = (max: number) => (value: number): number => value < max - 1 ? value + 1 : 0;
const decrement = (max: number) => (value: number): number => value > 0 ? value - 1 : max - 1;

const ColorPicker = () => {
    const paletteMatrix = aperture(palette, 7);
    const [selectedColumn, setSelectedColumn] = useState(0);
    const [selectedRow, setSelectedRow] = useState(0);
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

    return (
        <ModalContainer
            keyHandlers={{
                [MOVE_UP]: () => updateSelectedRow(decrement(paletteMatrix.length)),
                [MOVE_DOWN]: () => updateSelectedRow(increment(paletteMatrix.length)),
                [MOVE_LEFT]: () => updateSelectedColumn(decrement(paletteMatrix[selectedRow].length)),
                [MOVE_RIGHT]: () => updateSelectedColumn(increment(paletteMatrix[selectedRow].length)),
            }}
        >
            <ColorPickerComponent
                palette={paletteMatrix}
                originalColor={fromHex('#ffffff')}
                selectedRow={selectedRow}
                selectedColumn={selectedColumn}
                handleSelectionChange={handleSelectionChange}
                handleClick={() => {/* do nothing */
                }}
            />
        </ModalContainer>
    )
};

export default ColorPicker;
