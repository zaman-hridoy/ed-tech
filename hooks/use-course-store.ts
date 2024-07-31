import { BookType, ChapterType, CourseFileType } from "@/lib/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type CollectionDataType = {
  is_editing: boolean;
  is_active: boolean;
  collection_id: number | null;
  course_collection_type: string;
  collectionName: string;
  description: string;
  module_name: string;
  subject: {
    id: number;
    course_name: string;
  } | null;
  books: BookType[];
  chapters: ChapterType[];
};

interface CourseStore {
  collection: Partial<CollectionDataType>;
  updateCourseStore: (values: Partial<CollectionDataType>) => void;
  handleAddChapter: (chapter: ChapterType) => void;
  handleDeleteChapter: (id: string) => void;
  handleActiveChapter: (id: string) => void;
  handleAddFileToChapter: (file: CourseFileType) => void;
  handleRemoveFileFromChapter: (chapterId: string, fileId: string) => void;
  handleSortChapters: (chapters: ChapterType[]) => void;
  handleSortChapterFiles: (files: CourseFileType[]) => void;
  clearCourseStoredData: () => void;
}

const initialData: CollectionDataType = {
  is_editing: false,
  is_active: false,
  collection_id: null,
  course_collection_type: "",
  collectionName: "",
  description: "",
  module_name: "",
  subject: null,
  books: [],
  chapters: [],
};

export const useCourseStore = create<CourseStore>()(
  devtools(
    persist(
      (set) => ({
        collection: initialData,
        updateCourseStore: (values) =>
          set((prev) => ({ collection: { ...prev.collection, ...values } })),
        handleAddChapter: (newChapter) =>
          set((prev) => {
            const alreadyHas = prev.collection.chapters?.some(
              (chapter) =>
                chapter.id === newChapter.id &&
                chapter.bookId === newChapter.bookId
            );
            if (alreadyHas) {
              toast.error("Chapter already taken.");
              return prev;
            }
            toast.success("Chapter added.");
            return {
              collection: {
                ...prev.collection,
                chapters: prev.collection.chapters
                  ? [...prev.collection.chapters, newChapter]
                  : [],
              },
            };
          }),
        handleDeleteChapter: (id: string) =>
          set((prev) => {
            const chapters = prev.collection.chapters || [];

            const index = chapters?.findIndex(
              (chapter) => `${chapter.id}` === `${id}`
            );
            if (index !== -1) {
              chapters?.splice(index, 1);
            }
            return {
              collection: {
                ...prev.collection,
                chapters: chapters,
              },
            };
          }),
        handleActiveChapter: (id: string) =>
          set((prev) => {
            const chapters = prev.collection?.chapters || [];
            const updatedChapter = chapters.map((chapter) => ({
              ...chapter,
              isActive: chapter.id === id,
            }));
            return {
              collection: {
                ...prev.collection,
                chapters: updatedChapter,
              },
            };
          }),
        handleAddFileToChapter: (file: CourseFileType) =>
          set((prev) => {
            const chapters = prev.collection?.chapters || [];
            const activeChapterIndex = chapters.findIndex(
              (chapter) => chapter.isActive
            );
            if (activeChapterIndex !== -1) {
              const prevFiles = chapters[activeChapterIndex].files;
              const alreadyHas = prevFiles.some((item) => item.id === file.id);
              if (alreadyHas) {
                toast.error("File already taken");
              } else {
                prevFiles.push(file);
                return {
                  collection: {
                    ...prev.collection,
                    chapters: chapters,
                  },
                };
              }
            }
            return prev;
          }),
        handleRemoveFileFromChapter: (chapterId: string, fileId: string) =>
          set((prev) => {
            const chapters = prev.collection?.chapters || [];
            const activeChapterIndex = chapters.findIndex(
              (chapter) => chapter.id === chapterId
            );
            if (activeChapterIndex !== -1) {
              const prevFiles = chapters[activeChapterIndex].files;
              const fileIndex = prevFiles.findIndex(
                (item) => item.id === fileId
              );

              if (fileIndex === -1) {
                toast.error("File not found.");
              } else {
                prevFiles.splice(fileIndex, 1);
                return {
                  collection: {
                    ...prev.collection,
                    chapters: chapters,
                  },
                };
              }
            }
            return prev;
          }),
        handleSortChapters: (chapters: ChapterType[]) =>
          set((prev) => {
            return {
              collection: {
                ...prev.collection,
                chapters,
              },
            };
          }),
        handleSortChapterFiles: (files: CourseFileType[]) =>
          set((prev) => {
            const chapters = prev.collection.chapters || [];
            const activeChapterIndex = chapters.findIndex(
              (chapter) => chapter.isActive
            );
            if (activeChapterIndex !== -1) {
              chapters[activeChapterIndex].files = files;
            }
            return {
              collection: {
                ...prev.collection,
                chapters,
              },
            };
          }),
        clearCourseStoredData: () => set({ collection: initialData }),
      }),
      { name: "course-creation-store" }
    )
  )
);
