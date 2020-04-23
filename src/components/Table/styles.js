import { css } from 'emotion';

export const rootTable = css`
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