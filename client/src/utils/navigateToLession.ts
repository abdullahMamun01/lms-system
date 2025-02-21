import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";



const navigateToLession = (
  lectureId: string,
  pathname: string,
  router: AppRouterInstance
) => {
  const pathSegments = pathname.split("/");
  const lecturesIndex = pathSegments.findIndex((item) => item === "lectures");
  const coursePathSegments = pathSegments.slice(0, lecturesIndex);
  router.push(`${coursePathSegments.join("/")}/lectures/${lectureId}`);
};

export default navigateToLession
