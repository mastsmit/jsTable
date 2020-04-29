import { css } from 'emotion';

export const tableSummary = (color) => css`
border: none !important;
cursor: pointer;
background: ${color.hoverColor} !important;
color:${color.cellTextColor} !important;
.main-div{
    display: flex;
}

.b:hover .a{
    display: block;
}
`;