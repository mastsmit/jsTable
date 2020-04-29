import { css } from 'emotion';

export const rootTableHeader = css`
    display:flex;
    justify-content:flex-end;
    align-items:center;
    color:#37352f99;
    .table-header-search-button{
        color: white;
        display:flex;
        cursor:pointer;
        .search-icon{
            margin:0px 5px;
            display:flex;
            justify-content:center;
            flex-direction:column;
        }
        .search-input{
            .ant-input-affix-wrapper{
            background:none;
            border:none;
            padding:4px 0px ;
            }
        }
        :hover{
            background-color: #474c50;
            border-radius:2px;        
    }
}
    .table-header-filter-button{
        color: white;
        cursor:pointer;
        margin:0px 5px;
        padding: 3px;
        :hover{
            background-color: #474c50;
            border-radius:2px;
        }
    }
    .table-header-sort-button{
    .table-header-sort-button-text{
        color:white;
        cursor:pointer;
        margin:0px 5px;
        padding: 3px;
        :hover{
            background-color:#474c50;
            border-radius:2px;
        }
    }
}
`;

export const popOverstyle = css`
.ant-popover-inner-content {
    color: white;
}
.ant-popover-inner {
    background-color: #474c50 !important;
}
`;


export const singleFilterDiv = css`

 display: flex; 
 justify-content: space-between;
 align-items: center; 
 margin: 3px;

 
 .ant-select {
    margin-right: 10px !important;
   
 }
    .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    background-color: transparent !important;
    border: 1px solid grey !important;
    color: white;
   
  }
  .ant-input {
       background-color: #474c50 !important;
       border: 1px solid grey !important;

  }`;

  export const style1 = css`
        
  background-color: #3f4447 !important;
  .ant-select-item-option {
    background-color: transparent !important;
    color: white;
     :hover{
        background-color:#474c50 !important;

     }

  }
  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    color: white;
    background-color: #474c50 !important ;
}

  `;

export const singlesorterDiv = css`
display: flex; 
 justify-content: space-between;
 align-items: center; 
 margin: 3px;


 .ant-select {
    margin-right: 10px !important;
    
 }
    .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    background-color: transparent !important;
    border: 1px solid grey !important;
    color: white;
   
  }
  .ant-input {
       background-color: #474c50 !important;
       border: 1px solid grey !important;

  }`;