import { IssueList } from '@/components/issueList';
import React from 'react';
import data from '@/service/data';
import { Col, Row } from 'antd';
import { ListFilter } from '@/components/listFilter';
import { CloseConfirmModal } from '@/components/closeConfirmModal';
import { IssueEditorModal } from '@/components/issueEditorModal';

const App: React.FC = async () => {
  const save = await data.getIssues();
  return (
    <>
      <CloseConfirmModal />
      <IssueEditorModal />
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <ListFilter />
        </Col>
        <Col span={24}>
          <IssueList save={save} />
        </Col>
      </Row>
    </>
  );
};

export default App;