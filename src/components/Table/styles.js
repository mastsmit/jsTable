import { css } from 'emotion';
import { theme } from '../../consts/themeColors';

export const rootTable = (mode) => css`
.ant-table-thead > tr > th{
    padding: 0px;
}
    .ant-table-thead{
        .ant-table-cell{
            :hover{
                background-color:grey;
            }
        }
    
    }
    
    .ant-table-tbody{
        .ant-table-cell{
            ${mode === 'dark' ?
        css`
        background-color:${theme.color.dark.cellColor};
        color:${theme.color.dark.cellTextColor};
        `
        :
        css`background-color:${theme.color.light.cellColor};
        color:${theme.color.light.cellTextColor};
        `
    }
        }
    }
`;