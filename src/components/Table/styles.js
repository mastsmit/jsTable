import { css } from 'emotion';

export const rootTable = (colors) => css`
.ant-table-thead > tr > th{
    padding: 0px;
}
    .ant-table-thead{
        .ant-table-cell{
            :hover{
                background-color:grey;
            }
        background-color:${colors.cellColor};
        color:${colors.cellTextColor};
    }
}
    
    .ant-table-tbody{
        .ant-table-cell{
        background-color:${colors.cellColor};
        color:${colors.cellTextColor};
     }
    }
`;