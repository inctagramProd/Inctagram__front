import React, {useEffect, useRef, useState} from 'react';
import styles from './tabs.module.css';
import unevaluated from "ajv/lib/vocabularies/unevaluated";

interface IOptionProps {
    key: string;
    label: string;
    disabled?: boolean;
}

interface ITabProps {
    options: IOptionProps[];
    disabled?: boolean;
    defaultActiveKey?: string;
    onChange?: (value: string) => void;
}

export const Tabs = ({
     options,
     defaultActiveKey,
     disabled = false,
     onChange,
     ...props
}: ITabProps) => {
    const [activeTab, setActiveTab] = useState<string | undefined>(defaultActiveKey);

    const tabsBlockRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const sliderRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

    const handleTabClick = (e: { target: any }): void => {
        const activeTabKey = e.target.getAttribute('data-key'),
              activeTabIndex = e.target.getAttribute('data-index'),
              tabDisabled = e.target.getAttribute('data-disabled');

        if (tabDisabled) return;
        if (onChange) onChange(activeTabKey);

        setActiveTab(activeTabKey);
        changeTabSliderPosition(activeTabIndex);
    };

    const changeTabSliderPosition = (position: string): void => {
        if (!sliderRef.current) return;
        sliderRef.current.style.transform = `translateX(${100 * parseInt(position)}%)`;
    };

    useEffect((): void => {
        if(disabled) return;
        let defaultTabKey: string | undefined = defaultActiveKey;

        // If default option is disabled or not provided set first options item
        if (!defaultTabKey || options.find((option: IOptionProps) => option.key === defaultTabKey)?.disabled) {
            defaultTabKey = options[0].key;
        }

        const defaultTabElement: Element | null | undefined = tabsBlockRef.current?.querySelector(`[data-key="${defaultTabKey}"]`);

        // Set slider width based on item count
        if (sliderRef.current) {
            sliderRef.current.style.width = `${100 / options.length}%`;
        }

        if (defaultTabElement) {
            const activeTabIndex: string | undefined | null = defaultTabElement.getAttribute('data-index');
            if (!activeTabIndex) return;

            setActiveTab(defaultTabKey);
            changeTabSliderPosition(activeTabIndex);
        }
    }, [defaultActiveKey, options]);

    // Need fix
    const interFont = {
        fontFamily: 'Inter, sans-serif'
    };

    return (
        <div style={interFont} className={`${styles.tabs} ${disabled ? styles.tabs_disabled : ''}`} ref={tabsBlockRef} {...props}>
            <div className={`${styles.tabs_wrapper}`}>
                {
                    options.map((item: IOptionProps, key: number) => {
                        return <div
                                role={"tab"}
                                aria-selected={"true"}
                                tabIndex={0}
                                key={item.key}
                                data-index={key}
                                data-key={item.key}
                                data-disabled={`${item.disabled || disabled ? styles.tab_disabled : ''}`}
                                onClick={handleTabClick}
                                className={`${styles.tab} ${activeTab == item.key && !disabled ? styles.tab_active : ''} ${item.disabled || disabled ? styles.tab_disabled : ''}`}
                            >
                                {item.label}
                        </div>
                    })
                }
            </div>
            <div ref={sliderRef} className={`${styles.tabs_slider}`}></div>
        </div>
    )
}