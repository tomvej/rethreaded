import React, {FC, ReactNode} from 'react';

import style from './Form.scss';

type FormProps = {
    children: ReactNode;
    onSubmit: () => void;
}

const Form: FC<FormProps> = ({onSubmit, children}) => (
    <form
        onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
        }}
        className={style.main}
    >
        {children}
    </form>
);

export default Form;
