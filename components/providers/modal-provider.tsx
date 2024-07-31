"use client";

import CreateDriveFolder from "@/components/modals/create-drive-folder";
import { DriveFileViewer } from "@/components/modals/drive-file-viewer";
import DriveMoveModal from "@/components/modals/drive-move-modal";
import { DriveNameUpdateModal } from "@/components/modals/drive-name-update";
import DriveUploadModal from "@/components/modals/drive-upload-modal";
import { useModal } from "@/hooks/use-modal-store";
import { Fragment, useEffect, useState } from "react";
import AddExamContent from "../modals/add-exam-content";
import { CourseFileViewer } from "../modals/course-file-viewer";
import { CreateChannelModal } from "../modals/create-channel-modal";
import CreateExamFolder from "../modals/create-exam-folder";
import { DeleteMessageModal } from "../modals/delete-message-modal";
import { EditChannelModal } from "../modals/edit-channel-modal";
import { ExamFileViewer } from "../modals/exam-file-viewer";
import { ExamNameUpdateModal } from "../modals/exam-name-update";
import { ExamShareModal } from "../modals/exam-share-modal";
import { InviteChannelModal } from "../modals/invite-channel-modal";
import SaveToExamModal from "../modals/save-to-exam-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const modal = useModal();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !modal.isOpen) return null;
  return (
    <Fragment>
      <DriveMoveModal />
      <DriveNameUpdateModal />
      <CreateDriveFolder />
      <DriveUploadModal />
      <DriveFileViewer />
      <ExamNameUpdateModal />
      <ExamFileViewer />
      <CreateExamFolder />
      <ExamShareModal />
      <CourseFileViewer />
      <AddExamContent />
      <CreateChannelModal />
      <InviteChannelModal />
      <EditChannelModal />
      <DeleteMessageModal />
      <SaveToExamModal />
    </Fragment>
  );
};

export default ModalProvider;
