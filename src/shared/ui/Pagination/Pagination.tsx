import React, { useState } from 'react';
import styles from './pagination.module.css';
import { Select } from './../Select/Select';

interface IPaginationProps {
    total: number;
    itemsPerPage?: number;
    defaultCurrent?: number;
    onChange?: (selected: number) => void;
}

export const Pagination = ({
   total,
   defaultCurrent = 1,
   onChange,
   ...props
}: IPaginationProps) => {
    const [activePage, setActivePage] = useState(defaultCurrent);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const pagesCount = Math.ceil(total / itemsPerPage);

    // Need fix
    const interFont = {
        fontFamily: 'Inter, sans-serif'
    };

    const handleSetActivePage = (page: React.SetStateAction<number>) => {
        if(page === activePage) return;
        setActivePage(page);
    }

    const PaginationPages = () => {
        const elements = [];
        for(let i = 0; i <= pagesCount + 1; i++) {
            let title: number | string = i;
            let onChangeFunc = () => {
                handleSetActivePage(i)
            }

            if(i == 0) {
                title = '<';
                onChangeFunc = () => {
                    const newPage = activePage < 2 ? 1 : activePage - 1;
                    handleSetActivePage(newPage)
                }
            }

            if(i > pagesCount) {
                title = '>';
                onChangeFunc = () => {
                    const newPage = activePage < pagesCount ? activePage + 1 : pagesCount;
                    handleSetActivePage(newPage)
                }
            }

            elements.push(
                <li
                    className={`${styles.pagination__item} ${activePage === i ? styles.pagination__items_active : ''}`}
                    onClick={onChangeFunc}
                    tabIndex={0}
                >
                    {title}
                </li>
            )
        }
        return <ul className={`${styles.pagination__items}`}>
            {elements}
        </ul>;
    }

    const PaginationItemsPerPage = () => {
        const itemsPerPageList = [10, 20, 30, 50, 100];
        const itemPerPageSelect = <Select
            defaultValue={parseInt(itemsPerPage)}
            onChange={(selectedValue: object) => {
                setItemsPerPage(selectedValue.value);
                setActivePage(1);
            }}
            options={
                itemsPerPageList.map(item => {
                    return { title: item, value: item };
                })
            }
        />
        return (
            <div className={`${styles.pagination__items_per_page}`}>
                Show {itemPerPageSelect} on page
            </div>
        )
    }

    return (
        <div style={interFont} className={`${styles.pagination}`}>
            <PaginationPages />
            <PaginationItemsPerPage />
        </div>
    );
}