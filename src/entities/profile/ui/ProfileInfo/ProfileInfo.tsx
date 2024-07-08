import React from 'react';

type Props = {
    userName?: string
    aboutMe?: string
}

export const ProfileInfo = ({aboutMe, userName}: Props) => {
    return (
        <div>
            <div>{aboutMe}</div>
            <div>{userName}</div>
        </div>
    );
};