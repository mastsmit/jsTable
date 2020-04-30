import { css } from 'emotion';

export const rootTableHeader = (colors, filterArrLength, sorterArrLength) =>
    css`
    display:flex;
    justify-content:flex-end;
    align-items:center;
    background-color: ${colors.cellColor};
    color:${colors.cellColor};
    .table-header-search-button{
        color: ${colors.columnCellTextColor};
        display:flex;
        .search-icon{
            margin:0px 5px;
            display:flex;
            justify-content:center;
            flex-direction:column;
        }
        .search-input{
            cursor:pointer;
            .ant-input-affix-wrapper{
            background:none;
            box-shadow: none !important;
            border:none;
            padding:4px 0px ;
            
            }
            .ant-input-affix-wrapper > input.ant-input{
                background: none;
                color: ${colors.cellTextColor};
                
            }

        }
        :hover{
            background-color:${colors.hoverColor};
            border-radius:2px;        
    }
}
    .table-header-filter-button,.table-header-sort-button{
        padding: 4px 8px;
        cursor:pointer;
        :hover{
            background-color: ${colors.hoverColor};
            border-radius:2px;
        }
        .table-header-filter-button-text{
            color: ${filterArrLength > 0 ? colors.cellTextColor : colors.columnCellTextColor};
        }
        .table-header-sort-button-text{
            color: ${sorterArrLength > 0 ? colors.cellTextColor : colors.columnCellTextColor};

        }
       
    }
`;


export const popOverstyle = (colors) => css`

.ant-popover-inner {
    background-color: ${colors.popUpColor} !important;

    .ant-popover-inner-content {
    color: ${colors.cellTextColor};
    padding: 7px 0px !important;

}
}
.ant-popover-arrow{
    border-color: ${colors.popUpColor} !important;
}
.ant-popover-placement-bottom{
    padding-top: 0px !important;
}
`;


export const headerDropdown = (colors) => css`

 display: flex; 
 align-items: center ;
 margin: 5px 0px;
 width:100%;
 user-select:none;
 box-sizing:border-box;
 .ant-select {
    margin-right: 10px !important;
   
 }
 .single-filter-wrapper,.single-sorter-wrapper{
    display: flex; 
    flex: 1 1 auto; 
    min-width: 0px; 
    margin: 0px 8px 0px 8px;
 }
 .drag-outlined-icon{
     display:flex;
     align-items: center;
     justify-content: center;
     margin-left: 10px;
 }
 .filter-column-options,.filter-options,.sorter-column-options{
     .ant-select-selector{
         min-width:120px;
     }
 }
    .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    background-color: transparent !important;
    border: 1px solid ${colors.borderColor} !important;
    color: ${colors.cellTextColor};

    :hover{
    background-color:${colors.hoverColor} !important ;

}

  }
  .ant-input {
      color: ${colors.cellTextColor};
       background-color:  ${colors.popUpColor} !important;
       border: 1px solid  ${colors.borderColor} !important;

  }`;

export const style1 = (colors) => css`
  background-color: ${colors.popUpColor} !important;

  .ant-select-item-option {
    background-color: transparent !important;
    color: ${colors.cellTextColor};
     :hover{
        background-color:${colors.hoverColor} !important;
     }
  }
  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    color: ${colors.cellTextColor};
    background-color:${colors.hoverColor} !important ;
 
}  


  `;

export const addButtonStyle = (colors) => css`

  display: flex;
  cursor: pointer;
  padding: 3px 8px;
    :hover{
        background-color:${colors.hoverColor} !important; 
    }
`;