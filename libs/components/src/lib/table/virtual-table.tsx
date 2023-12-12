/* eslint-disable @typescript-eslint/ban-types */
import { Table } from 'antd';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { VariableSizeGrid as Grid } from 'react-window';
import './virtual-table.scss';

export const VirtualTable = (props: Parameters<typeof Table>[0]) => {
  const { columns, scroll } = props;
  const rowClassName = props.rowClassName as Function;
  const [tableWidth, setTableWidth] = useState(0);
  const intl = useIntl();

  const widthColumnCount = columns?.filter(({ width }) => !width)
    .length as number;
  const mergedColumns: any = columns?.map((column) => {
    if (column.width) {
      return column;
    }

    return {
      ...column,
      width: Math.floor(tableWidth / widthColumnCount),
    };
  }) as any[];

  const gridRef = useRef<any>();
  const [connectObject] = useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => null,
      set: (scrollLeft: number) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      },
    });

    return obj;
  });

  const resetVirtualGrid = () => {
    gridRef?.current?.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    });
  };

  useEffect(() => resetVirtualGrid, [tableWidth]);

  const renderVirtualList = (
    rawData: any[],
    { scrollbarSize, ref, onScroll }: any
  ) => {
    ref.current = connectObject;
    const totalHeight = rawData.length * 45;

    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={(index: number) => {
          const { width } = mergedColumns[index];
          return totalHeight > (scroll!.y! as number) &&
            index === mergedColumns.length - 1
            ? (width as number) - scrollbarSize - 1
            : (width as number);
        }}
        height={scroll!.y as number}
        rowCount={rawData.length}
        rowHeight={() => 55}
        width={tableWidth}
        onScroll={({ scrollLeft }: { scrollLeft: number }) => {
          onScroll({ scrollLeft });
        }}
      >
        {({
          columnIndex,
          rowIndex,
          style,
          ...rest
        }: {
          columnIndex: number;
          rowIndex: number;
          style: React.CSSProperties;
        }) => (
          <div
            className={classNames(
              'virtual-table-cell',
              rowClassName && rowClassName(rawData[rowIndex], rowIndex),
              {
                'virtual-table-cell-last':
                  columnIndex === mergedColumns.length - 1,
              }
            )}
            style={{
              ...style,
              overflow: 'hidden',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {mergedColumns[columnIndex].render
              ? mergedColumns[columnIndex].render(
                  rawData[rowIndex][mergedColumns[columnIndex].dataIndex],
                  rawData[rowIndex]
                )
              : rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
          </div>
        )}
      </Grid>
    );
  };

  return (
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width);
      }}
    >
      <Table
        bordered
        {...props}
        className="virtual-table"
        columns={mergedColumns}
        pagination={false}
        components={{
          body: renderVirtualList as any,
        }}
        locale={{
          emptyText: intl.formatMessage({ id: 'table.empty' }),
        }}
      />
    </ResizeObserver>
  );
};
