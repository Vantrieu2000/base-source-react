import { Editor } from '@tinymce/tinymce-react';
import { FormInstance } from 'antd';
// @ts-ignore
import './style.scss';

interface Props {
  editorRef: any;
  form: FormInstance;
  formFieldS: any;
  forceUpdate?: any;
  height?: number;
  setEditorContent?: any;
  tab?: number;
}

export const EditorMCE = (props: Props) => {
  const {
    editorRef,
    form,
    formFieldS,
    forceUpdate,
    height,
    setEditorContent,
    tab,
  } = props;

  const uploadFunction = (blobInfo: any, progress: any) =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', `${process.env.NX_API_BASE_URL}/upload`);
      xhr.upload.onprogress = (e) => {
        progress((e.loaded / e.total) * 100);
      };

      xhr.onload = () => {
        if (xhr.status === 403) {
          reject({ message: 'HTTP Error: ' + xhr.status, remove: true });
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          reject('HTTP Error: ' + xhr.status);
          return;
        }

        const json = JSON.parse(xhr.responseText);

        if (!json) {
          reject('Invalid JSON: ' + xhr.responseText);
          return;
        }

        resolve(`${process.env.NX_API_BASE_URL}` + json.data.filename);
      };

      xhr.onerror = () => {
        reject(
          'Image upload failed due to a XHR Transport error. Code: ' +
            xhr.status
        );
      };

      const formData = new FormData();
      formData.append('image', blobInfo.blob());

      xhr.send(formData);
    });
  return (
    <Editor
      onInit={(evt: any, editor: any) => {
        editorRef.current = editor;
      }}
      onEditorChange={(newValue: any, editor: any) => {
        form.setFields([
          {
            name: formFieldS,
            value: newValue,
          },
        ]);
        forceUpdate({});
        setEditorContent((pre: any) => {
          if (!pre) {
            pre = [];
          }
          const checkIndex = pre.some((e: any) => e?.index === tab);

          if (checkIndex) {
            const preCopy = [...pre];
            for (let item of preCopy) {
              if (item.index === tab || 0) {
                item.content = newValue.trim();
                break;
              }
            }
            return preCopy;
          } else {
            return [...pre, { index: tab || 0, content: newValue.trim() }];
          }
        });
      }}
      value={form.getFieldValue(formFieldS)}
      apiKey={process.env.NX_REACT_APP_APIKEY_TINYMCE}
      init={{
        height: height || 500,
        menubar: true,
        automatic_uploads: true,
        images_upload_handler: uploadFunction as any,
        language: 'en',
        images_upload_credentials: true,
        plugins: [
          'image',
          'link',
          'table',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar: `undo redo| link code image table | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help`,
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
      }}
    />
  );
};
