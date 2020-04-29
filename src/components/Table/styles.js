import { css } from 'emotion';

export const rootTable = (colors) => css`
.ant-table-thead > tr > th{
    padding: 0px;
}
.ant-pagination,.ant-table-pagination,.ant-table-pagination-right{
float:none;
text-align:center;
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


export const dropDownStyles = css`
  width:200px !important;

  .ant-menu-item{
      background: #222933 !important;
      color: silver !important;
      margin: 0px;
      padding: 0px;
  }
  .ant-menu-vertical .ant-menu-item{
    margin-top: 0px;
    margin-bottom: 0px;
    :hover{
        background: blue !important;
    }
  }
`;