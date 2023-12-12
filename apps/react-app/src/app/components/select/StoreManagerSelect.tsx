import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Divider, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from '@tanstack/react-query';
import { api, ResponseError } from '../../utils/api';
import { CustomHandleError } from '../../utils/api/responseHandler';
import { UserDto } from '../../utils/dto/users.dto';

const StoreManagerSelect = (props) => {
  const [managerOption, setManagerOption] = useState<UserDto[]>([]);
  const intl = useIntl();
  const filter = {
    storeId: props.storeId,
  };
  const {
    data: managerList,
    status,
    error,
  } = useQuery(
    ['list-branch-admin', filter],
    () => api.User.getListBranchAdmin(filter),
    {
      onError: (error: ResponseError) => {
        CustomHandleError(error, intl);
      },
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (status === 'success') {
      if (managerList.data.length) {
        let optionData: any = [];
        managerList.data.forEach((element) => {
          let item = {
            id: element?.id,
            email: element?.email,
            fullName: element?.fullName,
            value: element?.email,
            label: (
              <div onClick={() => selectManager(element)}>
                <div>{element?.fullName}</div>
                <div>{element?.email}</div>
              </div>
            ),
          };
          optionData.push(item);
        });
        setManagerOption(optionData);
      }
    }
  }, [status, managerList]);

  const selectManager = (data: any) => {
    props.selectManager(data);
  };

  const handleClickNew = () => {
    props.actionClick();
  };

  return (
    <>
      <Select
        suffixIcon={<SearchOutlined />}
        showSearch
        style={{ width: 442 }}
        placeholder={intl.formatMessage({
          id: 'pages.store.manager_of_store',
        })}
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.fullName ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={managerOption}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <Space style={{ padding: '0 8px 4px' }}>
              <Button type="text" onClick={handleClickNew}>
                <div className="manager_add_button">
                  <PlusOutlined />
                  {intl.formatMessage({
                    id: 'create-button',
                  })}
                </div>
              </Button>
            </Space>
          </>
        )}
      ></Select>
    </>
  );
};

export default StoreManagerSelect;
