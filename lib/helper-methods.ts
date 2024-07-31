import { CourseDataType, CourseFileType } from "./types";

type ReturnType = {
  total: CourseFileType[];
  videos: CourseFileType[];
  audios: CourseFileType[];
  documens: CourseFileType[];
  blogs: CourseFileType[];
  images: CourseFileType[];
};

export const getCourseContents = (course: CourseDataType): ReturnType => {
  if (
    course?.chapter_content_mapping &&
    course?.chapter_content_mapping?.length > 0
  ) {
    const chapters = course?.chapter_content_mapping;
    if (chapters && !!chapters.length) {
      const files: CourseFileType[] = [];
      chapters.forEach((chapter) => {
        files.push(...chapter.files);
      });
      if (files && !!files.length) {
        const videos = files.filter((file) => file.contentType === "Video");
        const audios = files.filter((file) => file.contentType === "Audio");
        const documens = files.filter(
          (file) => file.contentType === "Document"
        );
        const blogs = files.filter((file) => file.contentType === "Blog");
        const images = files.filter((file) => file.contentType === "Image");

        return {
          total: files,
          videos,
          audios,
          documens,
          blogs,
          images,
        };
      }
    }
  }
  return {
    total: [],
    videos: [],
    audios: [],
    documens: [],
    blogs: [],
    images: [],
  };
};

export const getCoursesByStatus = (
  courses: CourseDataType[],
  type: "active" | "completed" | "draft"
): CourseDataType[] => {
  if (courses && !!courses.length) {
    if (type === "draft") {
      return courses.filter((c) => !c.active_status);
    }
    if (type === "active") {
      return courses.filter((c) => c.active_status && !c.complete_status);
    }
    if (type === "completed") {
      return courses.filter((c) => !c.active_status && c.complete_status);
    }
  }

  return [];
};

type Resolution = "default" | "mqdefault" | "hqdefault";

export function getYoutubeThumbnail(url: string, resolution?: Resolution) {
  let regex =
    /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
  const result = regex.exec(url);
  if (result) {
    return `https://img.youtube.com/vi/${result[3]}/${
      resolution || "hqdefault"
    }.jpg`; // mqdefault, hqdefault
  } else {
    return "/images/placeholder.png";
  }
}

export const formatChapterName = (chapterName: string) => {
  if (!chapterName) return "";
  const arr = chapterName.split(".");

  if (typeof +arr[0] && arr.length > 1) {
    return arr[1]?.trim();
  }
  return chapterName;
};

export function matchYoutubeUrl(url: string) {
  if (!url) return false;
  const p =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  const result = url.match(p);

  if (result) {
    return result[1];
  }
  return false;
}

export function getExtensionFromFile(filename: string) {
  if (!filename) return "";
  return filename.split(".").pop() || "";
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "O bytes";

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function getYoutubeVideoID(url: string) {
  if (!url) return false;
  const p =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  const result = url.match(p);

  if (result) {
    return result[1];
  }
  return false;
}

export function usernameToSlug(name?: string) {
  if (!name) return "profile";
  const slug = name.split(" ").join("-").toLowerCase();
  return encodeURIComponent(slug);
}

export function groupByDataKey(data: any[], key: any) {
  var groups: any = {};

  data.forEach(function (val) {
    var category = val[key];
    if (category) {
      if (category in groups) {
        groups[category].push(val);
      } else {
        groups[category] = new Array(val);
      }
    }
  });
  return groups;
}

export const formatvideoDuration = (seconds: number) => {
  if (isNaN(seconds)) {
    return "00:00";
  }

  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");

  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const renderEdition = (edition: number) => {
  if (edition === 0) return null;
  if (edition === 1) return "1st";
  if (edition === 2) return "2nd";
  if (edition === 3) return "3rd";
  return edition + "th";
};
