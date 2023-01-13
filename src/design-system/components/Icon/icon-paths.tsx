import * as React from 'react';
import { IconNames } from './icons';

type IconPath = {
    width?: number;
    height?: number;
    path: React.ReactElement;
};

const svgPaths: Record<IconNames, IconPath> = {
    'arrow-up': {
        width: 20,
        height: 20,
        path: (
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.46747 1.48014L10.7991 1.48014M10.7991 1.48014L10.7991 8.29867M10.7991 1.48014L2.00115 9.66237" stroke="currentColor" strokeWidth="2.07917" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },

    hamburger: {
        width: 20,
        height: 20,
        path: (
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.61111 19H27.3889C28.275 19 29 18.2875 29 17.4167C29 16.5458 28.275 15.8333 27.3889 15.8333H1.61111C0.725 15.8333 0 16.5458 0 17.4167C0 18.2875 0.725 19 1.61111 19ZM1.61111 11.0833H27.3889C28.275 11.0833 29 10.3708 29 9.5C29 8.62917 28.275 7.91667 27.3889 7.91667H1.61111C0.725 7.91667 0 8.62917 0 9.5C0 10.3708 0.725 11.0833 1.61111 11.0833ZM0 1.58333C0 2.45417 0.725 3.16667 1.61111 3.16667H27.3889C28.275 3.16667 29 2.45417 29 1.58333C29 0.7125 28.275 0 27.3889 0H1.61111C0.725 0 0 0.7125 0 1.58333Z" fill="currentColor" />
            </svg>

        )
    },
    cube: {
        width: 20,
        height: 20,
        path: (
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.77919 13.6597C2.04547 12.975 1.05139 11.1502 1.05139 7.49992C1.05139 2.63215 2.81839 1.01031 8.12014 1.01031C13.4211 1.01031 15.1881 2.63215 15.1881 7.49992C15.1881 12.3662 13.4211 13.9896 8.12014 13.9896" stroke="#141830" strokeWidth="1.44" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

        )
    },
    download: {
        width: 20,
        height: 20,
        path: (
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 13V1M10 13L7 10M10 13L13 10M14.8333 7H15.6667C15.9762 7 16.131 7 16.2615 7.01142C17.7118 7.1383 18.8617 8.28819 18.9886 9.73853C19 9.86901 19 10.0238 19 10.3333V12.2C19 13.8802 19 14.7202 18.673 15.362C18.3854 15.9265 17.9265 16.3854 17.362 16.673C16.7202 17 15.8802 17 14.2 17H9M5.16667 7H4.33333C4.02379 7 3.86902 7 3.73853 7.01142C2.28819 7.1383 1.1383 8.28819 1.01142 9.73853C1 9.86901 1 10.0238 1 10.3333V12.2C1 13.8802 1 14.7202 1.32698 15.362C1.6146 15.9265 2.07354 16.3854 2.63803 16.673C3.27976 17 4.11984 17 5.8 17H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

        )
    }

};

export default svgPaths;
