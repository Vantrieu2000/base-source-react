import { SearchOutlined } from '@ant-design/icons';
import { Form, Modal } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { injectIntl, useIntl, WrappedComponentProps } from 'react-intl';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CustomButton from '../../components/button/SubmitButton';
import CustomInput from '../../components/input/CustomInput';
import CustomSelect from '../../components/select/CustomSelect';
import { RowActions } from '../../components/table-row/RowAction';
import CustomTable from '../../components/table/CustomTable';
import { api, ResponseError } from '../../utils/api';
import {
  CustomHandleError,
  CustomHandleSuccess,
} from '../../utils/api/responseHandler';
import { DATE_TIME_STRING_FORMAT } from '../../utils/constants';
import {
  ACCESS_LEVEL,
  STAFF_STATUS,
} from '../../utils/constants/ConstantValue';
import { CreateStaffDto, EditStaffDto } from '../../utils/dto/staff.dto';
import { addKey } from '../../utils/functions/common';
import { ValidateLibrary } from '../../utils/validate';

export const StaffRegistration = (props: WrappedComponentProps) => {
  const intl = useIntl();
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState<boolean>();
  const [showModalEdit, setShowModalEdit] = useState<boolean>();
  const store_id = localStorage.getItem('store_id')!;
  const staff_id = localStorage.getItem('staff_id')!;
  const [userId, setUserId] = useState<string>('');
  const [currentStaffId, setCurrentStaffId] = useState<string>('');
  const [filter, setFilter] = useState({
    storeId: store_id,
    search: '',
    limit: 10,
  });

  const getDataId = staff_id ? staff_id : store_id;

  const { data: storePermission } = useQuery(
    ['store-infomation', getDataId],
    () => api.Store.getDetailStore(getDataId!),
    {
      enabled: !!getDataId,
    }
  );

  //API get list staff
  const { data: ListStaff, status } = useQuery(
    ['staff-list', filter],
    () => api.Staff.getListStaff(filter),
    {
      select(data) {
        return data.map(addKey);
      },
      refetchOnWindowFocus: false,
      enabled: !!store_id,
    }
  );

  //API detail staff
  const { data: DetailStaff, status: StatusDetailStaff } = useQuery(
    ['staff-detail', currentStaffId],
    () => api.Staff.getDetailStaff(currentStaffId),
    {
      onSuccess(response) {
        editForm.setFieldsValue({ ...response.data });
      },
      onError: (error: ResponseError) => {
        CustomHandleError(error, intl);
      },
      refetchOnWindowFocus: false,
      enabled: !!currentStaffId,
    }
  );

  //API search staff
  const { data: Staff, status: StatusSearchStaff } = useQuery(
    ['category-list', userId],
    () => api.Staff.searchStaff(userId),
    {
      onSuccess(data) {
        createForm.setFieldsValue({ email: data.data.email });
      },
      onError: (error: ResponseError) => {
        CustomHandleError(error, intl);
      },
      refetchOnWindowFocus: false,
      enabled: !!userId,
    }
  );

  //API create staff createStaff
  const { mutate: CreateStaff, status: statusCreateStaff } = useMutation(
    api.Staff.createStaff,
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          CustomHandleSuccess(data.status, intl);
          queryClient.invalidateQueries(['staff-list', filter]);
          handleCancel();
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

  //API Update staff
  const { mutate: UpdateStaff, status: statusUpdateStaff } = useMutation(
    api.Staff.editStaff,
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          CustomHandleSuccess(data.status, intl);
          queryClient.invalidateQueries(['staff-list', filter]);
          handleCancelEdit();
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

  //API delete staff
  const { mutate: DeleteStaff, status: statusDeleteStaff } = useMutation(
    api.Staff.deleteStaff,
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          CustomHandleSuccess(data.status, intl);
          queryClient.invalidateQueries(['staff-list', filter]);
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Registration Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, record) => (
        <>{dayjs(record.createdAt).format(DATE_TIME_STRING_FORMAT)}</>
      ),
    },
    {
      title: 'Last Access Date',
      dataIndex: 'lastAccessDate',
      key: 'lastAccessDate',
      render: (_, record) => (
        <>{dayjs(record.createdAt).format(DATE_TIME_STRING_FORMAT)}</>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: intl.formatMessage({ id: 'system.action' }),
      key: 'action',
      render: (_, record, index) => {
        return (
          <RowActions
            menuItems={
              storePermission?.position.toLowerCase() === 'owner' ||
              storePermission?.position.toLowerCase() === 'admin'
                ? [
                    {
                      text: intl.formatMessage({ id: 'system.edit' }),
                      type: 'action',
                      action: () => {
                        setShowModalEdit(true);
                        setCurrentStaffId(record._id);
                      },
                    },
                    {
                      text: intl.formatMessage({ id: 'system.delete' }),
                      type: 'action',
                      action: () => {
                        confirmDeleteStaff(record);
                      },
                    },
                  ]
                : [
                    {
                      text: intl.formatMessage({ id: 'system.edit' }),
                      type: 'action',
                      action: () => {
                        setShowModalEdit(true);
                        setCurrentStaffId(record._id);
                      },
                    },
                  ]
            }
          />
        );
      },
    },
  ];

  //confirm delete staff
  const confirmDeleteStaff = (record) => {
    Modal.confirm({
      title: intl.formatMessage({ id: 'modal.confirm.delete-staff.title' }),
      content: intl.formatMessage({ id: 'modal.confirm.delete-staff.content' }),
      okText: intl.formatMessage({ id: 'system.delete' }),
      cancelText: intl.formatMessage({ id: 'system.cancel' }),
      okType: 'danger',
      okButtonProps: {
        className: 'ant-btn-primary',
      },
      onCancel: () => {},
      onOk: () => {
        DeleteStaff({ id: record._id, email: record.email, storeId: store_id });
      },
    });
  };

  //handel click add staff
  const handleClickAdd = () => {
    setShowModal(true);
  };

  //handel click close modal
  const handleCancel = () => {
    setShowModal(false);
    setUserId('');
    createForm.resetFields();
  };

  const handleCancelEdit = () => {
    setShowModalEdit(false);
    editForm.resetFields();
    setCurrentStaffId('');
  };

  //handel search staff
  const searchStaff = () => {
    const idUser = createForm.getFieldValue('id');

    if (!idUser) {
      createForm.setFields([
        {
          name: 'id',
          errors: ['Please enter user ID'],
        },
      ]);
    } else {
      setUserId(idUser);
    }
  };

  const onFinishCreateStaff = (value: CreateStaffDto) => {
    // if (staffId) {
    //   CreateStaff({ ...value, storeId: staffId });
    // } else {
    CreateStaff({ ...value, storeId: store_id });
    // }
  };

  const onFinishUpdateStaff = (value: EditStaffDto) => {
    UpdateStaff({
      ...value,
      staffId: currentStaffId,
      storeIdOwner: store_id,
    });
  };

  return (
    <div className="staff-registration" id="staff-registration">
      <div className="staff-registration__container">
        <div className="staff-registration__container__title">
          {intl.formatMessage({ id: 'pages.staff-registration.title' })}
        </div>
        <div className="staff-registration__container__content">
          <Form>
            <div className="staff-registration__container__content__form__add">
              <CustomButton type="primary" onClick={handleClickAdd}>
                {intl.formatMessage({ id: 'system.add' })}
              </CustomButton>
            </div>
            <div className="staff-registration__container__content__form__table">
              <CustomTable
                columns={columns}
                dataSource={ListStaff}
                bordered
                total={0}
              ></CustomTable>
            </div>
          </Form>
        </div>
      </div>
      <Modal
        visible={showModal}
        onCancel={handleCancel}
        title={intl.formatMessage({ id: 'modal.create-staff.title' })}
        footer={null}
      >
        <div className="modal--register-staff">
          <Form
            className="d-flex"
            form={createForm}
            onFinish={onFinishCreateStaff}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 15 }}
          >
            <div className="content w-100 d-flex ">
              <div className=" w-80">
                <Form.Item
                  label={intl.formatMessage({ id: 'system.id' })}
                  name="id"
                  rules={ValidateLibrary(intl).name}
                >
                  <CustomInput />
                </Form.Item>
                <Form.Item
                  label={intl.formatMessage({ id: 'system.email' })}
                  name="email"
                  rules={ValidateLibrary(intl).email}
                >
                  <CustomInput disabled />
                </Form.Item>
                <Form.Item
                  label={intl.formatMessage({ id: 'system.name' })}
                  name="name"
                  rules={ValidateLibrary(intl).required}
                >
                  <CustomInput />
                </Form.Item>
                <Form.Item
                  label={intl.formatMessage({
                    id: 'modal.register-staff.form.access',
                  })}
                  name="level"
                  rules={ValidateLibrary(intl).required}
                >
                  <CustomSelect
                    options={ACCESS_LEVEL.map((role) => ({
                      label: role.label,
                      value: role.value,
                    }))}
                  />
                </Form.Item>
                <Form.Item
                  label={intl.formatMessage({ id: 'system.status' })}
                  name="status"
                  rules={ValidateLibrary(intl).required}
                >
                  <CustomSelect
                    options={STAFF_STATUS.map((status) => ({
                      label: status.label,
                      value: status.value,
                    }))}
                  />
                </Form.Item>
              </div>
              <div className="search w-20">
                <CustomButton
                  className="w-100"
                  type="primary"
                  icon={<SearchOutlined />}
                  loading={StatusSearchStaff === 'loading'}
                  onClick={searchStaff}
                />
              </div>
            </div>
            <div className="footer d-flex justify-center gap-4">
              <CustomButton onClick={handleCancel}>
                {intl.formatMessage({ id: 'system.cancel' })}
              </CustomButton>
              <CustomButton type="primary" onClick={createForm.submit}>
                {intl.formatMessage({ id: 'system.save' })}
              </CustomButton>
            </div>
          </Form>
        </div>
      </Modal>

      <Modal
        visible={showModalEdit}
        onCancel={handleCancelEdit}
        title={intl.formatMessage({ id: 'modal.edit-staff.title' })}
        footer={null}
      >
        <div className="modal--register-staff">
          <Form
            className="d-flex"
            form={editForm}
            onFinish={onFinishUpdateStaff}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 15 }}
          >
            <div className="content w-100 d-flex ">
              <div className=" w-80">
                <Form.Item
                  label={intl.formatMessage({ id: 'system.id' })}
                  name="id"
                  rules={ValidateLibrary(intl).name}
                >
                  <CustomInput disabled />
                </Form.Item>
                <Form.Item
                  label={intl.formatMessage({ id: 'system.email' })}
                  name="email"
                  rules={ValidateLibrary(intl).email}
                >
                  <CustomInput disabled />
                </Form.Item>
                <Form.Item
                  label={intl.formatMessage({ id: 'system.name' })}
                  name="name"
                  rules={ValidateLibrary(intl).required}
                >
                  <CustomInput />
                </Form.Item>
                <Form.Item
                  label={intl.formatMessage({
                    id: 'modal.register-staff.form.access',
                  })}
                  name="level"
                  rules={ValidateLibrary(intl).required}
                >
                  <CustomSelect
                    options={ACCESS_LEVEL.map((role) => ({
                      label: role.label,
                      value: role.value,
                    }))}
                  />
                </Form.Item>
                <Form.Item
                  label={intl.formatMessage({ id: 'system.status' })}
                  name="status"
                  rules={ValidateLibrary(intl).required}
                >
                  <CustomSelect
                    options={STAFF_STATUS.map((status) => ({
                      label: status.label,
                      value: status.value,
                    }))}
                  />
                </Form.Item>
              </div>
              <div className="search w-20">
                <CustomButton
                  className="w-100"
                  type="primary"
                  icon={<SearchOutlined />}
                  loading={StatusSearchStaff === 'loading'}
                  onClick={searchStaff}
                />
              </div>
            </div>
            <div className="footer d-flex justify-center gap-4">
              <CustomButton onClick={handleCancelEdit}>
                {intl.formatMessage({ id: 'system.cancel' })}
              </CustomButton>
              <CustomButton type="primary" onClick={editForm.submit}>
                {intl.formatMessage({ id: 'system.save' })}
              </CustomButton>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default injectIntl(StaffRegistration);
