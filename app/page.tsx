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
      <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ListFilter />
        </div>
        <div style={{ overflow: "auto" }}>
          <IssueList save={save} />
        </div>
      </div>
    </>
  );
};

export default App;