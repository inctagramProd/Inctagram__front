import React, { useState } from 'react';
import styles from './pagination.module.css';
import { Select } from './../Select/Select';

interface IPaginationProps {
    total: number;
    itemsPerPage?: number;
    defaultCurrent?: number;
    onChange?: (selected: number) => void;
}

const numberToArray = (n) => {
    return Array.from({length: n}, (_, i) => i + 1);
}

const transformToPagination = (arr, selected) => {
    if (arr.length < 7) {
        return arr;
    }

    let index = arr.indexOf(selected);
    let result = [];

    if (index <= 2) {
        result = arr.slice(0, 5).concat(['...'], arr.slice(-1));
    } else if (index >= arr.length - 3) {
        result = arr.slice(0, 1).concat(['...'], arr.slice(-6));
    } else {
        result = arr.slice(0, 1).concat(['...'], arr.slice(index - 1, index + 2), ['...'], arr.slice(-1));
    }

    return result;
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
    const pagesArray = transformToPagination(numberToArray(pagesCount), activePage);

    // Need fix
    const interFont = {
        fontFamily: 'Inter, sans-serif'
    };

    const handleSetActivePage = (page: React.SetStateAction<number>) => {
        if(page === activePage || !Number.isInteger(page)) return;
        setActivePage(page);
    }

    const PaginationPages = () => {
        const paginationElements: any = [];

        const handlePrevClick = () => {
            const newPage = Math.max(activePage - 1, 1);
            handleSetActivePage(newPage);
        };

        const handleNextClick = () => {
            const newPage = Math.min(activePage + 1, pagesCount);
            handleSetActivePage(newPage);
        };

        pagesArray.map((page: any, i: any) => {
            return paginationElements.push(
                <li
                    key={page}
                    className={`${styles.pagination__item} ${activePage === page ? styles.pagination__items_active : ''}`}
                    onClick={() => handleSetActivePage(page)}
                    tabIndex={0}
                >
                    {page}
                </li>
            );
        })

        return (
            <ul className={styles.pagination__items}>
                <li
                    className={`${styles.pagination__item} ${activePage === 1 ? styles.pagination__items_disabled : ''}`}
                    onClick={handlePrevClick}
                    tabIndex={0}
                >
                    {'<'}
                </li>
                {paginationElements}
                <li
                    className={`${styles.pagination__item} ${activePage === pagesCount ? styles.pagination__items_disabled : ''}`}
                    onClick={handleNextClick}
                    tabIndex={0}
                >
                    {'>'}
                </li>
            </ul>
        );
    };

    const PaginationItemsPerPage = () => {
        const itemsPerPageList = [10, 20, 30, 50, 100];
        const itemPerPageSelect = <Select
            defaultValue={parseInt(itemsPerPage)}
            variant={"Pagination"}
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