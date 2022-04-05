import React, { forwardRef } from 'react';
import { Select } from 'antd';
interface Props {
    config: object[];
    ref?: RefType;
    onChange?: (arg0: string, arg1: any) => void;
}

const SelectForm: React.FC<Props> = forwardRef((props, ref: RefType) => {
    const { config, onChange } = props;

    const getSelect = () =>
        config.map(item => (
            <Select
                {...item}
                style={{ width: '200px', marginLeft: '10px' }}
                onChange={onChange}
            ></Select>
        ));

    return <>{getSelect()}</>;
});

export default SelectForm;
