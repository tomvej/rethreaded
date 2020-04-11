import React, {FC} from 'react';

type FieldProps = {
    value: string;
    onChange: (value: string) => void;
    title: string;
}

const TextField: FC<FieldProps> = ({title, value, onChange}) => (
    <label>{title}: <input type="text" className="mousetrap" value={value} onChange={(event) => onChange(event.target.value)} /></label>
);

export default TextField;
