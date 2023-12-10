import { EditOutlined, HolderOutlined } from "@ant-design/icons";
import { Button, Checkbox } from "antd";
import Search from "antd/lib/input/Search";
import clsx from "clsx";
import { useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { injectIntl, useIntl, WrappedComponentProps } from "react-intl";
import { useQuery } from "react-query";
import * as XLSX from "xlsx";
import CustomSelect from "../../components/select/CustomSelect";
import { api } from "../../utils/api";
import { CUSTOM_EXCEL_FIELD_NAME } from "../../utils/constants/ConstantValue";
import AddToCategory from "./components/AddToCategory";

export const MenuSetting = (props: WrappedComponentProps) => {
  const intl = useIntl();
  const store_id = localStorage.getItem("store_id");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [page, setPage] = useState<"list" | "add">("list");
  const fileInputRef = useRef<any>(null);

  const { data, status } = useQuery(["category-list", store_id], () => api.Category.getListCategory(store_id!), {
    onSuccess(data) {
      if (data) {
        setSelectedCategory(data[0]._id);
      }
    },
    refetchOnWindowFocus: false,
  });

  const buttonStyle: React.CSSProperties = {
    flex: 1,
    borderRadius: 6,
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    // const items = reorder(
    //   listCategory,
    //   result.source.index,
    //   result.destination.index
    // );

    // setItems(items);
  };

  const convertDataToObjectArray = (data: any[][]) => {
    const headers = data[0];
    const result: any[] = [];

    for (let i = 1; i < data.length; i++) {
      const obj: any = {};
      const row = data[i];
      for (let j = 0; j < headers.length; j++) {
        const fieldName = CUSTOM_EXCEL_FIELD_NAME[headers[j]];
        let value = row[j];

        if (value && typeof value === "string" && value.includes(",")) {
          value = value.split(",").map((v: string) => v.trim());
        }

        obj[fieldName] = value;
      }
      result.push(obj);
    }

    return result;
  };

  const handleFile = (file /*:File*/) => {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e: any) => {
      const bstr = e.target.result;

      try {
      } catch (error) {
        console.error("Error reading file:", error);
      }
      const workbook = XLSX?.read(bstr, { type: rABS ? "binary" : "array" });

      const sheetname = workbook?.SheetNames[0];
      const sheet = workbook?.Sheets[sheetname];

      if (!sheet) {
        console.error("Sheet does not exist.");
        return;
      }

      const data = convertDataToObjectArray(XLSX.utils.sheet_to_json(sheet, { header: 1, blankrows: false }));

      console.log(data);

      // setDataExcel({ data: data, cols: make_cols(ws["!ref"]) });
    };

    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  const handleChangeCategory = (e) => {
    setSelectedCategory(e);
  };

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) handleFile(files[0]);
  };

  const handleNewFileSelection = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="menu-setting" id="menu-setting">
      {page === "list" ? (
        <div className="menu-setting__container">
          <div className="menu-setting__container__title">{intl.formatMessage({ id: "pages.menu-setting.title" })}</div>
          <div className="menu-setting__container__content row">
            <div className="col-xs-6 col-md-4 menu-setting__container__content__list">
              <div className="menu-setting__container__content__list__category">
                <div className="menu-setting__container__content__list__category__title">
                  {intl.formatMessage({
                    id: "pages.menu-setting.list.category",
                  })}
                </div>
                <div className="menu-setting__container__content__list__category__select">
                  <CustomSelect
                    options={data?.map((item) => ({
                      label: item.name,
                      value: item._id,
                    }))}
                    value={selectedCategory}
                    onChange={handleChangeCategory}
                  />
                </div>
              </div>
              <div className="menu-setting__container__content__list__upload">
                <div className="menu-setting__container__content__list__upload__title">
                  {intl.formatMessage({
                    id: "pages.menu-setting.list.upload.title",
                  })}
                </div>
                <div className="menu-setting__container__content__list__upload__des">
                  {intl.formatMessage({
                    id: "pages.menu-setting.list.upload.des",
                  })}
                </div>
                <div className="menu-setting__container__content__list__upload">
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="form-control"
                    id="file"
                    accept=".xls, .xlsx"
                    onClick={handleNewFileSelection}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-md-8 menu-setting__container__content__detail">
              <div className="menu-setting__container__content__detail__header">
                <div className="menu-setting__container__content__detail__header__title">
                  {intl.formatMessage({
                    id: "pages.menu-setting.content.header.title",
                  })}
                </div>
                <div className="menu-setting__container__content__detail__header__action">
                  <Button
                    style={buttonStyle}
                    type="primary"
                    onClick={() => {
                      setPage("add");
                    }}
                  >
                    {intl.formatMessage({
                      id: "system.add",
                    })}
                  </Button>
                  <Button style={buttonStyle} type="default">
                    {intl.formatMessage({
                      id: "system.copy",
                    })}
                  </Button>
                  <Button style={buttonStyle} type="default">
                    {intl.formatMessage({
                      id: "system.move",
                    })}
                  </Button>
                  <Button style={buttonStyle} type="primary" danger>
                    {intl.formatMessage({
                      id: "system.delete",
                    })}
                  </Button>
                </div>
              </div>
              <div className="menu-setting__container__content__detail__search">
                <Search placeholder="Search here" allowClear enterButton size="large" />
              </div>
              <div className="menu-setting__container__content__detail__content">
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="d-flex flex-column gap-2">
                        {[{ _id: "1" }, { _id: "2" }]?.map((item, index) => (
                          <Draggable key={item._id} draggableId={item._id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                className={clsx(`menu-setting__item`)}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                onClick={() => {}}
                              >
                                <div className="menu-setting__item__head">
                                  <div className="menu-setting__item__head__checkbox">
                                    <Checkbox />
                                  </div>
                                  <div className="menu-setting__item__head__drag" {...provided.dragHandleProps}>
                                    <HolderOutlined style={{ fontSize: "24px" }} />
                                  </div>
                                  <div className="menu-setting__item__head__image">
                                    <img
                                      src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                      alt=""
                                    />
                                  </div>
                                  <div className="menu-setting__item__head__name">Apple Pie</div>
                                </div>
                                <div className="menu-setting__item__tail">
                                  <div className="menu-setting__item__tail__price">20.000</div>
                                  <div className="menu-setting__item__tail__edit">
                                    <EditOutlined style={{ fontSize: "24px" }} />
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
                {/* <div className=" menu-setting__item">
                <div className="menu-setting__item__head">
                  <div className="menu-setting__item__head__checkbox">
                    <Checkbox />
                  </div>
                  <div className="menu-setting__item__head__drag">
                    <HolderOutlined style={{ fontSize: "24px" }} />
                  </div>
                  <div className="menu-setting__item__head__image">
                    <img
                      src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                    />
                  </div>
                  <div className="menu-setting__item__head__name">
                    Apple Pie
                  </div>
                </div>
                <div className="menu-setting__item__tail">
                  <div className="menu-setting__item__tail__price">20.000</div>
                  <div className="menu-setting__item__tail">
                    <MoreOutlined style={{ fontSize: "24px" }} />
                  </div>
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AddToCategory category={selectedCategory} setPage={setPage} />
      )}
    </div>
  );
};

export default injectIntl(MenuSetting);
