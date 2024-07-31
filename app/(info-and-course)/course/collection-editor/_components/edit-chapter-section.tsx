"use client";

import EmptySection from "@/components/empty-section";
import { useCourseStore } from "@/hooks/use-course-store";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import {
  FileAudio,
  FileCheck2Icon,
  FileImage,
  FileVideo,
  Link2,
  Upload,
} from "lucide-react";
import FilesSortableContext from "../../_components/files-sortable-context";
import TableFileRow from "./table-file-row";

const EditChapterSection = () => {
  const { collection } = useCourseStore();
  const { isOver, setNodeRef } = useDroppable({
    id: "edit-chapter-dropable",
  });

  const chapters = collection.chapters || [];
  const activeChapter = chapters.find((chapter) => chapter.isActive);

  const videos = activeChapter?.files.filter(
    (file) => file.contentType === "Video"
  );
  const audios = activeChapter?.files.filter(
    (file) => file.contentType === "Audio"
  );
  const documents = activeChapter?.files.filter(
    (file) => file.contentType === "Document"
  );
  const images = activeChapter?.files.filter(
    (file) => file.contentType === "Image"
  );
  const blogs = activeChapter?.files.filter(
    (file) => file.contentType === "Blog"
  );

  return (
    <div className="h-full p-4 w-full">
      {collection?.chapters?.length === 0 && (
        <div className="h-full flex items-center justify-center">
          <p className="text-slate-400 text-base font-semibold tracking-tight max-w-sm text-center">
            Add Collection Information, Book and Chapter Information to make
            this segment active.
          </p>
        </div>
      )}
      {activeChapter && (
        <div className="h-full flex flex-col w-full">
          <div className="flex items-center justify-between pointer-events-none select-none mb-6">
            <div className="flex flex-col shrink-0">
              <span className="text-sm font-semibold tracking-tight">
                <span className="text-slate-400 mr-1">Chapter:</span>
                <span className="text-slate-700">
                  {activeChapter.chapterName}
                </span>
              </span>
              <span className="text-xs font-semibold tracking-tight">
                <span className="text-slate-400 mr-1">Book:</span>
                <span className="text-slate-600">{activeChapter.bookName}</span>
              </span>
            </div>
            <span className="text-sm font-semibold tracking-tight text-slate-500 flex items-center gap-x-2">
              <Upload className="w-4 h-4" />
              Drag or Drop Files
            </span>
          </div>

          <div
            ref={setNodeRef}
            className={cn(
              "bg-white p-2 rounded-md h-full",
              isOver && "border-2 border-[var(--brand-color)]"
            )}
          >
            <FilesSortableContext>
              <table className="table-auto w-full">
                <thead>
                  <tr className="border-b">
                    <th></th>
                    <th align="left" className="text-slate-400 text-xs p-2">
                      Name
                    </th>
                    <th align="right" className="text-slate-400 text-xs p-2">
                      Type
                    </th>
                    <th align="right" className="text-slate-400 text-xs p-2">
                      Content
                    </th>

                    <th align="right" className="text-slate-400 text-xs p-2">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* videos */}
                  <tr className="bg-white border-b">
                    <td className="py-2" colSpan={5}>
                      <h2 className="text-sm font-bold flex items-center gap-x-2 text-[var(--brand-color)]">
                        <FileVideo className="h-4 w-4" />
                        Video
                      </h2>
                    </td>
                  </tr>
                  {videos &&
                    videos.map((file) => (
                      <TableFileRow
                        key={file.id}
                        file={file}
                        chapterId={activeChapter.id}
                      />
                    ))}

                  {videos?.length === 0 && (
                    <tr className="h-auto bg-white">
                      <td className="py-2" colSpan={5}>
                        <EmptySection
                          icon={
                            <FileVideo className="h-7 w-7 text-slate-400" />
                          }
                          emptyText="You don't have any videos yet."
                        />
                      </td>
                    </tr>
                  )}

                  {/* audios */}
                  <tr className="border-b h-auto bg-white">
                    <td className="py-2" colSpan={5}>
                      <h2 className="text-sm font-bold flex items-center gap-x-2 text-[var(--brand-color)]">
                        <FileAudio className="h-4 w-4" />
                        Audio
                      </h2>
                    </td>
                  </tr>
                  {audios &&
                    audios.map((file) => (
                      <TableFileRow
                        key={file.id}
                        file={file}
                        chapterId={activeChapter.id}
                      />
                    ))}

                  {audios?.length === 0 && (
                    <tr className="h-auto bg-white">
                      <td className="py-2" colSpan={5}>
                        <EmptySection
                          icon={
                            <FileAudio className="h-7 w-7 text-slate-400" />
                          }
                          emptyText="You don't have any audios yet."
                        />
                      </td>
                    </tr>
                  )}

                  {/* Documents */}
                  <tr className={cn("border-b h-auto bg-white")}>
                    <td className="py-2" colSpan={5}>
                      <h2 className="text-sm font-bold flex items-center gap-x-2 text-[var(--brand-color)]">
                        <FileCheck2Icon className="h-4 w-4" />
                        Document
                      </h2>
                    </td>
                  </tr>
                  {documents &&
                    documents.map((file) => (
                      <TableFileRow
                        key={file.id}
                        file={file}
                        chapterId={activeChapter.id}
                      />
                    ))}
                  {documents?.length === 0 && (
                    <tr className="h-auto bg-white">
                      <td className="py-2" colSpan={5}>
                        <EmptySection
                          icon={
                            <FileCheck2Icon className="h-7 w-7 text-slate-400" />
                          }
                          emptyText="You don't have any documents yet."
                        />
                      </td>
                    </tr>
                  )}

                  {/* images */}
                  <tr className={cn("border-b h-auto bg-white")}>
                    <td className="py-2" colSpan={5}>
                      <h2 className="text-sm font-bold flex items-center gap-x-2 text-[var(--brand-color)]">
                        <FileImage className="h-4 w-4" />
                        Image
                      </h2>
                    </td>
                  </tr>
                  {images &&
                    images.map((file) => (
                      <TableFileRow
                        key={file.id}
                        file={file}
                        chapterId={activeChapter.id}
                      />
                    ))}

                  {images?.length === 0 && (
                    <tr className="h-auto bg-white">
                      <td className="py-2" colSpan={5}>
                        <EmptySection
                          icon={
                            <FileImage className="h-7 w-7 text-slate-400" />
                          }
                          emptyText="You don't have any images yet."
                        />
                      </td>
                    </tr>
                  )}

                  {/* blogs */}
                  <tr className={cn("border-b h-auto bg-white")}>
                    <td className="py-2" colSpan={5}>
                      <h2 className="text-sm font-bold flex items-center gap-x-2 text-[var(--brand-color)]">
                        <Link2 className="h-4 w-4" />
                        Blog
                      </h2>
                    </td>
                  </tr>
                  {blogs &&
                    blogs.map((file) => (
                      <TableFileRow
                        key={file.id}
                        file={file}
                        chapterId={activeChapter.id}
                      />
                    ))}

                  {blogs?.length === 0 && (
                    <tr className="h-auto bg-white">
                      <td className="py-2" colSpan={5}>
                        <EmptySection
                          icon={<Link2 className="h-7 w-7 text-slate-400" />}
                          emptyText="You don't have any blog url yet."
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </FilesSortableContext>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditChapterSection;
