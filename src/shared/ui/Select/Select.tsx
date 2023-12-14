import React from 'react';

interface ISelectPropsData {
    title: number | string;
    value: number | string;
}
interface ISelectProps {
    state: 'Default' | 'Active',
    data: Array<ISelectPropsData>
}

export const Select = ({
    state: Active,
    data: data
}: ISelectProps) => {
    return (
        <select>
            {
                data.map(item => {
                    return <option value={item.value}>{item.title}</option>
                })
            }
        </select>
    )
}