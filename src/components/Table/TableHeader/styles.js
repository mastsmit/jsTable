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
            background-color: grey;
            border-radius:2px;        
    }
}
    .table-header-filter-button{
        color: white;
        cursor:pointer;
        margin:0px 5px;
        padding: 3px;
        :hover{
            background-color: grey;
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
            background-color: grey;
            border-radius:2px;
        }
    }
}
`;