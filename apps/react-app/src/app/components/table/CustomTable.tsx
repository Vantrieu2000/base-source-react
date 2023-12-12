import { Empty, Table, TableProps } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface CustomTableProps<T> extends TableProps<T> {
  total: number;
  pageSize?: number;
  onChangePagination?: (page: number, pageSize: number) => void;
  page?: number;
}

const CustomTable = <T extends object>(props: CustomTableProps<T>) => {
  const {
    dataSource,
    total,
    pageSize,
    columns,
    onChangePagination,
    page,
    ...restProps
  } = props;
  const intl = useIntl();

  return (
    <Table<T>
      dataSource={dataSource}
      columns={columns}
      pagination={{
        onChange: (page, pageSize) => {
          if (onChangePagination) {
            onChangePagination(page, pageSize);
          }
        },
        total: total,
        pageSize: pageSize || 10,
        showSizeChanger: true,
        showQuickJumper: true,
        responsive: true,
        position: ['bottomCenter'],
        locale: {
          items_per_page: intl.formatMessage({ id: 'system.page' }),
          jump_to: intl.formatMessage({ id: 'system.jump-to' }),
          page: undefined,
        },
        current: page ? page : 1
      }}
      locale={{
        emptyText: (
          <Empty
            description={intl.formatMessage({
              id: 'system.emptyText',
            })}
          />
        ),
      }}
      bordered
      {...restProps}
    />
  );
};

export default CustomTable;
