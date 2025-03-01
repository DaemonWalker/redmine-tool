import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@/app/globals.css'
import { Affix, App, Button } from 'antd';
import '@ant-design/v5-patch-for-react-19';
import { InitStore } from '@/components/initStore';

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body style={{ padding: 24, height: "100vh", width: "100vw" }}>
      <AntdRegistry>
        <App>
          {children}
        </App>
      </AntdRegistry>
      <InitStore/>
    </body>
  </html>
);

export default RootLayout;