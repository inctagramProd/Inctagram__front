import React, {useRef, useState, useEffect} from 'react';
import styles from './select.module.css';
import ArrowBottom from "@/src/shared/assets/icons/ArrowBottom";

interface ISelectProps {
    title?: string,
    disabled?: boolean,
    defaultValue?: string
    options: {
        title: string;
        value: string;
        icon?: React.ReactNode;
    }[];
    onChange?: (selectedValue: object) => void;
}

export const Select = ({
    title,
    options,
    defaultValue,
    disabled = false,
    onChange,
    ...props
}: ISelectProps) => {
    const [activeEl, setActiveEl] = useState({
        title: defaultValue ? options.find(option => option.value === defaultValue)?.title || '' : options[0].title,
        value: defaultValue ? options.find(option => option.value === defaultValue)?.value || '' : options[0].value,
    });
    const [isVisibleDropdown, setIsVisibleDropdown] = useState(false);

    // Close dropdown if click outside
    const wrapperRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    useEffect(() => {
        document.addEventListener("click", handleClickOutside, false);
        return (): void => {
            document.removeEventListener("click", handleClickOutside, false);
        };
    }, []);

    const handleClickOutside = (e: { target: any; }): void => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            setIsVisibleDropdown(false);
        }
    };

    const handleDropdownActiveEl = (): void => {
        if(isVisibleDropdown) {
            setIsVisibleDropdown(false);
        } else {
            setIsVisibleDropdown(true);
        }
    }

    const handleSetActiveEl = (e: { target: any; }): void => {
        const activeElTemp = {
            title: e.target.getAttribute('data-title'),
            value: e.target.getAttribute('data-value')
        };

        setActiveEl(activeElTemp);

        if (onChange) {
            onChange(activeElTemp);
        }
    }

    return (
        <div className={`${styles.select} ${disabled ? styles.disabled : ''}`}  {...props}>
            <span className={`${styles.select__title}`}>{title}</span>
            <div
                ref={wrapperRef}
                onClick={handleDropdownActiveEl}
                className={`${styles.select__active_el} ${isVisibleDropdown ? styles.select__active_el_selected : ''}`}
                tabIndex={0}
            >
                <span className={`${styles.select__dropdown_title}`}>{activeEl.title}</span>
                <div className={`${isVisibleDropdown ? styles.select__dropdown_arrow_active : ''} ${styles.select__dropdown_arrow}`}>
                    <ArrowBottom />
                </div>
            </div>

            <ul className={` ${styles.select__dropdown} ${isVisibleDropdown ? 'opacity-1 z-10 transform-gpu scale-y-1' : 'opacity-0 z-[-1] transform-gpu scale-y-0'} `}>
                {
                    options.map((item) => (
                        <li
                            data-value={item.value}
                            data-title={item.title}
                            aria-selected={activeEl.value == item.value}
                            role={'option'}
                            onClick={handleSetActiveEl}
                            className={`${styles.select__dropdown_item} ${activeEl.value == item.value ? styles.select__dropdown_item_selected : ''}`}
                            tabIndex={-1}
                        >
                            {item.icon && <span className={styles.select__dropdown_icon}>{item.icon}</span>}
                            {item.title}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}