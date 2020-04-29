import { css } from 'emotion';

export const rootTable = (colors) => css`
.ant-table.ant-table-bordered thead > tr > th{
    border-right: 1px solid grey !important;

}
.ant-table.ant-table-bordered tbody > tr > td{
    border-right: 1px solid grey !important;
}


.ant-table.ant-table-bordered .ant-table-container {
     border: none !important; 
    border-right: none !important; 
    border-bottom: none !important;
}
.ant-table tfoot > tr > th {
    background: ${colors.cellColor} !important;
     border-bottom: 1px solid ${colors.cellColor} !important; 
}
.ant-table table {
   
    .ant-table-thead > tr > th{
        border-bottom: 1px solid grey;
        border-top: 1px solid grey;
        :hover{
            background-color:#474c50 !important;
        }
    }
        .ant-table-thead{
            .ant-table-cell{
            padding: 4px 10px !important;
            background-color:${colors.cellColor};
            color:${colors.headerTextColor};
        }
    }

.ant-table-tbody > tr > td{
    border-bottom: 1px solid grey;
}
    .ant-table-tbody{
        .ant-table-cell{
        padding: 4px 10px !important;
        background-color:${colors.cellColor};
        color:${colors.cellTextColor};
     }
    }
}`;


export const dropDownStyles = (colors) => css`
  width:200px !important;
  
  .ant-menu-item{
    background-color: ${colors.popUpColor} !important;
      color: silver !important;
      margin: 0px;
      padding: 0px;
  }
  .ant-menu-vertical {
    border-right: none !important;
    
    .ant-menu-item{
    margin-top: 0px;
    margin-bottom: 0px;
    :hover{
        background: #474c50 !important;
    }
  }
}

`;