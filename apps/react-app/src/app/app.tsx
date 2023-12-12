import { App, ConfigProvider } from 'antd';
// import "antd/dist/antd.variable.min.css";
import ko_KR from 'antd/locale/ko_KR';
import { IntlProvider } from 'react-intl';
import JP from '../locales/en-US';
import { AppRoutes } from './AppRoutes';

const locale = navigator.language;

const disableSplashScreen = () => {
  const splashScreen = document.getElementById('splash-screen');
  if (splashScreen) {
    splashScreen.style.setProperty('display', 'none');
  }
};
export enum ColorPallete {
  PRIMARY = '#2262C6',
}

export const MainApp = () => {
  const language = 'ko';
  const messages: any = JP;

  // setLanguage({ locale: language, messages });

  const antdTheme = {
    token: {
      colorPrimary: ColorPallete.PRIMARY,
    },
  };

  disableSplashScreen();

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={language}
      messages={messages}
      onError={() => {}}
    >
      <ConfigProvider locale={ko_KR} componentSize={'large'} theme={antdTheme}>
        <App>
          <AppRoutes />
        </App>
      </ConfigProvider>
    </IntlProvider>
  );
};

export default MainApp;
