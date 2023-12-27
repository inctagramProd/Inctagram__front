import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import {format} from 'date-fns'; // Import the format function
import 'react-datepicker/dist/react-datepicker.css';
import s from './DatePicker.module.css';
import './style.css'
type PropsType = {
    isRange?: boolean;
    onChange?: (value: string) => void;
};

type CustomInputProps = {
    value: string;
    onClick: () => void;
};

const CustomInput: React.FC<CustomInputProps> = ({value, onClick}) => (
    <input
        className={`${s.customDateInput}`}
        value={value}
        onClick={onClick}
        readOnly
    />
);

export const UIDatePicker: React.FC<PropsType> = ({onChange, isRange}) => {
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;

    const formatDate = (date: Date | null): string => {
        return date ? format(date, 'dd/MM/yyyy') : '';
    };

    return (
        <DatePicker
            selectsRange={isRange}
            startDate={startDate}
            dateFormat="dd/MM/yyyy"
            endDate={endDate}
            calendarStartDay={1}
            selected={isRange ? null : startDate}
            onChange={(update) => {
                if (!Array.isArray(update)) {
                    setDateRange([update, update]);
                    if (onChange) {
                        onChange(formatDate(update));
                    }
                } else {
                    setDateRange(update);
                    if (onChange) {
                        onChange(`${formatDate(update[0])} - ${formatDate(update[1])}`);
                    }
                }
            }}
            isClearable={true}
            customInput={
            <CustomInput
                onClick={() => {}}
                value={isRange
                    ? `${formatDate(startDate)} - ${formatDate(endDate)}`
                    : `${formatDate(startDate)}`}
            />}
        />
    );
};
