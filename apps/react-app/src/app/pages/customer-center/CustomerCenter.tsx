import { Button, Form, Modal } from 'antd';
import Search from 'antd/es/input/Search';
import dayjs from 'dayjs';
import { useState } from 'react';
import { injectIntl, useIntl, WrappedComponentProps } from 'react-intl';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CustomTable from '../../components/table/CustomTable';
import { api, ResponseError } from '../../utils/api';
import {
  CustomHandleError,
  CustomHandleSuccess,
} from '../../utils/api/responseHandler';
import { DATE_FORMAT_FOURTH } from '../../utils/constants';
import { CreateQuestion } from './components/CreateQuestionModal';
import ShowInformationModal from './components/ShowInformationModal';

interface DataType {
  key: string;
  _id: string;
  title: string;
  writer: number;
  date: string;
}

export const CustomerCenter = (props: WrappedComponentProps) => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalInfo, setShowModalInfo] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const store_id = localStorage.getItem('store_id')!;
  const [filter, setFilter] = useState({
    storeId: store_id,
    search: '',
    page: 1,
    limit: 10,
  });

  //Get list Question
  const { data: ListQuestion, status: getListQuestionStatus } = useQuery(
    ['question-list', filter],
    () => api.Customer.getListQuestion(filter),
    {
      enabled: !!store_id,
      select(data) {
        return {
          data: data?.data?.customer.map((item) => ({
            ...item,
            key: item?._id,
          })),
          total: data?.data?.customerTotal,
        };
      },
      refetchOnWindowFocus: false,
    }
  );

  //Get details Question
  const { data: Question, status: getQuestionStatus } = useQuery(
    ['detail-question', currentQuestion],
    () => api.Customer.getDetailQuestion(currentQuestion),
    {
      enabled: !!currentQuestion,
    }
  );

  //Delete Question
  const { mutate: DeleteQuestion, status: statusDeleteQuestion } = useMutation(
    api.Customer.deleteQuestion,
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          CustomHandleSuccess(data.status, intl);
          queryClient.invalidateQueries(['question-list']);
          setSelectedItems([]);
        } else {
          CustomHandleError(
            {
              statusCode: data.status,
              message: data.message,
              error: 'Error',
            },
            intl
          );
        }
      },
      onError: (error: ResponseError) => CustomHandleError(error, intl),
    }
  );

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => {
        return (
          <div
            className="pointer"
            onClick={() => {
              setCurrentQuestion(record?._id);
              setShowModalInfo(true);
            }}
          >
            {record?.title}
          </div>
        );
      },
    },

    {
      title: 'Writer',
      dataIndex: 'writer',
      key: 'writer',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (_, record) => (
        <>{dayjs(record.createdAt).format(DATE_FORMAT_FOURTH)}</>
      ),
    },
  ];

  const confirmDelete = () => {
    if (selectedItems?.length === 0) {
      Modal.warning({
        title: intl.formatMessage({
          id: 'modal.confirm.delete-question.warning',
        }),
        okText: intl.formatMessage({ id: 'system.ok' }),
        cancelText: intl.formatMessage({ id: 'system.cancel' }),
      });
    } else {
      Modal.confirm({
        title: intl.formatMessage({
          id: 'modal.confirm.delete-question.title',
        }),
        okText: intl.formatMessage({ id: 'system.ok' }),
        cancelText: intl.formatMessage({ id: 'system.cancel' }),
        onOk: () => {
          const dataSubmit = selectedItems.map((item) => ({
            storeId: store_id,
            id: item,
          }));
          DeleteQuestion(dataSubmit);
        },
      });
    }
  };

  const handleSearch = (value) => {
    setFilter((prev) => ({
      ...prev,
      search: value,
    }));
  };

  const onSelectChange = (key) => {
    setSelectedItems(key);
  };

  //handle change pagination table
  const handleTableChange = (page, pageSize) => {
    setFilter({ ...filter, page: page, limit: pageSize });
  };

  return (
    <div className="customer-center" id="customer-center">
      <CreateQuestion visible={showModal} setVisible={setShowModal} />
      <ShowInformationModal
        visible={showModalInfo}
        question={Question}
        setVisible={setShowModalInfo}
      />
      <div className="customer-center__container">
        <div className="customer-center__container__title">
          {intl.formatMessage({ id: 'pages.customer-center.title' })}
        </div>
        <div className="customer-center__container__content">
          <Form>
            <div className="customer-center__container__content__form__add ">
              <div className="search">
                <Search
                  placeholder="Search here"
                  allowClear
                  enterButton
                  size="large"
                  onSearch={handleSearch}
                />
              </div>
              <div className="d-flex gap-4 action">
                <Button type="primary" danger onClick={confirmDelete}>
                  {intl.formatMessage({ id: 'system.delete' })}
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  {intl.formatMessage({ id: 'system.register' })}
                </Button>
              </div>
            </div>

            <div className="customer-center__container__content__form__table">
              <CustomTable
                rowSelection={{
                  type: 'checkbox',
                  onChange: onSelectChange,
                  getCheckboxProps: (record: DataType) => ({
                    name: record._id,
                  }),
                }}
                columns={columns}
                dataSource={(ListQuestion as any)?.data}
                bordered
                page={filter.page}
                onChangePagination={handleTableChange}
                total={(ListQuestion as any)?.total}
              ></CustomTable>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(CustomerCenter);
