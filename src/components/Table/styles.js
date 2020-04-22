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
    
.editable-cell {
  position: relative;
}

.editable-cell-value-wrap {
  padding: 5px 12px;
  cursor: pointer;
}

.editable-row:hover .editable-cell-value-wrap {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 4px 11px;
}

[data-theme='dark'] .editable-row:hover .editable-cell-value-wrap {
  border: 1px solid #434343;
}
`;