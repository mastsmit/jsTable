import { css } from 'emotion';

export const rootTable = (colors) => css`

.ant-table table {

    .ant-table-thead > tr > th{
        :hover{
            background-color:grey !important;
        }
    }
        .ant-table-thead{
            .ant-table-cell{
            padding: 4px 10px !important;
            background-color:${colors.cellColor};
            color:${colors.cellTextColor};
        }
    }

.ant-table-tbody > tr > td{
    :hover{
        background-color:grey !important;
    }
}
    .ant-table-tbody{
        .ant-table-cell{
        padding: 4px 10px !important;
        background-color:${colors.cellColor};
        color:${colors.cellTextColor};
     }
    }
}`;


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