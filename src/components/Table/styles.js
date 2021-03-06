import { css } from 'emotion';

export const rootTable = (colors) => css`
.ant-table.ant-table-bordered thead > tr > th{
    border-right: 1px solid ${colors.borderColor} !important;

}
.ant-table.ant-table-bordered tbody > tr > td{
    border-right: 1px solid ${colors.borderColor} !important;
}


.ant-table.ant-table-bordered .ant-table-container {
     border: none !important; 
    border-right: none !important; 
    border-bottom: none !important;
}
.ant-table tfoot > tr > th {
    background: ${colors.cellColor};
    border-bottom: 1px solid ${colors.borderColor} !important; 
}
.ant-table table {
   
    .ant-table-thead > tr > th{
        border-bottom: 1px solid ${colors.borderColor};
        border-top: 1px solid ${colors.borderColor};
        :hover{
        background-color:${colors.hoverColor}!important;
        }
    }
        .ant-table-thead{
            .ant-table-cell{
            padding: 4px 10px !important;
            background-color:${colors.cellColor};
            color:${colors.columnCellTextColor};
        }
    }

.ant-table-tbody > tr > td{
    border-bottom: 1px solid ${colors.borderColor};
}
.ant-table-tbody{
        .ant-table-cell{
        padding: 4px 10px !important;
        background-color:${colors.cellColor};
        color:${colors.cellTextColor};
     }
}
}
.ant-pagination,.ant-table-pagination,.ant-table-pagination-right{
float:none;
margin: 0px !important;
padding: 16px 0px ;
background-color: ${colors.hoverColor};
text-align:center;
}
/* .ant-pagination-prev.ant-pagination-disabled{
    background-color: ${colors.cellColor};
    color: ${colors.cellTextColor};
} */

.ant-table-pagination.ant-pagination {
    margin: 16px 0;
    float: none;
    text-align: center;
  }

  .ant-pagination-next,
  .ant-pagination-prev{
    a {
      background-color: ${colors.cellColor};
      border: none !important;
      color: ${colors.cellTextColor};
    }
    i {
      color: ${colors.cellTextColor};
    }
  }

  .ant-pagination-item {
    a {
      color: ${colors.cellTextColor};
    }
    background-color: ${colors.cellColor};
    border: none !important;
  }

  .ant-pagination-item-active {
    a {
      color: 'blue';
    }
    background-color: ${colors.borderColor};
    border-radius: 2px !important;
  }
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector{
      background-color: ${colors.cellColor};
      color : ${colors.cellTextColor};
      border: 1px solid ${colors.borderColor};
  }
  .ant-select-selector{

  }
  
`;


export const dropDownStyles = (colors) => css`
  width:200px !important;
  cursor: pointer;
  .ant-menu-item{
      font-size:15px;
      height: 35px;
      max-height:fit-content;
      display: flex;
      align-items: center;
    background-color: ${colors.popUpColor} !important;
      color: ${colors.cellTextColor} !important;
      margin: 0px;
      padding: 0px 0px 0px 8px;
  }
  .ant-menu-vertical {
    border-right: none !important;
    
    .ant-menu-item{
    margin-top: 0px;
    margin-bottom: 0px;
    :hover{
        background: ${colors.hoverColor} !important;
    }
  }
}

`;


export const lineClassName = () => css`
display: none !important;

`
